import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useUIStore } from '../store/uiStore';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { addItem, openCart } = useCartStore();
  const { toggle: toggleWishlist, isWishlisted } = useWishlistStore();
  const { showToast } = useUIStore();

  // Find product by id, slug or fallback to the first bestseller
  const product = products.find((p) => p.id === id || p.id === 'hw-004') || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Washed Onyx');
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>('400001');
  const [pincodeVerified, setPincodeVerified] = useState<boolean>(true);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('fabric');

  const isLiked = isWishlisted(product.id);

  // Gallery images (at least 4-5 views)
  const galleryImages = [
    product.images[0],
    product.images[1] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQbZf8GxoJ_VJyx6zfwQYRo9Xv6jfrfvGP-sdNWp_7gfgbVjoRdEluxDMVaWBlNd9vD8HZt1zXGMje7wMEwsumG2HfBuUcmJd5_SaOr_4bzisDHhL5Gw8eNKFR6uiVkduy8wZLGBJtmp6mHb0o7j5DZt8jtrG8HtuaUcQCpVLxRXvRVJkNaPJEr08P38b3_PjqzadWxb87DEDJQlSQOv_O9apst7GxxGTkLytM6dtWLGPUyW4jjTQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ6PNgj4xGPVz-Hpn42_mQSexg3O-7g8KFOQhPRrHqbXuWEs8ta6VlT_Q86Yy8-HTWrf3BOU7H7IThvZvnDjIvaiJ6NwRJyOAeUT1PREUrO4XT9NCH_WST8AQJui0mOn8_QqdXgHJFpNxNX5lr8G3_RmsTVtQKnd6Z4HaXYfeyfGLP-rccwtLQWmhR3G_IXNV5Zfs2ml1gWFfxjo8DPZpdc4L9bLXl2MitZW1iN8nsVlpUbFMY3FM',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBV-pggSLTHd9QRuvedLRAZ6OqjwYTOVd_nI2KzV0-K1FSw6tEbdHY1ulwKl6ahOeUIGC_9PZ2akQIeelWFswXrICBa-bTJGD6WIvNTcvbCnb8VzDoWZNCRexZhpsW6BQ0IxbL9_-y2E55Aa0-ITtpZhbk3-09s2YmbNVQnFeNKPJ4309dGRTrflIYeKDKBIyeFvpfdVn5aWJHj2SE1-hWZ7pkRlGynj5WPuZae9-LBw8bogCdeb10'
  ];

  const handleAddToBag = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: galleryImages[0]
    });
    showToast('Added to Bag', `${product.name} (Size: ${selectedSize})`);
    openCart();
  };

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: galleryImages[0]
    });
    navigate('/checkout');
  };

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Header />

      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-6 flex-grow">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-outline">/</span>
          <Link to="/shop?dept=men" className="hover:text-primary transition-colors">
            Men
          </Link>
          <span className="text-outline">/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-primary transition-colors uppercase">
            {product.category}
          </Link>
          <span className="text-outline">/</span>
          <span className="text-on-surface font-semibold truncate">{product.name}</span>
        </nav>

        {/* 2-Column Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          {/* Left Column: Media Gallery (7 cols) */}
          <section className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Vertical Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0 md:w-24 custom-scrollbar">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-24 md:w-24 md:h-32 bg-surface-container overflow-hidden relative border transition-all ${
                    activeImageIndex === idx ? 'border-2 border-primary' : 'border-outline-variant hover:border-primary'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 bg-inverse-surface/80 text-inverse-on-surface font-label-caps text-[9px] px-1 uppercase">
                    {idx === 0 ? 'Front' : idx === 1 ? 'Back' : idx === 2 ? 'Fabric' : 'Street'}
                  </span>
                </button>
              ))}
            </div>

            {/* Large Main Image */}
            <div className="flex-1 bg-surface-container-low border border-outline-variant relative overflow-hidden group">
              {/* Badges Cluster */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 items-start">
                <span className="bg-primary text-on-primary text-label-caps font-label-caps px-2.5 py-1 tracking-widest font-bold">
                  BESTSELLER
                </span>
                <span className="bg-inverse-surface text-inverse-on-surface text-label-caps font-label-caps px-2.5 py-1 tracking-widest font-bold">
                  {product.gsm || 280} GSM PREMIUM COTTON
                </span>
                <span className="bg-error-container text-on-error-container text-label-caps font-label-caps px-2.5 py-1 font-bold border border-error/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-error inline-block animate-pulse"></span>
                  LOW STOCK: ONLY 4 LEFT IN SIZE {selectedSize}
                </span>
              </div>

              <div className="w-full aspect-[4/5] overflow-hidden bg-surface-container">
                <img
                  src={galleryImages[activeImageIndex] || galleryImages[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Specs Bottom Callout */}
              <div className="p-3 bg-surface border-t border-outline-variant flex justify-between items-center text-body-sm text-on-surface-variant">
                <span>Model is 6'1" (185cm), 78kg wearing <strong>Size L (Oversized Fit)</strong></span>
                <span className="text-xs uppercase font-label-caps text-primary underline cursor-pointer">
                  Fit Advice
                </span>
              </div>
            </div>
          </section>

          {/* Right Column: Purchase Actions & Specs (5 cols) */}
          <section className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            {/* Identity */}
            <div className="space-y-2 border-b border-outline-variant pb-5">
              <p className="text-label-caps font-label-caps text-primary tracking-widest uppercase font-bold">
                HUSTLE WEAR ARCHIVE 2025
              </p>
              <h1 className="text-2xl md:text-headline-md font-headline-md text-on-surface tracking-tight uppercase">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex text-primary">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="material-symbols-outlined text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-body-sm font-semibold text-on-surface">{product.rating}</span>
                <span className="text-outline">•</span>
                <a href="#reviews-section" className="text-body-sm text-on-surface-variant hover:text-primary underline">
                  {product.reviewCount} verified customer reviews
                </a>
              </div>

              {/* Pricing */}
              <div className="pt-3 flex items-baseline gap-3">
                <span className="font-price-lg text-price-lg text-on-surface font-bold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="font-price-md text-price-md text-on-surface-variant line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
                <span className="bg-primary-container text-on-primary-container font-label-caps text-xs px-2 py-0.5 font-bold uppercase">
                  {product.discount}% OFF
                </span>
              </div>
              <p className="text-body-sm text-outline-variant text-[13px] text-tertiary">
                Inclusive of all taxes. Free 48hr delivery in metropolitan cities.
              </p>
            </div>

            {/* Color Selector */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-body-md font-medium text-on-surface">
                  Color: <span className="font-semibold text-primary">{selectedColor}</span>
                </span>
                <span className="text-label-caps text-outline font-label-caps">COLLECTION COLOURWAY #04</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 border border-outline transition-all ${
                      selectedColor === color.name ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-outline'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-body-md font-medium text-on-surface">Select Size</span>
                  <span className="bg-primary-fixed text-on-primary-fixed text-[11px] font-bold px-2 py-0.5 font-label-caps tracking-wide">
                    RECOMMENDED: L
                  </span>
                </div>
                <button
                  onClick={() => alert('Standard Size Guide: XS: 36" chest, S: 38", M: 40", L: 42", XL: 44", XXL: 46"')}
                  className="text-body-sm font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">straighten</span>
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={() => s.inStock && setSelectedSize(s.size)}
                    className={`h-12 border font-semibold text-body-md transition-all relative overflow-hidden ${
                      !s.inStock
                        ? 'border-outline-variant/50 bg-surface-container text-outline cursor-not-allowed opacity-50'
                        : selectedSize === s.size
                        ? 'border-2 border-on-surface bg-inverse-surface text-inverse-on-surface'
                        : 'border-outline-variant bg-surface hover:border-primary text-on-surface'
                    }`}
                  >
                    {s.size}
                    {!s.inStock && (
                      <div className="absolute inset-0 border-t border-error rotate-45 top-1/2"></div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-body-sm text-tertiary">Fits oversized. For standard tailoring, choose one size down.</p>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-outline-variant bg-surface h-[52px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">remove</span>
                  </button>
                  <span className="w-12 h-full flex items-center justify-center text-body-md font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                  </button>
                </div>

                <button
                  onClick={handleAddToBag}
                  className="flex-1 h-[52px] bg-inverse-surface hover:bg-primary text-inverse-on-surface hover:text-on-primary transition-all duration-150 font-label-caps text-sm tracking-wider uppercase font-bold flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">shopping_bag</span>
                  ADD TO BAG
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="w-[52px] h-[52px] border border-outline-variant flex items-center justify-center text-on-surface hover:border-primary hover:text-error transition-colors"
                  title="Wishlist"
                >
                  <span
                    className={`material-symbols-outlined text-xl ${isLiked ? 'text-error' : ''}`}
                    style={{ fontVariationSettings: `'FILL' ${isLiked ? 1 : 0}` }}
                  >
                    favorite
                  </span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full h-[52px] border-2 border-primary bg-primary-container text-on-primary-container font-label-caps text-sm tracking-wider uppercase font-bold hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">bolt</span>
                BUY NOW (EXPRESS CHECKOUT)
              </button>
            </div>

            {/* Pincode Checker */}
            <div className="p-4 bg-surface-container border border-outline-variant space-y-3">
              <div className="flex items-center gap-2 text-on-surface font-semibold text-body-sm">
                <span className="material-symbols-outlined text-primary text-lg">local_shipping</span>
                <span>Check Delivery & COD Availability</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit PIN code"
                  className="flex-1 bg-surface border border-outline-variant px-3 py-2 text-body-sm font-mono focus:border-on-surface focus:ring-0"
                />
                <button
                  onClick={() => setPincodeVerified(true)}
                  className="px-5 bg-inverse-surface text-inverse-on-surface text-label-caps uppercase font-bold text-xs hover:bg-primary transition-colors"
                >
                  VERIFY
                </button>
              </div>

              {pincodeVerified && (
                <div className="pt-1 text-body-sm space-y-1 text-on-surface">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Express Delivery within 2 Business Days</span>
                  </div>
                  <div className="flex items-center gap-2 text-tertiary">
                    <span className="material-symbols-outlined text-sm">payments</span>
                    <span>Cash on Delivery Available in PIN {pincode}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordions */}
            <div className="divide-y divide-outline-variant border-y border-outline-variant pt-1">
              {/* Accordion 1 */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full flex justify-between items-center text-left font-body-md font-semibold text-on-surface"
                >
                  <span>Fabric & Technical Specifications</span>
                  <span className="material-symbols-outlined">
                    {activeAccordion === 'fabric' ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {activeAccordion === 'fabric' && (
                  <div className="pt-3 text-body-sm text-on-surface-variant space-y-2">
                    <p>• <strong>Weight:</strong> {product.gsm || 280} GSM (Heavyweight architectural knit)</p>
                    <p>• <strong>Composition:</strong> 100% Super Combed Organic Ring-Spun Cotton</p>
                    <p>• <strong>Treatment:</strong> Mineral acid-wash bath for one-of-a-kind vintage fade patina</p>
                    <p>• <strong>Construction:</strong> 1.25" thick ribbed collar, reinforced twin-needle neckband, and pre-shrunk treatment.</p>
                  </div>
                )}
              </div>

              {/* Accordion 2 */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('fit')}
                  className="w-full flex justify-between items-center text-left font-body-md font-semibold text-on-surface"
                >
                  <span>Fit Guide & Silhouette</span>
                  <span className="material-symbols-outlined">
                    {activeAccordion === 'fit' ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {activeAccordion === 'fit' && (
                  <div className="pt-3 text-body-sm text-on-surface-variant space-y-2">
                    <p>
                      Engineered with a relaxed, boxy cut inspired by late-90s underground streetwear. Features exaggerated drop shoulders and wide arm openings for seamless layering.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3 */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('wash')}
                  className="w-full flex justify-between items-center text-left font-body-md font-semibold text-on-surface"
                >
                  <span>Wash Care Instructions</span>
                  <span className="material-symbols-outlined">
                    {activeAccordion === 'wash' ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {activeAccordion === 'wash' && (
                  <div className="pt-3 text-body-sm text-on-surface-variant space-y-2">
                    <p>• Cold machine wash at 30°C with like dark garments.</p>
                    <p>• Turn inside out prior to washing to protect surface acid wash texture.</p>
                    <p>• Do not tumble dry. Flat dry in shade to prevent thermal shrinkage.</p>
                  </div>
                )}
              </div>

              {/* Accordion 4 */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('returns')}
                  className="w-full flex justify-between items-center text-left font-body-md font-semibold text-on-surface"
                >
                  <span>7-Day Free Returns & Doorstep Exchange Policy</span>
                  <span className="material-symbols-outlined">
                    {activeAccordion === 'returns' ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {activeAccordion === 'returns' && (
                  <div className="pt-3 text-body-sm text-on-surface-variant space-y-2">
                    <p>
                      We provide hassle-free reverse courier pickup across all Indian pincodes within 7 days of delivery. Items must remain unwashed with intact security tags and archive box packaging.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 py-4 bg-surface-container-low border border-outline-variant text-center">
              <div className="p-2 border-r border-outline-variant">
                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                <p className="text-label-caps text-[10px] mt-1 font-bold">100% AUTHENTIC</p>
              </div>
              <div className="p-2 border-r border-outline-variant">
                <span className="material-symbols-outlined text-primary text-xl">cached</span>
                <p className="text-label-caps text-[10px] mt-1 font-bold">EASY EXCHANGES</p>
              </div>
              <div className="p-2">
                <span className="material-symbols-outlined text-primary text-xl">shield</span>
                <p className="text-label-caps text-[10px] mt-1 font-bold">SECURE PAYMENTS</p>
              </div>
            </div>
          </section>
        </div>

        {/* Complete The Look Section */}
        <section className="mt-space-3xl pt-12 border-t border-outline-variant">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-label-caps font-label-caps text-primary tracking-widest uppercase font-bold">
                STYLED BY HUSTLE WEAR ARCHIVISTS
              </span>
              <h2 className="text-headline-md font-headline-md text-on-surface tracking-tight mt-1 uppercase">
                Complete The Look
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-label-caps font-bold hover:text-primary transition-colors flex items-center gap-1"
            >
              BUNDLE & SAVE 15% <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
            {products.slice(1, 4).map((item) => (
              <div
                key={item.id}
                className="bg-surface border border-outline-variant group hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="aspect-[4/5] bg-surface-container overflow-hidden relative">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-inverse-surface text-inverse-on-surface text-label-caps px-2 py-0.5 font-bold uppercase">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-headline-sm text-body-lg font-bold text-on-surface line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-price-md font-bold text-on-surface">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => {
                        addItem({
                          productId: item.id,
                          name: item.name,
                          price: item.price,
                          size: 'M',
                          color: 'Standard',
                          quantity: 1,
                          image: item.images[0]
                        });
                        showToast('Added to Bag', item.name);
                        openCart();
                      }}
                      className="px-3 py-1.5 border border-on-surface text-xs font-label-caps uppercase hover:bg-inverse-surface hover:text-inverse-on-surface transition-colors font-bold"
                    >
                      Quick Add +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="mt-space-3xl pt-12 border-t border-outline-variant" id="reviews-section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start pb-10 border-b border-outline-variant">
            <div className="lg:col-span-4 space-y-3">
              <span className="text-label-caps font-label-caps text-primary tracking-widest uppercase font-bold">
                COMMUNITY ARCHIVE
              </span>
              <h2 className="text-headline-md font-headline-md text-on-surface uppercase">
                Customer Reviews
              </h2>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-headline-lg font-bold text-on-surface">4.9</span>
                <span className="text-body-md text-on-surface-variant font-medium">out of 5 Stars</span>
              </div>
              <div className="flex text-primary">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-body-sm text-on-surface-variant">
                Based on 342 verified purchases across India.
              </p>
            </div>

            {/* Breakdown */}
            <div className="lg:col-span-4 space-y-2 pt-2">
              {[
                { star: '5 Star', pct: '89%' },
                { star: '4 Star', pct: '9%' },
                { star: '3 Star', pct: '1.5%' },
                { star: '2 Star', pct: '0.5%' },
                { star: '1 Star', pct: '0%' }
              ].map((row) => (
                <div key={row.star} className="flex items-center gap-3 text-body-sm">
                  <span className="w-12 text-on-surface font-medium">{row.star}</span>
                  <div className="flex-1 h-2 bg-surface-container overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: row.pct }} />
                  </div>
                  <span className="w-8 text-right text-tertiary">{row.pct}</span>
                </div>
              ))}
            </div>

            {/* Fit perception index */}
            <div className="lg:col-span-4 p-5 bg-surface-container border border-outline-variant space-y-3">
              <p className="text-label-caps font-bold uppercase text-on-surface">Fit Perception Index</p>
              <div className="space-y-2 text-body-sm">
                <div className="flex justify-between">
                  <span className="text-tertiary">True to Size (Oversized Cut):</span>
                  <span className="font-bold text-on-surface">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Fabric Weight Perception:</span>
                  <span className="font-bold text-primary">Solid Heavy (280 GSM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Post-Wash Color Retention:</span>
                  <span className="font-bold text-on-surface">98% Satisfied</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
