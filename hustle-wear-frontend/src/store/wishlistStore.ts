import { create } from 'zustand';

interface WishlistStore {
  items: string[];
  isOpen: boolean;
  toggle: (productId: string) => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  isWishlisted: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  isOpen: false,

  toggle: (productId) => {
    const current = get().items;
    if (current.includes(productId)) {
      set({ items: current.filter((id) => id !== productId) });
    } else {
      set({ items: [...current, productId] });
    }
  },

  toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
  isWishlisted: (productId) => get().items.includes(productId),
}));
