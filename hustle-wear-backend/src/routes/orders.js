const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

// Allow guest checkout or logged in user order placement
router.post('/', (req, res, next) => {
  // If token is present, decode it, otherwise allow guest
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
}, createOrder);

router.get('/my-orders', protect, getUserOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
