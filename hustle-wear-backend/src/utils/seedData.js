const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');
const Category = require('../models/Category');

const products = [
  {
    name: 'Overdyed Script Heavy Boxy Tee',
    slug: 'overdyed-script-heavy-boxy-tee',
    description: 'Crafted from custom-developed 280 GSM single jersey fabric. Pre-shrunk with a clean ribbed neckline and relaxed drop-shoulder drape made for Indian humidity.',
    price: 1299,
    mrp: 1999,
    discount: 35,
    category: 'tees',
    department: ['men', 'unisex'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpXjBF2BJINrWXq7xJurBOrbhzIVvkBCqSot6tiwJymlSWec1JgjGh4Vm7WN-ADRaw3x2yuQk2WoxR9j4A8mBjmm2abYHbk7v0k1kngr_C_jhqxJj-zxc6fPrdwG3peTVjYXKpXPPUwW2Iq8KPjPIacV_Xx3QqO1I5PlmZiPs0LxYuGbzSchOsl8w0hL6Mu9K8rujVXSGhtsPvlukBxfp7qFaCxJ4WTEqD0w7C3kDMNngvGKxP3RY'
    ],
    sizes: [
      { size: 'S', inStock: true, stock: 25 },
      { size: 'M', inStock: true, stock: 40 },
      { size: 'L', inStock: true, stock: 35 },
      { size: 'XL', inStock: true, stock: 15 }
    ],
    colors: [
      { name: 'Chalk White', hex: '#F5F3EE' },
      { name: 'Washed Onyx', hex: '#1E1E20' },
      { name: 'Earthy Olive', hex: '#5B614B' }
    ],
    fabric: '100% Combed Cotton',
    gsm: 280,
    edition: 'LIMITED [120 PCS]',
    badges: ['-35%', 'LIMITED [120 PCS]'],
    rating: { average: 4.9, count: 184 },
    isFeatured: true,
    isTrending: true,
    isActive: true,
    tags: ['heavy tee', 'boxy', 'oversized', 'streetwear', 'cotton']
  },
  {
    name: 'Tactical Modular 8-Pocket Cargo',
    slug: 'tactical-modular-8-pocket-cargo',
    description: 'Engineered from tear-resistant 320 GSM cotton ripstop. Features 8 utility compartments, knee articulation darts, and toggle hems to switch between wide and stacked drape.',
    price: 2799,
    mrp: 4599,
    discount: 40,
    category: 'bottoms',
    department: ['men', 'unisex'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAZnQLQrr_tdflvuQh2zO2KiMyJEds4RH3LK9gTdbP-UA616tLEFZfexwvrVBVBp96_FCTPOj8E7421lF-TWYzEdOMQ0m13w9mi9e9njHdwWFYnYESrLao-uiQc5YeuF1caaOH--XAvicnqlR9GS2Qcm54-eqPAyeTE5SKyC5OzM0twYg6iR1mnmcY_VA3c3b5U2_QL2rAc6CkgsQ_qvoKS_n28xTJJW5Lq1iTKQQ3b72jaJswLWqs'
    ],
    sizes: [
      { size: '30', inStock: true, stock: 18 },
      { size: '32', inStock: true, stock: 30 },
      { size: '34', inStock: true, stock: 22 },
      { size: '36', inStock: false, stock: 0 }
    ],
    colors: [
      { name: 'Tactical Olive', hex: '#4A5338' },
      { name: 'Pitch Black', hex: '#121214' }
    ],
    fabric: 'Cotton Ripstop 320 GSM',
    gsm: 320,
    edition: 'RESTOCKED ARCHIVE',
    badges: ['-40%', 'RESTOCKED'],
    rating: { average: 4.8, count: 312 },
    isFeatured: true,
    isTrending: true,
    isActive: true,
    tags: ['cargo', 'pants', 'tactical', 'bottoms', 'ripstop']
  },
  {
    name: 'Monsoon 450 GSM Heavy French Terry Zip',
    slug: 'monsoon-450-gsm-heavy-french-terry-zip',
    description: 'Substantial 450 GSM unbrushed loopback cotton terry. Dual YKK two-way zipper, oversized structural hood, and seamless hidden side hand pockets.',
    price: 3499,
    mrp: 4999,
    discount: 30,
    category: 'fleece',
    department: ['men', 'women', 'unisex'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVYmSYnS-rAnZBXPfyNHMuQwfAaTK7ki_qDtiJE9JYMLF7mG5SLZKb4UVKxrcaFb6nioF2-tlMbp1hNTUjCqkDjNAzA4vhhOnDKsjwz05Dd2fnQjGzn8aOxLmALxVh6nHtT83moCYB4PYXPMfRLj00CDyu_vSSozG2WmrLRRJ1REPB4dheSesPj202nAOCfFrkw0tPBw67GxqYNVF0-o37G5IczTPgiL7S_wS0_zXFOQfzOEcsc9Q'
    ],
    sizes: [
      { size: 'M', inStock: true, stock: 15 },
      { size: 'L', inStock: true, stock: 25 },
      { size: 'XL', inStock: true, stock: 20 }
    ],
    colors: [
      { name: 'Acid Charcoal', hex: '#2A2A2E' },
      { name: 'Washed Earth', hex: '#444238' }
    ],
    fabric: 'Heavy Loopback 450 GSM',
    gsm: 450,
    edition: 'MONSOON EDITION',
    badges: ['-30%', 'MONSOON EDITION'],
    rating: { average: 4.9, count: 96 },
    isFeatured: true,
    isTrending: true,
    isActive: true,
    tags: ['hoodie', 'zip hoodie', 'fleece', 'french terry', 'heavyweight']
  },
  {
    name: 'Acid Washed Heavyweight Boxy Tee - Vintage Onyx',
    slug: 'acid-washed-heavyweight-boxy-tee-vintage-onyx',
    description: 'Signature archive piece. Features 280 GSM super combed cotton with mineral acid-wash bath for vintage patina, thick ribbed collar, and drop-shoulder silhouette.',
    price: 1299,
    mrp: 2499,
    discount: 48,
    category: 'tees',
    department: ['men', 'unisex'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCETmUBSxVb4QtSdXXtONzi84SLlyY-jQhvPPEhp7DYUN2H697m6Rrd1Wv5ffb9xSMOnkJyLZoCqn0mFkDhAVMap-rlLUtqjoB1cO_1BIMM56XQCicGyR6bPImDIpYpab9c5SDLXkW1lAOYdJRTFz0rHzhSvEXDXcknZH9qAlTKt-cJSAgINFiwfbIjFXFpN0sZznD1lXPyjZ0YSbZ0FWEk81pq4uBr_z_zRu79zIpxBhGwng4mOLM',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdwEimt8eHVqaQIMuqFRPaO898q3NYEWmoM_ZMpdVWU4pX-qCbM8LSfVwgsbdnONDBE2-DkQ-K9DuxVUjCMwPrKfcEUNAubbSJUJbw7Pz2ZEzSsmH15hx5gEnUTGA_6aZNCEjwkdDnnJBizumR0WGA1AUyWyCcG-kJ3FpRtdWX-Y5GhoY-KfsXOv_PX6pWzU-oXv0SiJnnnTGV7bht-goW7o499XYITqp4yuMGQpUR80N8bpUFeB8',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQbZf8GxoJ_VJyx6zfwQYRo9Xv6jfrfvGP-sdNWp_7gfgbVjoRdEluxDMVaWBlNd9vD8HZt1zXGMje7wMEwsumG2HfBuUcmJd5_SaOr_4bzisDHhL5Gw8eNKFR6uiVkduy8wZLGBJtmp6mHb0o7j5DZt8jtrG8HtuaUcQCpVLxRXvRVJkNaPJEr08P38b3_PjqzadWxb87DEDJQlSQOv_O9apst7GxxGTkLytM6dtWLGPUyW4jjTQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ6PNgj4xGPVz-Hpn42_mQSexg3O-7g8KFOQhPRrHqbXuWEs8ta6VlT_Q86Yy8-HTWrf3BOU7H7IThvZvnDjIvaiJ6NwRJyOAeUT1PREUrO4XT9NCH_WST8AQJui0mOn8_QqdXgHJFpNxNX5lr8G3_RmsTVtQKnd6Z4HaXYfeyfGLP-rccwtLQWmhR3G_IXNV5Zfs2ml1gWFfxjo8DPZpdc4L9bLXl2MitZW1iN8nsVlpUbFMY3FM'
    ],
    sizes: [
      { size: 'S', inStock: true, stock: 20 },
      { size: 'M', inStock: true, stock: 35 },
      { size: 'L', inStock: true, stock: 4 },
      { size: 'XL', inStock: true, stock: 15 },
      { size: 'XXL', inStock: false, stock: 0 }
    ],
    colors: [
      { name: 'Washed Onyx', hex: '#222224' },
      { name: 'Bone Off-White', hex: '#ECE8DF' },
      { name: 'Muted Olive', hex: '#555E40' },
      { name: 'Cobalt Midnight', hex: '#1E293B' }
    ],
    fabric: '280 GSM Organic Ring-Spun Cotton',
    gsm: 280,
    edition: 'BESTSELLER ARCHIVE 2025',
    badges: ['BESTSELLER', '280 GSM', 'LOW STOCK'],
    rating: { average: 4.9, count: 342 },
    isFeatured: true,
    isTrending: true,
    isActive: true,
    tags: ['pdp', 'acid wash', 'boxy tee', 'vintage onyx', 'bestseller']
  },
  {
    name: 'Monolith Heavyweight Hoodie',
    slug: 'monolith-heavyweight-hoodie',
    description: 'Constructed with double-ply hood and brutalist seam details. Heavy 420 GSM loopback interior provides premium drape and structural shape.',
    price: 2499,
    mrp: 3999,
    discount: 37,
    category: 'fleece',
    department: ['men', 'unisex'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuACxVsObaE01akMCrCsljj-O0HlV-VlG16dBuycf7CQf15Vou4kLbEEXoUB_H996VtndTHtFpnWJ5gITHKfHXSQTYd-A25h0ptIye9X0rk8S7AJqiN8HX9FxXki7WIVfs4C5op_RBTkP6Jx7tR2UejPE6fmMkx_WnK7lNrrmUROWdoTiT8VMubADvYXLWWqC4fr6i4NdL5-F1qoq6GMfWMWUvvLHCGJN3M7x2SAUwwsK9GgCYZvgqk'
    ],
    sizes: [
      { size: 'S', inStock: true, stock: 12 },
      { size: 'M', inStock: true, stock: 25 },
      { size: 'L', inStock: true, stock: 30 },
      { size: 'XL', inStock: true, stock: 10 }
    ],
    colors: [
      { name: 'Washed Iron', hex: '#2B2B2D' },
      { name: 'Slate Gray', hex: '#4B5563' }
    ],
    fabric: '420 GSM Loopback Cotton',
    gsm: 420,
    edition: 'LIMITED EDITION [100 PCS]',
    badges: ['LIMITED EDITION', '-37%'],
    rating: { average: 4.8, count: 128 },
    isFeatured: true,
    isTrending: false,
    isActive: true,
    tags: ['hoodie', 'monolith', 'heavyweight', 'streetwear']
  },
  {
    name: 'Subculture Pattern Tee',
    slug: 'subculture-pattern-tee',
    description: 'Architectural cut raw hem heavyweight off-white streetwear graphic t-shirt. High-density screenprint on chest with tonal typography.',
    price: 1298,
    mrp: 2499,
    discount: 48,
    category: 'tees',
    department: ['men', 'women', 'unisex'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUrNUtw0jrRGIg7B71OI7xN6ah9PoInA-iLSrUpNPUUqdSxRe1G-d1JPuZqYZJH5w98Jkar4eKtguPosxa5x8Km6gYVWeOSx01RNu1NC8Pkj3HV7DUBJ0toRjmsCOk8GQ_rTJHrpF5gY2wR13JkWwlEe-9LgXHv8MHG0tkSPdVQg64rF11fVdMvI9a7YG---pPEKN_EysITy2gAYOwuaZ3p9P0K5d1FBSYEfr-IyRoW0CM8lO7qbQ'
    ],
    sizes: [
      { size: 'S', inStock: true, stock: 15 },
      { size: 'M', inStock: true, stock: 28 },
      { size: 'L', inStock: true, stock: 22 },
      { size: 'XL', inStock: true, stock: 8 }
    ],
    colors: [
      { name: 'Chalk White', hex: '#FAF9F6' }
    ],
    fabric: '260 GSM Combed Jersey',
    gsm: 260,
    edition: 'CORE RUN 03',
    badges: ['CORE RUN 03', '-48%'],
    rating: { average: 4.7, count: 89 },
    isFeatured: false,
    isTrending: true,
    isActive: true,
    tags: ['graphic tee', 'subculture', 'streetwear']
  },
  {
    name: 'Tactical Pleated Cargo Pant - Deep Olive',
    slug: 'tactical-pleated-cargo-pant-deep-olive',
    description: 'Pleated front with wide silhouette and relaxed knee drape. Features concealed zip utility pockets and heavy nickel hardware.',
    price: 2899,
    mrp: 4499,
    discount: 35,
    category: 'bottoms',
    department: ['men', 'unisex'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCH2rU7qkXmnX9ART46wx8_k8lqLDlxS1R0_sGHbxv7zJ5C0suFGWrbm4Su543EpVW15D9Xt04sfTAkTBNfb5-pgL28PENeCp9Iltr5UhakuDB6QZVIR5TH4MX_pnRnTtnfZtr4TYHDfSyo8MsrWNl-Cla-tsk2574srSUSK7k-Cy6oY-Wy1yW6g1B0MpDZ4XkADDSEOFDK2QwWVlB1uDDzldiLkJGUBSqPc7AhXkDxuJI3-mfn_HQ'
    ],
    sizes: [
      { size: '30', inStock: true, stock: 14 },
      { size: '32', inStock: true, stock: 26 },
      { size: '34', inStock: true, stock: 18 }
    ],
    colors: [
      { name: 'Deep Olive', hex: '#4B5338' }
    ],
    fabric: 'Heavy Cotton Drill 340 GSM',
    gsm: 340,
    edition: 'CARGO SYSTEM',
    badges: ['CARGO SYSTEM'],
    rating: { average: 4.8, count: 114 },
    isFeatured: false,
    isTrending: true,
    isActive: true,
    tags: ['bottoms', 'pleated', 'cargo', 'pants']
  },
  {
    name: 'Architectural 6mm Curb Chain',
    slug: 'architectural-6mm-curb-chain',
    description: 'Solid 925 sterling silver brutalist curb link chain necklace. High polish finish with custom geometric lobster clasp closure.',
    price: 1799,
    mrp: 2999,
    discount: 40,
    category: 'accessories',
    department: ['men', 'women', 'unisex'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdYzxg3TL__UO-ifzY2GEVZAymtO7_jq4jH8CE0yr_vXUejqixNn-ESg73EJbKl0vAaHp2vPeQ354rGITVjZdNqQuL1G-T3U9lesaZ8ltJvg6mrnG1T0TjLXgXxvEueWuTxzFdPlehE7EgyO9sfKKTtu139MSD2iFUGw3WTbUQf_WFpEa7AmXx8m5VRr9EmhMcdI1oAVX509nxnN4qpOhq2B5HDW7WhEmwBsNXXdEShjc5HeJfFnw'
    ],
    sizes: [
      { size: '20 inch', inStock: true, stock: 30 },
      { size: '22 inch', inStock: true, stock: 25 }
    ],
    colors: [
      { name: 'Sterling Silver', hex: '#C0C0C0' }
    ],
    fabric: 'Solid 925 Sterling Silver',
    edition: '925 SILVER HARDWARE',
    badges: ['925 SILVER'],
    rating: { average: 4.9, count: 67 },
    isFeatured: false,
    isTrending: true,
    isActive: true,
    tags: ['jewelry', 'silver', 'chain', 'accessories']
  }
];

const seedDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('No MONGODB_URI found, skipping live seed.');
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'hustlewear' });
    console.log('Connected to MongoDB for seeding...');

    await Product.deleteMany({});
    console.log('Cleared existing products.');

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} Hustle Wear products.`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDB();
}

module.exports = { products, seedDB };
