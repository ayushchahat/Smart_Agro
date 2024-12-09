const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');
const connectDb = require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const recordRoutes = require('./routes/recordRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const cropRoutes = require('./routes/cropRoutes');

// Load environment variables
dotenv.config();

// Connect to database
connectDb();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    cb(null, uploadDir); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique file name
  },
});

const upload = multer({ storage });

// Route for uploading images
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  const imagePath = `/uploads/${req.file.filename}`; // Path for accessing the image
  res.json({ success: true, image: imagePath });
});

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/crops', cropRoutes);

// Socket.IO for real-time data
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Emit mock sensor data every 2 seconds
  const interval = setInterval(() => {
    const sampleData = {
      timestamp: new Date().toISOString(),
      temperature: (Math.random() * 40).toFixed(2), // Random temperature
      humidity: (Math.random() * 100).toFixed(2), // Random humidity
      soilMoisture: (Math.random() * 100).toFixed(2), // Random soil moisture
      lightIntensity: (Math.random() * 1000).toFixed(2), // Random light intensity
    };
    socket.emit('sensor-data', sampleData);
  }, 3000);

  // Clean up on disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(interval);
  });
});

// Add GET endpoint for fetching sensor data (if needed)
app.get('/api/sensor-data', (req, res) => {
  const sampleData = {
    timestamp: new Date().toISOString(),
    temperature: (Math.random() * 40).toFixed(2),
    humidity: (Math.random() * 100).toFixed(2),
    soilMoisture: (Math.random() * 100).toFixed(2),
    lightIntensity: (Math.random() * 1000).toFixed(2),
  };
  res.json(sampleData);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global Error:', { message: err.message, stack: err.stack });
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
