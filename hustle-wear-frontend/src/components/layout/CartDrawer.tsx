import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal } = useCartStore();

  if (!isOpen) return null;

  const total = getTotal();
  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, Math.round((total / freeShippingThreshold) * 100));

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-none transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest border-l border-outline-variant shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              <h2 className="text-headline-sm font-headline-sm uppercase text-on-surface">
                Your Bag ({items.length})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1 hover:text-primary transition-colors text-on-surface"
              aria-label="Close Bag"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Free shipping progress */}
          <div className="px-6 py-3 bg-surface border-b border-outline-variant">
            <div className="flex justify-between items-center text-label-caps font-label-caps uppercase mb-1.5">
              <span>
                {total >= freeShippingThreshold ? (
                  <span className="text-primary font-bold">✓ YOU UNLOCKED FREE METRO SHIPPING</span>
                ) : (
                  <span>ADD ₹{freeShippingThreshold - total} MORE FOR FREE SHIPPING</span>
                )}
              </span>
              <span className="text-outline">{progressPercent}%</span>
            </div>
            <div className="w-full bg-surface-container h-1.5 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {items.length === 0 ? (
              <div className="text-center py-16 text-outline space-y-3">
                <span className="material-symbols-outlined text-4xl">shopping_cart</span>
                <p className="text-body-md">Your archive bag is currently empty.</p>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 bg-on-surface text-surface text-label-caps uppercase font-bold hover:bg-primary hover:text-on-primary transition-colors"
                >
                  EXPLORE ARCHIVE
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 border border-outline-variant bg-surface"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover border border-outline-variant shrink-0 bg-[#F5F3EE]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-body-sm font-semibold text-on-surface line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-outline hover:text-error transition-colors"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                      <div className="flex gap-2 text-label-caps text-outline uppercase mt-1">
                        <span>Size: <strong className="text-on-surface">{item.size}</strong></span>
                        <span>•</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-outline-variant bg-surface-container-lowest">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-surface-container transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-body-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-surface-container transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-price-md font-price-md font-bold text-on-surface">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-outline-variant bg-surface space-y-4">
              <div className="space-y-1 text-body-sm">
                <div className="flex justify-between text-outline">
                  <span>Subtotal</span>
                  <span className="font-semibold text-on-surface">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-outline">
                  <span>Delivery</span>
                  <span className="text-primary font-semibold uppercase text-label-caps">
                    {total >= freeShippingThreshold ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-outline-variant font-bold text-body-md text-on-surface">
                  <span className="uppercase font-headline-sm">Total Payable</span>
                  <span className="text-price-lg font-price-lg">
                    ₹{(total >= freeShippingThreshold ? total : total + 99).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full h-[52px] bg-on-surface text-surface text-label-caps uppercase font-bold tracking-widest hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2"
              >
                PROCEED TO CHECKOUT
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <p className="text-center text-label-caps text-outline text-[10px] uppercase">
                256-BIT ENCRYPTED ARCHIVE CHECKOUT • 7-DAY DOORSTEP RETURNS
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
