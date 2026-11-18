const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  category: {
    type: String,
    enum: ['tees', 'bottoms', 'fleece', 'accessories', 'co-ords', 'overshirts', 'denim'],
    required: true
  },
  department: [{ type: String, enum: ['men', 'women', 'unisex'] }],
  images: [String],
  sizes: [{
    size: String,
    inStock: Boolean,
    stock: Number
  }],
  colors: [{ name: String, hex: String }],
  fabric: String,
  gsm: Number,
  edition: String,
  badges: [String],
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  tags: [String]
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model('Product', productSchema);
