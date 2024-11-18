const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const recordRoutes = require('./routes/recordRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const cropRoutes = require('./routes/cropRoutes');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(helmet()); // Secure app with various HTTP headers
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json({ limit: '10mb' })); // Increase payload size for JSON
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Increase payload size for URL-encoded data

// Enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/crops', cropRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
