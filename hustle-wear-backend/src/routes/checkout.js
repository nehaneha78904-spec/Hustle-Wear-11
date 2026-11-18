const express = require('express');
const router = express.Router();
const {
  validateCoupon,
  calculateOrder,
  checkPincode
} = require('../controllers/checkoutController');
const { createOrder } = require('../controllers/orderController');

router.post('/validate-coupon', validateCoupon);
router.post('/calculate', calculateOrder);
router.get('/pincode/:pincode', checkPincode);
router.post('/place-order', createOrder);

module.exports = router;
