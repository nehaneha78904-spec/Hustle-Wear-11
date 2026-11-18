import { create } from 'zustand';
import type { Product } from '../types';

interface ToastData {
  title: string;
  subtitle?: string;
}

interface UIStore {
  quickViewProduct: Product | null;
  isQuickViewOpen: boolean;
  isNotificationsOpen: boolean;
  toast: ToastData | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  toggleNotifications: () => void;
  openNotifications: () => void;
  closeNotifications: () => void;
  showToast: (title: string, subtitle?: string) => void;
  hideToast: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  quickViewProduct: null,
  isQuickViewOpen: false,
  isNotificationsOpen: false,
  toast: null,

  openQuickView: (product) => set({ quickViewProduct: product, isQuickViewOpen: true }),
  closeQuickView: () => set({ quickViewProduct: null, isQuickViewOpen: false }),
  toggleNotifications: () => set((state) => ({ isNotificationsOpen: !state.isNotificationsOpen })),
  openNotifications: () => set({ isNotificationsOpen: true }),
  closeNotifications: () => set({ isNotificationsOpen: false }),
  showToast: (title, subtitle) => {
    set({ toast: { title, subtitle } });
    setTimeout(() => {
      set({ toast: null });
    }, 3500);
  },
  hideToast: () => set({ toast: null }),
}));
