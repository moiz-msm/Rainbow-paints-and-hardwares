import { create } from 'zustand';

export type SearchTab = 'all' | 'products' | 'shades' | 'categories' | 'blogs' | 'tools';

interface UniversalSearchStore {
  isOpen: boolean;
  query: string;
  activeTab: SearchTab;
  setIsOpen: (isOpen: boolean) => void;
  setQuery: (query: string) => void;
  setActiveTab: (tab: SearchTab) => void;
  openSearch: (initialQuery?: string, initialTab?: SearchTab) => void;
  closeSearch: () => void;
}

export const useUniversalSearchStore = create<UniversalSearchStore>((set) => ({
  isOpen: false,
  query: '',
  activeTab: 'all',
  setIsOpen: (isOpen) => set({ isOpen }),
  setQuery: (query) => set({ query }),
  setActiveTab: (activeTab) => set({ activeTab }),
  openSearch: (initialQuery = '', initialTab = 'all') =>
    set({
      isOpen: true,
      query: initialQuery,
      activeTab: initialTab,
    }),
  closeSearch: () => set({ isOpen: false }),
}));
