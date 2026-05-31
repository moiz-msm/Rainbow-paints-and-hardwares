import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        return {
          items: newItems,
          lastAddedItem: item,
          bannerOpen: true
        };
      }),
      removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
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
