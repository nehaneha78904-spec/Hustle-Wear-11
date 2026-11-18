import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUIStore } from '../../store/uiStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const { toggle: toggleWishlist, isWishlisted } = useWishlistStore();
  const { openQuickView, showToast } = useUIStore();

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.find((s) => s.inStock)?.size || product.sizes[0]?.size || 'M'
  );

  const isLiked = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: product.colors[0]?.name || 'Default',
      quantity: 1,
      image: product.images[0] || ''
    });

    showToast(`Added to Bag`, `${product.name} (Size: ${selectedSize})`);
  };

  return (
    <div className="product-item group bg-surface-container-lowest border border-outline-variant flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative">
      <div className="relative w-full aspect-[4/5] bg-[#F5F3EE] overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 items-start">
          {product.discount > 0 && (
            <span className="bg-error text-on-error px-2 py-0.5 text-label-caps font-label-caps uppercase tracking-wider">
              -{product.discount}%
            </span>
          )}
          {product.edition && (
            <span className="bg-surface/90 text-on-surface border border-outline-variant px-2 py-0.5 text-label-caps font-label-caps uppercase">
              {product.edition}
            </span>
          )}
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="wishlist-btn absolute top-3 right-3 z-20 w-9 h-9 bg-surface/90 border border-outline-variant flex items-center justify-center text-on-surface hover:text-error transition-colors"
          aria-label="Wishlist toggle"
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              isLiked ? 'text-error' : 'text-on-surface'
            }`}
            style={{ fontVariationSettings: `'FILL' ${isLiked ? 1 : 0}` }}
          >
            favorite
          </span>
        </button>

        {/* Product Image with Link */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
          />
        </Link>

        {/* Quick View Hover Bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-surface/90 backdrop-blur-sm border-t border-outline-variant translate-y-full group-hover:translate-y-0 transition-transform duration-200 flex gap-2 z-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product);
            }}
            className="quick-view-btn flex-1 py-2 text-center text-label-caps font-label-caps uppercase bg-on-surface text-surface hover:bg-primary transition-colors font-semibold"
          >
            QUICK VIEW
          </button>
        </div>
      </div>

      {/* Product Details Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-body-sm font-body-sm text-outline mb-1">
            <span>{product.fabric || '100% Combed Cotton'}</span>
            <span className="text-on-surface font-semibold flex items-center gap-0.5 text-[12px]">
              {product.rating}
              <span
                className="material-symbols-outlined text-[14px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              ({product.reviewCount})
            </span>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="text-body-md font-body-md font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-price-md font-price-md text-on-surface">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="text-body-sm font-body-sm text-outline line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
            {product.mrp > product.price && (
              <span className="text-label-caps font-label-caps text-error font-semibold">
                SAVE ₹{(product.mrp - product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Size Selector Chips & Quick Add */}
        <div className="mt-4 pt-3 border-t border-outline-variant">
          <span className="text-label-caps font-label-caps text-outline uppercase block mb-1.5">
            Select Size
          </span>
          <div className="flex gap-1.5 mb-3 size-chips flex-wrap">
            {product.sizes.map((s) => (
              <button
                key={s.size}
                disabled={!s.inStock}
                onClick={(e) => {
                  e.preventDefault();
                  if (s.inStock) setSelectedSize(s.size);
                }}
                className={`w-8 h-8 text-[11px] font-bold border transition-colors relative overflow-hidden ${
                  !s.inStock
                    ? 'border-outline-variant text-outline cursor-not-allowed opacity-40'
                    : selectedSize === s.size
                    ? 'bg-on-surface text-surface border-on-surface'
                    : 'bg-surface-container-lowest text-on-surface border-outline-variant hover:border-on-surface'
                }`}
              >
                {s.size}
                {!s.inStock && (
                  <div className="absolute inset-0 border-t border-error rotate-45 top-1/2"></div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleQuickAdd}
            className="add-to-cart-quick w-full py-2.5 bg-surface-container-highest border border-outline hover:bg-on-surface hover:text-surface text-label-caps font-label-caps uppercase transition-colors flex items-center justify-center gap-1.5 font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
            QUICK ADD
          </button>
        </div>
      </div>
    </div>
  );
};
