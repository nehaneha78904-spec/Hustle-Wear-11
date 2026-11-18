const Review = require('../models/Review');
const Product = require('../models/Product');

// Get reviews for a product
const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

// Add a review
const addReview = async (req, res, next) => {
  try {
    const { productId, rating, title, body, size, images } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating: Number(rating),
      title,
      body,
      size,
      images: images || [],
      verified: true
    });

    // Update product rating average & count
    const allReviews = await Review.find({ product: productId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    product.rating.average = Math.round(avgRating * 10) / 10;
    product.rating.count = allReviews.length;
    await product.save();

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// Mark review helpful
const markHelpful = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    review.helpful += 1;
    await review.save();

    res.status(200).json({ success: true, helpful: review.helpful });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductReviews,
  addReview,
  markHelpful
};
