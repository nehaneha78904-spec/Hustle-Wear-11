import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUIStore } from '../../store/uiStore';
import { products } from '../../data/products';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { getCount, openCart } = useCartStore();
  const { items: wishlistItems, openDrawer: openWishlist } = useWishlistStore();
  const { toggleNotifications } = useUIStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const cartCount = getCount();
  const wishlistCount = wishlistItems.length;

  // Filter suggestions
  const suggestions = searchTerm.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 4)
    : products.slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsDropdownOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* TOP RUNNING MARQUEE TICKER */}
      <div className="bg-inverse-surface text-inverse-on-surface text-label-caps font-label-caps uppercase border-b border-outline overflow-hidden py-2 tracking-widest z-50 relative select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 font-semibold">
          <span>FREE SHIPPING PAN-INDIA ON ORDERS ABOVE ₹999</span>
          <span>•</span>
          <span>7-DAY EFFORTLESS RETURNS & EXCHANGES</span>
          <span>•</span>
          <span>100% COMBED COTTON 280 GSM STRUCTURAL KNIT</span>
          <span>•</span>
          <span>NEW DROP '25 IS LIVE</span>
          <span>•</span>
          <span>DELIVERING TO 26,000+ PIN CODES PAN-INDIA</span>
          <span>•</span>
          <span>FREE SHIPPING PAN-INDIA ON ORDERS ABOVE ₹999</span>
          <span>•</span>
          <span>7-DAY EFFORTLESS RETURNS & EXCHANGES</span>
          <span>•</span>
          <span>100% COMBED COTTON 280 GSM STRUCTURAL KNIT</span>
          <span>•</span>
          <span>NEW DROP '25 IS LIVE</span>
          <span>•</span>
          <span>DELIVERING TO 26,000+ PIN CODES PAN-INDIA</span>
        </div>
      </div>

      {/* PERSISTENT TOP APP BAR */}
      <header className="bg-surface docked full-width top-0 sticky z-40 border-b border-outline-variant">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop flex items-center justify-between h-20 relative">
          {/* Brand Logo Anchor */}
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="text-headline-md font-headline-md tracking-tight uppercase text-on-surface hover:opacity-90 transition-opacity flex items-center gap-1"
            >
              HUSTLE WEAR
              <span className="text-xs px-1.5 py-0.5 border border-outline font-label-caps text-primary tracking-normal ml-1 hidden sm:inline-block">
                ARCHIVE
              </span>
            </Link>

            {/* Desktop Navigation Items */}
            <nav className="hidden lg:flex items-center space-x-7 h-20">
              <Link
                to="/shop?dept=men"
                className={`font-body-md h-full flex items-center px-1 transition-colors duration-150 ${
                  location.search.includes('dept=men')
                    ? 'text-on-surface border-b-2 border-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Men
              </Link>
              <Link
                to="/shop?dept=women"
                className={`font-body-md h-full flex items-center px-1 transition-colors duration-150 ${
                  location.search.includes('dept=women')
                    ? 'text-on-surface border-b-2 border-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Women
              </Link>
              <Link
                to="/shop?dept=unisex"
                className={`font-body-md h-full flex items-center px-1 transition-colors duration-150 ${
                  location.search.includes('dept=unisex')
                    ? 'text-on-surface border-b-2 border-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Unisex
              </Link>
              <Link
                to="/shop"
                className="text-on-surface-variant font-body-md h-full flex items-center px-1 hover:text-primary transition-colors duration-150"
              >
                Categories
              </Link>
              <Link
                to="/shop?sort=newest"
                className="text-on-surface-variant font-body-md h-full flex items-center px-1 hover:text-primary transition-colors duration-150"
              >
                Explore
              </Link>
              <Link
                to="/shop?sale=true"
                className="text-error font-body-md font-semibold h-full flex items-center px-1 hover:opacity-80 transition-opacity"
              >
                Sale
              </Link>
            </nav>
          </div>

          {/* Search and Trailing Interactive Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Interactive Search Bar */}
            <div className="relative hidden md:block w-72" ref={searchRef}>
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-sm font-body-sm focus-within:border-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-outline text-[20px] mr-2">
                  search
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Search heavyweight tees, cargos..."
                  className="w-full bg-transparent border-0 p-0 text-on-surface placeholder:text-outline text-body-sm font-body-sm focus:ring-0 focus:outline-none"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm('');
                      setIsDropdownOpen(false);
                    }}
                    className="material-symbols-outlined text-[18px] text-outline hover:text-on-surface"
                  >
                    close
                  </button>
                )}
              </form>

              {/* Live Search Overlay Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-surface-container-lowest border border-outline-variant shadow-lg z-50 p-4">
                  <p className="text-label-caps font-label-caps text-outline uppercase mb-2">
                    Popular In Streetwear
                  </p>
                  <div className="flex flex-col gap-2">
                    {suggestions.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.id}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="search-suggest-item flex items-center justify-between text-body-sm font-body-sm py-1.5 px-2 hover:bg-surface-container hover:text-primary transition-colors"
                      >
                        <span className="truncate pr-2">{p.name}</span>
                        <span className="text-label-caps text-outline font-label-caps shrink-0">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Trailing Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notifications */}
              <button
                onClick={toggleNotifications}
                className="relative p-2 text-on-surface hover:text-primary active:scale-95 transition-all"
                aria-label="View Notifications"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
              </button>

              {/* Wishlist Trigger */}
              <button
                onClick={openWishlist}
                className="flex items-center gap-1.5 px-3 py-2 border border-outline-variant hover:border-on-surface text-body-sm font-body-sm transition-colors"
                aria-label="View Wishlist items"
              >
                <span className="material-symbols-outlined text-[20px]">favorite</span>
                <span className="hidden sm:inline">Wishlist</span>
                <span className="font-semibold text-primary font-body-sm">
                  ({wishlistCount})
                </span>
              </button>

              {/* Cart Trigger */}
              <button
                onClick={openCart}
                className="flex items-center gap-2 bg-on-surface text-surface px-4 py-2 hover:bg-primary hover:text-on-primary transition-colors"
                aria-label="View Shopping Bag"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span className="font-body-md font-semibold">Bag ({cartCount})</span>
              </button>

              {/* Account Link */}
              <Link
                to="/checkout"
                className="p-2 border border-outline-variant text-on-surface hover:border-on-surface hover:text-primary transition-colors hidden sm:flex items-center justify-center"
                title="Account / Orders"
                aria-label="User Account"
              >
                <span className="material-symbols-outlined text-[22px]">person</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
