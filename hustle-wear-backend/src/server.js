const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Security & middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false // Allows inline fonts, CDNs & external images
}));
app.use(compression());
app.use(morgan('dev'));
app.use(cors({
  origin: [
    process.env.CORS_ORIGIN || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:5000',
    'http://localhost:3000',
    /cloudflare\.pages\.dev$/
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static frontend build path
const frontendDist = path.join(__dirname, '../../hustle-wear-frontend/dist');
const faviconPath = path.join(__dirname, '../../hustle-wear-frontend/public/favicon.ico');

// Favicon route
app.get('/favicon.ico', (req, res) => {
  if (fs.existsSync(faviconPath)) {
    return res.sendFile(faviconPath);
  }
  res.status(204).end();
});

// API Routes
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

// Serve frontend SPA if built
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  // Catch-all handler for React Router client-side routing
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(frontendDist, 'index.html'));
    }
    next();
  });
} else {
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Hustle Wear Backend API</title></head>
        <body style="font-family:sans-serif;padding:40px;background:#fcf8fb;color:#1b1b1d;">
          <h1>⚡ Hustle Wear API Server</h1>
          <p>Status: <strong>Running on Port ${PORT}</strong></p>
          <p>Database: <strong>${mongoose.connection.readyState === 1 ? 'Connected to MongoDB Atlas' : 'Connecting...'}</strong></p>
          <hr/>
          <p>Frontend Dev Server: <a href="http://localhost:5173" target="_blank">http://localhost:5173</a></p>
          <p>API Health Endpoint: <a href="/api/health">/api/health</a></p>
          <p>Products Endpoint: <a href="/api/products">/api/products</a></p>
        </body>
      </html>
    `);
  });
}

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
  console.log(`Hustle Wear Server running on port ${PORT}`);
  console.log(`Frontend URL: http://localhost:5173 (Dev) or http://localhost:${PORT} (Full-Stack)`);
});

module.exports = app;
