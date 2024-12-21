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
const manualAutomationRoutes = require('./routes/manualAutomationRoutes');
// Import Routes
const authRoutes = require('./routes/authRoutes');
const recordRoutes = require('./routes/recordRoutes');

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
app.use('/api/manual', manualAutomationRoutes);

// Socket.IO for real-time data
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Function to generate random values within a specified range
  function getRandomInRange(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }

  // Emit sensor data matching the new specified ranges
  const interval = setInterval(() => {
    const sampleData = {
      timestamp: new Date().toISOString(),
      temperature: getRandomInRange(20, 27), // Temperature range: 20-27°C
      humidity: getRandomInRange(40, 75), // Humidity range: 70-85%
      soilMoisture: getRandomInRange(65, 80), // Soil moisture range: 400-600
      lightIntensity: getRandomInRange(400, 600), // Arbitrary light intensity range
    };

    socket.emit('sensor-data', sampleData);
  }, 6000);

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

// Manual Automation Real-Time Updates
io.on('connection', (socket) => {
  console.log(`Manual Automation client connected: ${socket.id}`);

  // Emit initial pump state when a client connects
  socket.on('get-initial-state', async () => {
    const pumpState = { isOn: false, timer: 0 }; // Fetch or define the initial state
    socket.emit('update-pump-state', pumpState);
  });

  // Listen for pump state updates
  socket.on('update-pump', (data) => {
    const updatedState = { isOn: data.isOn, timer: data.timer };
    io.emit('update-pump-state', updatedState); // Broadcast updated state
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log(`Manual Automation client disconnected: ${socket.id}`);
  });
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
