export interface ProductSize {
  size: string;
  inStock: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'tees' | 'bottoms' | 'fleece' | 'accessories';
  dept: 'men' | 'women' | 'unisex';
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviewCount: number;
  fabric: string;
  images: string[];
  sizes: ProductSize[];
  colors: ProductColor[];
  badges: string[];
  description: string;
  gsm: number;
  edition: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  type: 'home' | 'work' | 'other';
}

export interface Order {
  id: string;
  items: CartItem[];
  address: Address;
  deliveryMethod: string;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  eta: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
}
