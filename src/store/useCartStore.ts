import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { analytics, db } from '../lib/firebase';
import { logEvent } from 'firebase/analytics';
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthStore } from './useAuthStore';

export interface CartItem {
  id: string; // generate unique id like ${productId}-${size}
  productId: number;
  name: string;
  brand: string;
  image: string;
  size: number;
  quantity: number;
  unitPrice: number; // For 1L
  shade?: {
    name: string;
    code: string;
    hex: string;
  };
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  lastAddedItem: CartItem | null;
  bannerOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  setBannerOpen: (open: boolean) => void;
  closeBanner: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      lastAddedItem: null,
      bannerOpen: false,
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        let newItems;
        if (existingItem) {
          newItems = state.items.map(i => 
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          );
        } else {
          newItems = [...state.items, item];
        }

        if (analytics) {
          logEvent(analytics, 'add_to_cart', {
            currency: 'INR',
            value: item.unitPrice * item.size * item.quantity,
            items: [{
              item_id: item.id,
              item_name: item.name,
              item_brand: item.brand,
              price: item.unitPrice * item.size,
              quantity: item.quantity
            }]
          });
        }

        return {
          items: newItems,
          lastAddedItem: item,
          bannerOpen: true
        };
      }),
      removeItem: (id) => set((state) => {
        const itemToRemove = state.items.find(i => i.id === id);
        if (itemToRemove && analytics) {
          logEvent(analytics, 'remove_from_cart', {
            currency: 'INR',
            value: itemToRemove.unitPrice * itemToRemove.size * itemToRemove.quantity,
            items: [{
              item_id: itemToRemove.id,
              item_name: itemToRemove.name,
              item_brand: itemToRemove.brand,
              price: itemToRemove.unitPrice * itemToRemove.size,
              quantity: itemToRemove.quantity
            }]
          });
        }
        return { items: state.items.filter(i => i.id !== id) };
      }),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, quantity } : i)
      })),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      clearCart: () => set({ items: [] }),
      setBannerOpen: (open) => set({ bannerOpen: open }),
      closeBanner: () => set({ bannerOpen: false })
    }),
    {
      name: 'cart-storage',
      // We don't wish to persist open states or temporary banner states
      partialize: (state) => ({ items: state.items }),
    }
  )
);

let currentSessionId = null;
if (typeof window !== 'undefined') {
  try {
    currentSessionId = localStorage.getItem('cart_session_id');
    if (!currentSessionId) {
      currentSessionId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('cart_session_id', currentSessionId);
    }
  } catch (e) {
    console.warn('localStorage is restricted', e);
  }
}

useCartStore.subscribe((state, prevState) => {
  if (state.items !== prevState?.items && currentSessionId) {
    const user = useAuthStore.getState().user;
    if (state.items.length > 0) {
      setDoc(doc(db, 'abandoned_carts', currentSessionId), {
        items: JSON.parse(JSON.stringify(state.items)),
        updatedAt: serverTimestamp(),
        itemCount: state.items.length,
        userId: user ? user.uid : null
      }).catch(console.warn);
    } else {
      deleteDoc(doc(db, 'abandoned_carts', currentSessionId)).catch(console.warn);
    }
  }
});
