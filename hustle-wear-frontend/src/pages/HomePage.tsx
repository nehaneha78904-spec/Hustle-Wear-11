import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ProductCard } from '../components/ui/ProductCard';
import { CategoryCard } from '../components/ui/CategoryCard';
import { products } from '../data/products';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTrendingFilter, setActiveTrendingFilter] = useState<'all' | 'tees' | 'bottoms' | 'fleece'>('all');

  const filteredTrendingProducts = activeTrendingFilter === 'all'
    ? products.slice(0, 4)
    : products.filter((p) => p.category === activeTrendingFilter).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Header />

      <main className="w-full flex-grow">
        {/* HERO SECTION */}
        <section className="relative w-full border-b border-outline-variant bg-surface-container-low overflow-hidden">
          <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[720px]">
            {/* Hero Left Typography & Architectural Framing */}
            <div className="lg:col-span-6 px-4 md:px-margin-desktop py-12 lg:py-space-3xl flex flex-col justify-between border-r border-outline-variant">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest border border-outline mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span className="text-label-caps font-label-caps text-on-surface uppercase tracking-widest font-semibold">
                    AUTUMN / MONSOON DROP '25
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-display-hero font-display-hero text-on-surface tracking-tighter uppercase leading-none mb-6">
                  WEAR YOUR<br />HUSTLE<span className="text-primary">.</span>
                </h1>

                <p className="text-body-lg font-body-lg text-on-surface-variant max-w-md mb-8">
                  Everyday essentials. Elevated streetwear. Made for whatever comes next with 280-450 GSM structural fabrics crafted for Indian climates.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => navigate('/shop?dept=men')}
                    className="px-8 py-3.5 bg-on-surface text-surface text-label-caps font-label-caps uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-2 font-semibold"
                  >
                    SHOP MEN <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                  <button
                    onClick={() => navigate('/shop?dept=women')}
                    className="px-8 py-3.5 border border-on-surface text-on-surface text-label-caps font-label-caps uppercase tracking-wider hover:bg-on-surface hover:text-surface transition-colors font-semibold"
                  >
                    SHOP WOMEN
                  </button>
                  <button
                    onClick={() => navigate('/shop')}
                    className="px-6 py-3.5 text-on-surface text-label-caps font-label-caps uppercase tracking-wider underline hover:text-primary transition-colors font-semibold"
                  >
                    EXPLORE COLLECTION
                  </button>
                </div>
              </div>

              {/* Hero Sub-metrics Specs */}
              <div className="grid grid-cols-3 gap-6 pt-12 border-t border-outline-variant mt-12">
                <div>
                  <span className="text-price-lg font-price-lg text-on-surface block font-bold">280 GSM</span>
                  <span className="text-label-caps font-label-caps text-outline uppercase font-semibold">
                    Heavy Single Jersey
                  </span>
                </div>
                <div>
                  <span className="text-price-lg font-price-lg text-on-surface block font-bold">Zero-Shrink</span>
                  <span className="text-label-caps font-label-caps text-outline uppercase font-semibold">
                    Silicone Pre-Washed
                  </span>
                </div>
                <div>
                  <span className="text-price-lg font-price-lg text-on-surface block font-bold">Pan-India</span>
                  <span className="text-label-caps font-label-caps text-outline uppercase font-semibold">
                    Express Dispatch
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Right Hero Visual Canvas */}
            <div className="lg:col-span-6 relative bg-surface-container flex items-center justify-center p-4 lg:p-0">
              <div className="w-full h-full min-h-[450px] lg:min-h-[500px] relative overflow-hidden group">
                <img
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCODsbj35EZvdxRnOgPSjTIPpVC2h1vt189TIrvD9hp_WpVIrDmlHrGdgux9y8pDWpcP1b7sRH8jVEodwRibsyZxmNEQG-I5kmn1VQiUso1U8-WIcvc7A8Y42pbYV8z5oQY70WFqMAdcyYO20zoGwsDKx4dFCXmmEpJmZEchrUzCcJYZLnBnQZZdnghIwaTU3Q-cXhCxbPatnvvh4_opNHVghqtozRQHzHch-tIvdu0PGkPXI-I5YA"
                  alt="Editorial lookbook model in heavyweight streetwear tee and cargos"
                />
                {/* Badge Overlay */}
                <div className="absolute bottom-8 left-8 bg-surface/90 backdrop-blur-sm border border-outline-variant p-4 max-w-xs shadow-lg">
                  <span className="text-label-caps font-label-caps text-primary uppercase block font-bold">
                    Featured Silhouette
                  </span>
                  <p className="text-headline-sm font-headline-sm text-on-surface font-semibold">
                    Archive 09: Boxy Concrete Fit
                  </p>
                  <p className="text-price-md font-price-md text-on-surface mt-1 font-bold">
                    ₹2,199{' '}
                    <span className="line-through text-outline font-normal text-body-sm">₹3,499</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED CATEGORIES SECTION */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12 md:py-space-3xl border-b border-outline-variant" id="categories">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-space-xl">
            <div>
              <span className="text-label-caps font-label-caps text-primary uppercase tracking-widest block mb-2 font-bold">
                ARCHITECTURAL GRID
              </span>
              <h2 className="text-3xl md:text-headline-xl font-headline-xl text-on-surface tracking-tight uppercase">
                Featured Categories
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-label-caps font-label-caps uppercase tracking-wider text-on-surface hover:text-primary flex items-center gap-1 mt-4 md:mt-0 font-bold"
            >
              VIEW ARCHIVE DIRECTORY <span className="material-symbols-outlined text-[16px]">north_east</span>
            </Link>
          </div>

          {/* Bento Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              isLarge={true}
              number="01 / ARCHIVE FOUNDATION"
              title="T-Shirts"
              categorySlug="tees"
              description="240-280 GSM pure combed cotton. Double-needle stitch collar."
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuBFaW64ZEu2IHL-9JgtM4WrvT4qRK89ioTlqXN33drMAVwYgoyBpGm1T8-K-03aqAlD8C5WpxV-C02Ees8OwbnOUWN-lzZpkkxUNmsbjDnsj2Vcn8bYlW0m6bp5GWSxCzJH9d8SrPST8OrmtZQoFcXwBVFkDDw4645pUmZj18rvIn3_LIpGyuOht--xvBxwIDcDMAzodLVUBY9Vym8s0sJy6ZzSPTNQKUTRl-YHCc0duCG6WFvj4rM"
            />
            <CategoryCard
              number="02 / FLEECE"
              title="Hoodies & Sweats"
              categorySlug="fleece"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuCISlgXNfX62TbKt3zGCU1WAUMcCt_rnJ4EEvJfmr67i4YzkEndebCa9uceSCGAUE2dTX40gKfVIxx83ujYzhIMmRnKpa8_VZiq3ONCHFoK2ir_67OWP6mnA5f4XFZKLX-Scpyj2Ylz2KpJYoIs_FI5-m1kdNEhn8rmBKYcA9SjgbQOKNqgpJKwMPgC6D64WtoTJK0A3Ztx3qGVTfhPWd_wxhGVE-wWu6Mst3zBSd2niTYcPoJuPUw"
            />
            <CategoryCard
              number="03 / TECHNICAL"
              title="Cargo Pants"
              categorySlug="bottoms"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuCc-thEYTRGvyoewhkMZyBWiTL1jZ0nSnHptcF1_-JZ09aiqp1ioRh4OLNZ0079MS4RHQzXLnxh-fmGQafWS1r5T6uFayUbaVXE-epb86kbffV0sNA_09TQBpIVxz9_oKexjhwqqVt3bWeVjSu7A3r3_de2exTaU7smw7MMcp9KiNK9T5jwQFV6aedD2Xi1k31kK85aTEwnxc1MHCNQ6be5CJb5yUEsJYZVtsTWQqRd5P7C4vWxVPg"
            />
            <CategoryCard
              number="04 / DENIM"
              title="Denim & Jeans"
              categorySlug="bottoms"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuB4zc5OzHA5R2yBdktM4y5ZcpEaDHpBBJ26G40ikSRyO2SZD-OT8MXIAV-n8x9C1ffdpO68k2piQpBRXECp0Qi48C2zTeBJd_tW5ghS7te2gHFgzWflcUTiButLDElM4Ja4LcLq2ESAx_ZDA_Owl3mxfEAyyd-UAO2YYaLvC2_GhEB8nrZ_D1YhHWxmB_j5IZgWgDOOw-xqTaY0Uf0gC2QlPGkF54U-kjvhVeqi9ToPFCRFrdcAS6c"
            />
            <CategoryCard
              number="05 / MONOCHROME"
              title="Co-Ord Sets"
              categorySlug="all"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuABBnIgynnyLddZwk1I2Ds-1O62oFUresk3arEhjVstujhGaIFoNyzT4G8O9RosTqVRYfTz4GrEBpixqq9PFtLUxDY296kxhNvV7x6YUskehyRMlv6ZtSVfd1P9zcAJ03eYVeDIERwCE10fE_OaQbgSbAa957N2_Y6z5ZBuB3P_RKCgDvOK7uEWB2yh0VykIrwP7WPbHMkhetPbBBscfr2OgX1OKjGag6Dn6WgMW0Gp7cRgdkDBVgM"
            />
            <CategoryCard
              number="06 / LAYERING"
              title="Overshirts"
              categorySlug="tees"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuB0Ae2yfqdxIc79QYzUXezNRNM_gTxmpuWug3jX6NgfWNnlAFlVT0DAQy129E8-GxcCwxP8Q2n2fwBIRTZ_N9xwlVHGKpFuizOYL5EKYyeAo3cgUcoO627WLJTj2y6N-FIUYwf9M8652FAZG--QN7Z4_fLf4pj8uZlrHZuXmLfKMo0UwR3L4JjW0apr0G_V3-7SOI79_95Ok-pH3abAIdg1Lar4SAYGL2TTpq9tPI1aB5l0Ht1TZyg"
            />
            <CategoryCard
              number="07 / ACCENTS"
              title="Accessories"
              categorySlug="accessories"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDHsys3nrcY9MuN1yCjdsE14PBaQ1z-l7jhkZ8cjyBKlLe3RY6mo_wtNshzFRXRQM4RpQ3B2bSQ4oolU8A5Q1JeE-AfZ0aH55SXAGmXGwpi6OCgr9yQ7Fd5brKZYKMtIFk0BL8ZxRK0H_EffY7y_VXXFaFXvD1CUV2KBZrw19GtaTDTLcX3DgLBAWNJe9akUEUrNu4tUy_hBRCbzTt4nfpQS6mOvcvtPMtLRj2Br-sWUsawNK9Gv5o"
            />
          </div>
        </section>

        {/* TRENDING NOW SECTION */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12 md:py-space-3xl border-b border-outline-variant" id="trending">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-space-xl">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-primary-container text-on-primary-container text-label-caps font-label-caps uppercase font-bold">
                  Hot Drop
                </span>
                <span className="text-label-caps font-label-caps text-outline uppercase tracking-wider font-semibold">
                  REAL-TIME DEMAND
                </span>
              </div>
              <h2 className="text-3xl md:text-headline-xl font-headline-xl text-on-surface uppercase tracking-tight">
                Trending Now
              </h2>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              {(['all', 'tees', 'bottoms', 'fleece'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTrendingFilter(cat)}
                  className={`px-4 py-2 border text-label-caps font-label-caps uppercase transition-colors ${
                    activeTrendingFilter === cat
                      ? 'border-on-surface bg-on-surface text-surface'
                      : 'border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {cat === 'all' ? 'All Items' : cat === 'tees' ? 'Heavy Tees' : cat === 'bottoms' ? 'Bottoms' : 'Fleece & Knits'}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTrendingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
