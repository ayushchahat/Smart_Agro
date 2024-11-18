const Sensor = require('../models/Sensor');

// Fetch all sensors
exports.getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.json({ success: true, sensors });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch sensors.' });
  }
};

// Add a sensor
exports.addSensor = async (req, res) => {
  const { image, name, description, features } = req.body;
  try {
    const sensor = await Sensor.create({ image, name, description, features });
    res.status(201).json({ success: true, sensor });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to add sensor.' });
  }
};

// Delete a sensor
exports.deleteSensor = async (req, res) => {
  try {
    await Sensor.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Sensor deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete sensor.' });
  }
};
