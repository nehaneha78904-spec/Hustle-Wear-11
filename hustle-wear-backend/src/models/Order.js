const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    image: String,
    price: Number,
    size: String,
    color: String,
    quantity: Number
  }],
  shippingAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  deliveryMethod: { type: String, enum: ['standard', 'express'], default: 'standard' },
  deliveryFee: { type: Number, default: 0 },
  subtotal: Number,
  discount: { type: Number, default: 0 },
  couponCode: String,
  total: Number,
  paymentMethod: { type: String, enum: ['upi', 'card', 'netbanking', 'cod'] },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'placed'
  },
  trackingNumber: String,
  estimatedDelivery: Date,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  notes: String
}, { timestamps: true });

orderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    this.orderNumber = 'HW-' + Date.now().toString().slice(-6);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
