import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ProductCard } from '../components/ui/ProductCard';
import { products } from '../data/products';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';
  const selectedDept = searchParams.get('dept') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const saleOnly = searchParams.get('sale') === 'true';

  const [sortOrder, setSortOrder] = useState<string>(searchParams.get('sort') || 'featured');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Update query params
  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        // Department
        if (selectedDept !== 'all' && p.dept !== selectedDept && p.dept !== 'unisex') return false;
        // Search
        if (
          searchQuery &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
          return false;
        // Sale only
        if (saleOnly && p.discount === 0) return false;
        // Size
        if (selectedSize !== 'all' && !p.sizes.some((s) => s.size === selectedSize && s.inStock))
          return false;
        // Price
        if (p.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'price_asc') return a.price - b.price;
        if (sortOrder === 'price_desc') return b.price - a.price;
        if (sortOrder === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [selectedCategory, selectedDept, searchQuery, saleOnly, selectedSize, maxPrice, sortOrder]);

  const clearAllFilters = () => {
    setSearchParams({});
    setSelectedSize('all');
    setMaxPrice(5000);
    setSortOrder('featured');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Header />

      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-8 flex-grow">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-outline">/</span>
          <span className="text-on-surface font-semibold uppercase">Archive Catalog</span>
          {selectedDept !== 'all' && (
            <>
              <span className="text-outline">/</span>
              <span className="text-primary font-semibold uppercase">{selectedDept}</span>
            </>
          )}
          {selectedCategory !== 'all' && (
            <>
              <span className="text-outline">/</span>
              <span className="text-primary font-semibold uppercase">{selectedCategory}</span>
            </>
          )}
        </nav>

        {/* Section Title & Metrics */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant pb-6 mb-8 gap-4">
          <div>
            <span className="text-label-caps font-label-caps text-primary tracking-widest uppercase block mb-1">
              ARCHIVE INVENTORY • MUMBAI
            </span>
            <h1 className="text-3xl md:text-headline-xl font-headline-xl text-on-surface tracking-tight uppercase">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : selectedDept !== 'all'
                ? `${selectedDept.toUpperCase()} STREETWEAR`
                : selectedCategory !== 'all'
                ? `${selectedCategory.toUpperCase()} DROP`
                : 'COMPLETE ARCHIVE DIRECTORY'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-body-sm text-outline">
              Showing <strong className="text-on-surface">{filteredProducts.length}</strong> silhouettes
            </span>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="md:hidden px-4 py-2 border border-outline-variant text-label-caps uppercase flex items-center gap-1 font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              Filters
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-body-sm">
              <span className="text-outline hidden sm:inline text-label-caps uppercase">Sort by:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-surface-container-lowest border border-outline-variant px-3 py-2 text-body-sm font-semibold text-on-surface focus:outline-none focus:border-on-surface"
              >
                <option value="featured">Featured Drops</option>
                <option value="newest">Newest Releases</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-start">
          {/* Sidebar Filters */}
          <aside
            className={`col-span-12 md:col-span-3 space-y-6 md:block ${
              isMobileFilterOpen ? 'block mb-6' : 'hidden'
            }`}
          >
            <div className="p-5 border border-outline-variant bg-surface-container-lowest space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
                <span className="text-label-caps uppercase font-bold text-on-surface">
                  Filter Matrix
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-label-caps text-error uppercase hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* Department */}
              <div>
                <span className="text-label-caps text-outline uppercase block mb-2 font-bold">
                  Department
                </span>
                <div className="flex flex-col gap-1.5 text-body-sm">
                  {[
                    { label: 'All Departments', value: 'all' },
                    { label: 'Men', value: 'men' },
                    { label: 'Women', value: 'women' },
                    { label: 'Unisex', value: 'unisex' }
                  ].map((dept) => (
                    <label
                      key={dept.value}
                      className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                    >
                      <input
                        type="radio"
                        name="dept"
                        checked={selectedDept === dept.value}
                        onChange={() => updateFilter('dept', dept.value)}
                        className="text-primary focus:ring-primary border-outline-variant"
                      />
                      <span>{dept.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <span className="text-label-caps text-outline uppercase block mb-2 font-bold">
                  Silhouette Category
                </span>
                <div className="flex flex-col gap-1.5 text-body-sm">
                  {[
                    { label: 'All Silhouettes', value: 'all' },
                    { label: 'Heavyweight Tees', value: 'tees' },
                    { label: 'Cargo Pants & Bottoms', value: 'bottoms' },
                    { label: 'Hoodies & Fleece', value: 'fleece' },
                    { label: 'Jewelry & Accessories', value: 'accessories' }
                  ].map((cat) => (
                    <label
                      key={cat.value}
                      className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.value}
                        onChange={() => updateFilter('category', cat.value)}
                        className="text-primary focus:ring-primary border-outline-variant"
                      />
                      <span>{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <span className="text-label-caps text-outline uppercase block mb-2 font-bold">
                  Size Filter
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-xs font-bold border transition-colors ${
                        selectedSize === size
                          ? 'bg-on-surface text-surface border-on-surface'
                          : 'bg-surface hover:border-on-surface border-outline-variant text-on-surface'
                      }`}
                    >
                      {size === 'all' ? 'ALL' : size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-1 text-label-caps uppercase font-bold text-outline">
                  <span>Price Ceiling</span>
                  <span className="text-on-surface font-price-md font-bold">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-outline font-label-caps mt-1">
                  <span>₹500</span>
                  <span>₹5,000</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <section className="col-span-12 md:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-surface-container-lowest border border-outline-variant space-y-4">
                <span className="material-symbols-outlined text-5xl text-outline">search_off</span>
                <h3 className="text-headline-sm uppercase text-on-surface">No Silhouettes Match Filters</h3>
                <p className="text-body-sm text-outline max-w-sm mx-auto">
                  Try easing the category or price restrictions to view available archive garments.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-on-surface text-surface text-label-caps uppercase font-bold hover:bg-primary transition-colors"
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
