const Order = require('../models/Order');

// Create order
const createOrder = async (req, res, next) => {
  try {
    const {
      items,
      shippingAddress,
      deliveryMethod = 'standard',
      deliveryFee = 0,
      subtotal,
      discount = 0,
      couponCode,
      total,
      paymentMethod,
      notes
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items' });
    }

    const orderNumber = 'HW-' + Math.floor(100000 + Math.random() * 900000);

    const order = new Order({
      orderNumber,
      user: req.user ? req.user._id : undefined,
      items,
      shippingAddress,
      deliveryMethod,
      deliveryFee,
      subtotal,
      discount,
      couponCode,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'confirmed',
      trackingNumber: 'BLR-' + Math.floor(10000000 + Math.random() * 90000000),
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      notes
    });

    const savedOrder = await order.save();
    res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    next(error);
  }
};

// Get user orders
const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// Get single order by ID or OrderNumber
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let order;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id).populate('items.product');
    }
    if (!order) {
      order = await Order.findOne({ orderNumber: id }).populate('items.product');
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// Update order status (Admin)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, trackingNumber } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (status) order.orderStatus = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    await order.save();
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
};
