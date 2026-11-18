const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Security & middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression());
app.use(morgan('dev'));
app.use(cors({
  origin: [
    process.env.CORS_ORIGIN || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:3000',
    /cloudflare\.pages\.dev$/
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/checkout', require('./routes/checkout'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use(require('./middleware/errorHandler'));

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

if (mongoUri) {
  mongoose.connect(mongoUri, { dbName: 'hustlewear' })
    .then(async () => {
      console.log('MongoDB connected successfully');
      // Auto seed if empty
      const Product = require('./models/Product');
      const count = await Product.countDocuments();
      if (count === 0) {
        console.log('Product catalog is empty. Auto-seeding initial products...');
        const { products } = require('./utils/seedData');
        await Product.insertMany(products);
        console.log(`Auto-seeded ${products.length} products.`);
      }
    })
    .catch(err => {
      console.warn('MongoDB connection warning:', err.message);
      console.warn('Server running in fallback mode.');
    });
} else {
  console.log('Running without MONGODB_URI (add it in .env for persistent database)');
}

app.listen(PORT, () => {
  console.log(`Hustle Wear Backend API running on port ${PORT}`);
});

module.exports = app;
