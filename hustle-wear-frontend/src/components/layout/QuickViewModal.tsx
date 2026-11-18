import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { useCartStore } from '../../store/cartStore';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, isQuickViewOpen, closeQuickView, showToast } = useUIStore();
  const { addItem, openCart } = useCartStore();

  const [selectedSize, setSelectedSize] = useState<string>('L');

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const product = quickViewProduct;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize || product.sizes[0]?.size || 'M',
      color: product.colors[0]?.name || 'Standard',
      quantity: 1,
      image: product.images[0] || ''
    });
    closeQuickView();
    showToast('Added to Bag', `${product.name} (Size: ${selectedSize})`);
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div onClick={closeQuickView} className="fixed inset-0 bg-inverse-surface/75" />

      <div className="relative bg-surface-container-lowest border-2 border-outline-variant max-w-2xl w-full p-6 shadow-2xl z-10">
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 p-1 text-outline hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="aspect-[4/5] bg-[#F5F3EE] overflow-hidden border border-outline-variant">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <span className="text-label-caps font-label-caps text-primary uppercase block font-bold">
                {product.edition || 'HUSTLE WEAR ARCHIVE'}
              </span>
              <h2 className="text-headline-sm font-headline-sm text-on-surface uppercase mt-1">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-price-lg font-price-lg font-bold text-on-surface">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.mrp > product.price && (
                  <span className="text-body-sm text-outline line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-body-sm text-on-surface-variant mt-3 line-clamp-3">
                {product.description}
              </p>

              {/* Sizes */}
              <div className="mt-4">
                <span className="text-label-caps text-outline uppercase block mb-1.5 font-bold">
                  Select Size
                </span>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      disabled={!s.inStock}
                      onClick={() => s.inStock && setSelectedSize(s.size)}
                      className={`w-9 h-9 text-xs font-bold border transition-colors ${
                        !s.inStock
                          ? 'border-outline-variant text-outline cursor-not-allowed opacity-40 line-through'
                          : selectedSize === s.size
                          ? 'bg-on-surface text-surface border-on-surface'
                          : 'bg-surface hover:border-on-surface text-on-surface border-outline-variant'
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-outline-variant">
              <button
                onClick={handleAdd}
                className="w-full h-12 bg-on-surface text-surface text-label-caps uppercase font-bold tracking-wider hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">shopping_bag</span>
                ADD TO BAG • ₹{product.price.toLocaleString('en-IN')}
              </button>

              <Link
                to={`/product/${product.id}`}
                onClick={closeQuickView}
                className="w-full h-10 border border-outline-variant text-on-surface text-label-caps uppercase font-semibold hover:border-on-surface transition-colors flex items-center justify-center"
              >
                VIEW FULL ARCHIVE SPECIFICATIONS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
