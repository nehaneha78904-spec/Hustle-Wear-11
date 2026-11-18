import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { useCartStore } from '../../store/cartStore';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useUIStore();
  const { openCart } = useCartStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 transition-all duration-300 bg-inverse-surface text-inverse-on-surface px-5 py-3.5 border border-outline shadow-2xl flex items-center gap-3">
      <span className="material-symbols-outlined text-primary-fixed text-[22px]">
        check_circle
      </span>
      <div>
        <p className="text-body-sm font-semibold leading-tight">{toast.title}</p>
        {toast.subtitle && (
          <p className="text-label-caps text-outline-variant uppercase">{toast.subtitle}</p>
        )}
      </div>
      <button
        onClick={() => {
          hideToast();
          openCart();
        }}
        className="ml-4 px-3 py-1 bg-primary text-on-primary text-label-caps uppercase font-bold hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors"
      >
        View Bag
      </button>
      <button
        onClick={hideToast}
        className="text-outline-variant hover:text-surface text-sm ml-2"
      >
        ✕
      </button>
    </div>
  );
};
