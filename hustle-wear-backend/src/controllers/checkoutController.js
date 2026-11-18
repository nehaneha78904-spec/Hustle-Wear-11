const Order = require('../models/Order');
const { COUPONS, DELIVERY_FEES, FREE_SHIPPING_THRESHOLD } = require('../config/constants');

// Validate coupon code
const validateCoupon = async (req, res, next) => {
  try {
    const { code, cartTotal = 0 } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Please provide coupon code' });
    }

    const coupon = COUPONS[code.toUpperCase()];
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid coupon code' });
    }

    if (cartTotal < coupon.minOrder) {
      return res.status(400).json({
        success: false,
        message: `Coupon requires minimum order of ₹${coupon.minOrder}`
      });
    }

    const discountAmount = Math.round((cartTotal * coupon.discount) / 100);

    res.status(200).json({
      success: true,
      data: {
        code: code.toUpperCase(),
        discountPercent: coupon.discount,
        discountAmount,
        description: coupon.description
      }
    });
  } catch (error) {
    next(error);
  }
};

// Calculate order costs
const calculateOrder = async (req, res, next) => {
  try {
    const { items = [], couponCode, deliveryMethod = 'standard' } = req.body;

    const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    let discount = 0;
    if (couponCode && COUPONS[couponCode.toUpperCase()]) {
      const coupon = COUPONS[couponCode.toUpperCase()];
      if (subtotal >= coupon.minOrder) {
        discount = Math.round((subtotal * coupon.discount) / 100);
      }
    }

    let deliveryFee = 0;
    if (deliveryMethod === 'express') {
      deliveryFee = DELIVERY_FEES.express || 99;
    } else {
      deliveryFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
    }

    const total = Math.max(0, subtotal - discount + deliveryFee);

    res.status(200).json({
      success: true,
      data: {
        subtotal,
        discount,
        deliveryFee,
        total,
        freeShippingEligible: subtotal >= FREE_SHIPPING_THRESHOLD
      }
    });
  } catch (error) {
    next(error);
  }
};

// Verify pincode
const checkPincode = async (req, res, next) => {
  try {
    const { pincode } = req.params;
    if (!pincode || pincode.length !== 6) {
      return res.status(400).json({ success: false, message: 'Valid 6-digit PIN code required' });
    }

    // Realistic delivery estimation
    const isMetro = ['400', '110', '560', '600', '700', '500'].some(prefix => pincode.startsWith(prefix));

    res.status(200).json({
      success: true,
      data: {
        pincode,
        serviceable: true,
        codAvailable: true,
        estimatedDays: isMetro ? '2-3 Business Days' : '4-5 Business Days',
        carrier: 'BlueDart Express Air'
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCoupon,
  calculateOrder,
  checkPincode
};
