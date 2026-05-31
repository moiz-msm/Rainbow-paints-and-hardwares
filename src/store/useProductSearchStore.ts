import { create } from 'zustand';

interface ProductSearchStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
}

export const useProductSearchStore = create<ProductSearchStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  showSuggestions: false,
  setShowSuggestions: (show) => set({ showSuggestions: show }),
}));
