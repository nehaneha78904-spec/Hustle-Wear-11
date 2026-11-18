import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { products } from '../../data/products';

export const WishlistDrawer: React.FC = () => {
  const { items, isOpen, closeDrawer, toggle } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const { showToast } = useUIStore();

  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => items.includes(p.id));

  const handleMoveToBag = (product: typeof products[0]) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: product.sizes.find((s) => s.inStock)?.size || 'M',
      color: product.colors[0]?.name || 'Default',
      quantity: 1,
      image: product.images[0] || ''
    });
    toggle(product.id);
    showToast('Moved to Bag', product.name);
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-inverse-surface/60 transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest border-l border-outline-variant shadow-2xl flex flex-col justify-between">
          <div className="p-6 border-b border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px]">favorite</span>
              <h2 className="text-headline-sm font-headline-sm uppercase text-on-surface">
                Wishlist ({wishlistedProducts.length})
              </h2>
            </div>
            <button onClick={closeDrawer} className="p-1 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 text-outline space-y-3">
                <span className="material-symbols-outlined text-4xl">favorite_border</span>
                <p className="text-body-md">Your wishlist archive is empty.</p>
              </div>
            ) : (
              wishlistedProducts.map((p) => (
                <div key={p.id} className="flex gap-4 p-3 border border-outline-variant bg-surface">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-20 h-24 object-cover border border-outline-variant bg-[#F5F3EE]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/product/${p.id}`}
                          onClick={closeDrawer}
                          className="text-body-sm font-semibold text-on-surface hover:text-primary transition-colors line-clamp-1"
                        >
                          {p.name}
                        </Link>
                        <button
                          onClick={() => toggle(p.id)}
                          className="text-outline hover:text-error transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                      <p className="text-price-md font-price-md font-bold text-on-surface mt-1">
                        ₹{p.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button
                      onClick={() => handleMoveToBag(p)}
                      className="w-full py-1.5 bg-on-surface text-surface text-label-caps uppercase font-bold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      MOVE TO BAG
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
