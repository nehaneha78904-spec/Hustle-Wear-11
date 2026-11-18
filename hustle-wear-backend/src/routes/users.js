const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  saveAddress,
  toggleWishlist,
  getWishlist
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/address', protect, saveAddress);
router.post('/wishlist/:productId', protect, toggleWishlist);
router.get('/wishlist', protect, getWishlist);

module.exports = router;
