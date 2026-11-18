const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: String,
  body: String,
  size: String,
  verified: { type: Boolean, default: false },
  images: [String],
  helpful: { type: Number, default: 0 }
}, { timestamps: true });

// One review per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Update product rating after save
reviewSchema.post('save', async function () {
  const Product = mongoose.model('Product');
  const stats = await mongoose.model('Review').aggregate([
    { $match: { product: this.product } },
    { $group: { _id: '$product', average: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(this.product, {
      'rating.average': Math.round(stats[0].average * 10) / 10,
      'rating.count': stats[0].count
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);
