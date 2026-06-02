import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { doc, getDocs, collection, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db, analytics } from '../lib/firebase';
import { logEvent } from 'firebase/analytics';

export interface WishlistProductItem {
  id: string; // format: "prod_${productId}_${size}_${shadeCode}"
  type: 'product';
  productId: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  addedAt: number;
  size?: number;
  shadeName?: string;
  shadeCode?: string;
  shadeHex?: string;
}

export interface WishlistShadeItem {
  id: string; // format: "shade_${hex_without_hash}"
  type: 'shade';
  shadeCode: string;
  name: string;
  hex: string;
  family: string;
  addedAt: number;
}

export interface WishlistCombinationItem {
  id: string; // format: "combo_${timestamp}"
  type: 'combination';
  name: string;
  shades: {
    shadeCode?: string;
    name: string;
    hex: string;
    family?: string;
  }[];
  addedAt: number;
}

export interface WishlistToast {
  id: string;
  productName: string;
  size?: number;
  shadeName?: string;
  shadeCode?: string;
  shadeHex?: string;
  isError?: boolean;
  message?: string;
}

export type WishlistItem = WishlistProductItem | WishlistShadeItem | WishlistCombinationItem;

// Firestore Error Handling Interface as mandated by Firebase integration guidelines
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null, userId: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: userId,
    },
    operationType,
    path
  };
  console.error('Firestore Error in Wishlist: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface WishlistStore {
  items: WishlistItem[];
  toasts: WishlistToast[];
  isOpen: boolean;
  loading: boolean;
  toggleWishlist: () => void;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (item: Omit<WishlistProductItem, 'id' | 'addedAt'> | Omit<WishlistShadeItem, 'id' | 'addedAt'> | Omit<WishlistCombinationItem, 'id' | 'addedAt'>, userId: string | null) => Promise<void>;
  removeItem: (itemId: string, userId: string | null) => Promise<void>;
  syncWithFirestore: (userId: string) => Promise<void>;
  clearWishlist: () => void;
  addToast: (toast: Omit<WishlistToast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toasts: [],
      isOpen: false,
      loading: false,

      toggleWishlist: () => set((state) => ({ isOpen: !state.isOpen })),
      setIsOpen: (isOpen) => set({ isOpen }),

      addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
      },

      removeToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      },

      addItem: async (itemInput, userId) => {
        let id = '';
        const now = Date.now();

        if (itemInput.type === 'product') {
          const p = itemInput as any;
          const sizePart = p.size !== undefined ? `_${p.size}` : '_1';
          const shadePart = p.shadeCode ? `_${p.shadeCode}` : '_white';
          id = `prod_${itemInput.productId}${sizePart}${shadePart}`;
        } else if (itemInput.type === 'shade') {
          id = `shade_${itemInput.hex.replace('#', '')}`;
        } else {
          id = `combo_${now}`;
        }

        const newItem: WishlistItem = {
          ...itemInput,
          id,
          addedAt: now,
        } as WishlistItem;

        // Check if item already exists in local list (e.g., product or shade already favorited)
        const exists = get().items.some(i => i.id === id);
        if (exists && newItem.type !== 'combination') return; // Don't duplicate products or colors

        // Add to local state first for fast UI feedback
        set((state) => ({ items: [newItem, ...state.items] }));

        // Trigger beautiful dynamic toast notification when an item is added
        if (newItem.type === 'product') {
          get().addToast({
            productName: newItem.name,
            size: newItem.size,
            shadeName: newItem.shadeName,
            shadeCode: newItem.shadeCode,
            shadeHex: newItem.shadeHex,
          });
        } else if (newItem.type === 'shade') {
          get().addToast({
            productName: newItem.name,
            shadeName: newItem.name,
            shadeCode: newItem.shadeCode,
            shadeHex: newItem.hex,
          });
        } else if (newItem.type === 'combination') {
          get().addToast({
            productName: newItem.name,
            shadeName: `${newItem.shades.length} Colors`,
          });
        }

        if (analytics) {
          logEvent(analytics, 'add_to_wishlist', {
            items: [{
              item_id: id,
              item_name: newItem.name,
              item_category: newItem.type,
            }]
          });
        }

        if (userId) {
          const path = `users/${userId}/wishlist/${id}`;
          try {
            await setDoc(doc(db, 'users', userId, 'wishlist', id), newItem);
          } catch (error) {
            handleFirestoreError(error, OperationType.WRITE, path, userId);
          }
        }
      },

      removeItem: async (itemId, userId) => {
        // Remove locally first
        set((state) => ({ items: state.items.filter(i => i.id !== itemId) }));

        if (userId) {
          const path = `users/${userId}/wishlist/${itemId}`;
          try {
            await deleteDoc(doc(db, 'users', userId, 'wishlist', itemId));
          } catch (error) {
            handleFirestoreError(error, OperationType.DELETE, path, userId);
          }
        }
      },

      syncWithFirestore: async (userId) => {
        set({ loading: true });
        const localItems = get().items;
        const path = `users/${userId}/wishlist`;

        try {
          // 1. Fetch remote items from Firestore
          const querySnapshot = await getDocs(collection(db, 'users', userId, 'wishlist'));
          const remoteItems: WishlistItem[] = [];
          querySnapshot.forEach((doc) => {
            remoteItems.push(doc.data() as WishlistItem);
          });

          // 2. Merge items.
          // Any local-only items (from prior guest usage) should be saved to Firestore and also merged.
          const mergedMap = new Map<string, WishlistItem>();
          
          // Seed with Firestore remote items
          remoteItems.forEach(item => mergedMap.set(item.id, item));

          // Find local items not in Firestore to write them (sync local guest items to user profile)
          const localOnlyItems = localItems.filter(localItem => !mergedMap.has(localItem.id));

          if (localOnlyItems.length > 0) {
            const batch = writeBatch(db);
            localOnlyItems.forEach((localItem) => {
              mergedMap.set(localItem.id, localItem);
              batch.set(doc(db, 'users', userId, 'wishlist', localItem.id), localItem);
            });
            await batch.commit();
          }

          // Sort merged items by newest addedAt
          const finalItems = Array.from(mergedMap.values()).sort((a, b) => b.addedAt - a.addedAt);
          set({ items: finalItems, loading: false });
        } catch (error) {
          set({ loading: false });
          handleFirestoreError(error, OperationType.LIST, path, userId);
        }
      },

      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
