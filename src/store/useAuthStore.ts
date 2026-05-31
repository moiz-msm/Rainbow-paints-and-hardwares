import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  role: string | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  setUser: (user: User | null, role: string | null) => void;
  setLoading: (loading: boolean) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  loading: true,
  isAuthModalOpen: false,
  setUser: (user, role) => set({ user, role, loading: false }),
  setLoading: (loading) => set({ loading }),
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false })
}));
