const Category = require('../models/Category');

const DEFAULT_CATEGORIES = [
  {
    name: 'T-Shirts',
    slug: 'tees',
    description: '240-280 GSM pure combed cotton. Double-needle stitch collar.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFaW64ZEu2IHL-9JgtM4WrvT4qRK89ioTlqXN33drMAVwYgoyBpGm1T8-K-03aqAlD8C5WpxV-C02Ees8OwbnOUWN-lzZpkkxUNmsbjDnsj2Vcn8bYlW0m6bp5GWSxCzJH9d8SrPST8OrmtZQoFcXwBVFkDDw4645pUmZj18rvIn3_LIpGyuOht--xvBxwIDcDMAzodLVUBY9Vym8s0sJy6ZzSPTNQKUTRl-YHCc0duCG6WFvj4rM',
    tag: '01 / ARCHIVE FOUNDATION',
    order: 1
  },
  {
    name: 'Hoodies & Sweats',
    slug: 'fleece',
    description: 'Substantial 450 GSM unbrushed loopback cotton terry.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCISlgXNfX62TbKt3zGCU1WAUMcCt_rnJ4EEvJfmr67i4YzkEndebCa9uceSCGAUE2dTX40gKfVIxx83ujYzhIMmRnKpa8_VZiq3ONCHFoK2ir_67OWP6mnA5f4XFZKLX-Scpyj2Ylz2KpJYoIs_FI5-m1kdNEhn8rmBKYcA9SjgbQOKNqgpJKwMPgC6D64WtoTJK0A3Ztx3qGVTfhPWd_wxhGVE-wWu6Mst3zBSd2niTYcPoJuPUw',
    tag: '02 / FLEECE',
    order: 2
  },
  {
    name: 'Cargo Pants',
    slug: 'bottoms',
    description: 'Engineered from tear-resistant 320 GSM cotton ripstop.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc-thEYTRGvyoewhkMZyBWiTL1jZ0nSnHptcF1_-JZ09aiqp1ioRh4OLNZ0079MS4RHQzXLnxh-fmGQafWS1r5T6uFayUbaVXE-epb86kbffV0sNA_09TQBpIVxz9_oKexjhwqqVt3bWeVjSu7A3r3_de2exTaU7smw7MMcp9KiNK9T5jwQFV6aedD2Xi1k31kK85aTEwnxc1MHCNQ6be5CJb5yUEsJYZVtsTWQqRd5P7C4vWxVPg',
    tag: '03 / TECHNICAL',
    order: 3
  },
  {
    name: 'Denim & Jeans',
    slug: 'denim',
    description: 'Raw selvage and custom enzyme stone wash.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4zc5OzHA5R2yBdktM4y5ZcpEaDHpBBJ26G40ikSRyO2SZD-OT8MXIAV-n8x9C1ffdpO68k2piQpBRXECp0Qi48C2zTeBJd_tW5ghS7te2gHFgzWflcUTiButLDElM4Ja4LcLq2ESAx_ZDA_Owl3mxfEAyyd-UAO2YYaLvC2_GhEB8nrZ_D1YhHWxmB_j5IZgWgDOOw-xqTaY0Uf0gC2QlPGkF54U-kjvhVeqi9ToPFCRFrdcAS6c',
    tag: '04 / DENIM',
    order: 4
  },
  {
    name: 'Co-Ord Sets',
    slug: 'co-ords',
    description: 'Matched architectural silhouettes in heavyweight knit.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABBnIgynnyLddZwk1I2Ds-1O62oFUresk3arEhjVstujhGaIFoNyzT4G8O9RosTqVRYfTz4GrEBpixqq9PFtLUxDY296kxhNvV7x6YUskehyRMlv6ZtSVfd1P9zcAJ03eYVeDIERwCE10fE_OaQbgSbAa957N2_Y6z5ZBuB3P_RKCgDvOK7uEWB2yh0VykIrwP7WPbHMkhetPbBBscfr2OgX1OKjGag6Dn6WgMW0Gp7cRgdkDBVgM',
    tag: '05 / MONOCHROME',
    order: 5
  },
  {
    name: 'Overshirts',
    slug: 'overshirts',
    description: 'Structured canvas and twill layering silhouettes.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0Ae2yfqdxIc79QYzUXezNRNM_gTxmpuWug3jX6NgfWNnlAFlVT0DAQy129E8-GxcCwxP8Q2n2fwBIRTZ_N9xwlVHGKpFuizOYL5EKYyeAo3cgUcoO627WLJTj2y6N-FIUYwf9M8652FAZG--QN7Z4_fLf4pj8uZlrHZuXmLfKMo0UwR3L4JjW0apr0G_V3-7SOI79_95Ok-pH3abAIdg1Lar4SAYGL2TTpq9tPI1aB5l0Ht1TZyg',
    tag: '06 / LAYERING',
    order: 6
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: '925 silver curb chains, caps and tactical key clips.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHsys3nrcY9MuN1yCjdsE14PBaQ1z-l7jhkZ8cjyBKlLe3RY6mo_wtNshzFRXRQM4RpQ3B2bSQ4oolU8A5Q1JeE-AfZ0aH55SXAGmXGwpi6OCgr9yQ7Fd5brKZYKMtIFk0BL8ZxRK0H_EffY7y_VXXFaFXvD1CUV2KBZrw19GtaTDTLcX3DgLBAWNJe9akUEUrNu4tUy_hBRCbzTt4nfpQS6mOvcvtPMtLRj2Br-sWUsawNK9Gv5o',
    tag: '07 / ACCENTS',
    order: 7
  }
];

const getCategories = async (req, res, next) => {
  try {
    let categories = await Category.find({ isActive: true }).sort({ order: 1 });
    if (!categories || categories.length === 0) {
      categories = DEFAULT_CATEGORIES;
    }
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(200).json({ success: true, data: DEFAULT_CATEGORIES });
  }
};

module.exports = {
  getCategories
};
