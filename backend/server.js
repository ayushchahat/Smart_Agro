const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
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
app.use(express.json()); // Parse incoming JSON
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/crops', cropRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
