import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  number: string;
  title: string;
  categorySlug: string;
  description?: string;
  image: string;
  isLarge?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  number,
  title,
  categorySlug,
  description,
  image,
  isLarge = false,
}) => {
  return (
    <Link
      to={`/shop?category=${categorySlug}`}
      className={`category-card group relative bg-surface-container-lowest border border-outline-variant overflow-hidden flex flex-col justify-end transition-all duration-300 ${
        isLarge ? 'sm:col-span-2 aspect-[16/9] p-8' : 'aspect-[4/5] p-6'
      }`}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/30 to-transparent" />
      <div className="relative z-10 text-surface">
        <span className="text-label-caps font-label-caps text-primary-fixed uppercase tracking-widest block mb-1">
          {number}
        </span>
        <h3
          className={`${
            isLarge ? 'text-headline-lg font-headline-lg' : 'text-headline-md font-headline-md'
          } uppercase text-surface`}
        >
          {title}
        </h3>
        {description && (
          <p className="text-body-sm font-body-sm text-surface-variant max-w-sm mb-4">
            {description}
          </p>
        )}
        <span className="inline-flex items-center gap-2 text-label-caps font-label-caps text-surface uppercase group-hover:translate-x-2 transition-transform mt-2">
          EXPLORE <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </span>
      </div>
    </Link>
  );
};
