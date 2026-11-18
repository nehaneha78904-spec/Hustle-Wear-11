module.exports = {
  CATEGORIES: ['tees', 'bottoms', 'fleece', 'accessories', 'co-ords', 'overshirts', 'denim'],
  DEPARTMENTS: ['men', 'women', 'unisex'],
  SIZES: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
  ORDER_STATUSES: ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
  PAYMENT_METHODS: ['upi', 'card', 'netbanking', 'cod'],
  PAYMENT_STATUSES: ['pending', 'paid', 'failed', 'refunded'],
  DELIVERY_METHODS: ['standard', 'express'],
  DELIVERY_FEES: { standard: 0, express: 199 },
  FREE_SHIPPING_THRESHOLD: 999,
  COUPONS: {
    HUSTLE10: { discount: 10, type: 'percentage', minOrder: 0, description: '10% off on all orders' },
    NEWUSER15: { discount: 15, type: 'percentage', minOrder: 0, description: '15% off for first order', firstOrderOnly: true },
    ARCHIVE20: { discount: 20, type: 'percentage', minOrder: 3000, description: '20% off on orders above ₹3000' }
  },
  PAGINATION: { DEFAULT_LIMIT: 12, MAX_LIMIT: 50 }
};
