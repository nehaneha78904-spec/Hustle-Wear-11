const Product = require('../models/Product');
const ApiResponse = require('../utils/apiResponse');

// Get all products with filters
const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      department,
      dept,
      minPrice,
      maxPrice,
      sort,
      search,
      inStock,
      isTrending,
      isFeatured,
      page = 1,
      limit = 12
    } = req.query;

    const query = { isActive: true };

    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }

    const selectedDept = department || dept;
    if (selectedDept && selectedDept !== 'all') {
      query.department = { $in: [selectedDept.toLowerCase()] };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (isTrending === 'true') query.isTrending = true;
    if (isFeatured === 'true') query.isFeatured = true;

    if (inStock === 'true') {
      query['sizes.inStock'] = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort mapping
    let sortOptions = { createdAt: -1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    else if (sort === 'price_desc') sortOptions = { price: -1 };
    else if (sort === 'rating') sortOptions = { 'rating.average': -1 };
    else if (sort === 'newest') sortOptions = { createdAt: -1 };

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum) || 1
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single product by ID or Slug
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }
    
    if (!product) {
      product = await Product.findOne({ slug: id, isActive: true });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Get featured products
const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true }).limit(8);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// Get trending products
const getTrendingProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { isTrending: true, isActive: true };
    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }
    const products = await Product.find(query).limit(8);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// Create product (Admin)
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Update product (Admin)
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Delete product (Admin)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getTrendingProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
