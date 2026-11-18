const express = require('express');
const router = express.Router();
const {
  getProductReviews,
  addReview,
  markHelpful
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.get('/product/:productId', getProductReviews);
router.post('/', protect, addReview);
router.put('/:id/helpful', markHelpful);

module.exports = router;
