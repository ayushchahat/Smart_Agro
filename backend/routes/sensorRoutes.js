const express = require('express');
const { getSensors, addSensor, deleteSensor } = require('../controllers/sensorController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', getSensors); // Fetch all sensors
router.post('/', authMiddleware, addSensor); // Add a sensor
router.delete('/:id', authMiddleware, deleteSensor); // Delete a sensor

module.exports = router;
