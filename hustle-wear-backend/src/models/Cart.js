const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    image: String,
    price: Number,
    size: String,
    color: String,
    quantity: { type: Number, default: 1, min: 1 }
  }],
  total: { type: Number, default: 0 }
}, { timestamps: true });

// Auto-calculate total before save
cartSchema.pre('save', function (next) {
  this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
