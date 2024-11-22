const Sensor = require('../models/Sensor');
const fs = require('fs');
const path = require('path');

exports.addSensor = async (req, res) => {
  try {
    const { name, description, features, image } = req.body;

    if (!name || !description || !features || !image) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Assuming image is base64 data
    const matches = image.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, message: 'Invalid image format.' });
    }

    const type = matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, 'base64');

    const fileName = `${Date.now()}-sensor.${type.split('/')[1]}`;
    const filePath = path.join(__dirname, '../uploads', fileName);

    fs.writeFileSync(filePath, buffer);

    const newSensor = await Sensor.create({
      name,
      description,
      features,
      image: `/uploads/${fileName}`, // Ensure this is correct
    });

    res.status(201).json({ success: true, sensor: newSensor });
  } catch (error) {
    console.error('Error adding sensor:', error);
    res.status(500).json({ success: false, message: 'Error adding sensor.' });
  }
};

exports.getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.json({ success: true, sensors });
  } catch (error) {
    console.error('Error fetching sensors:', error);
    res.status(500).json({ success: false, message: 'Error fetching sensors.' });
  }
};

exports.deleteSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await Sensor.findByIdAndDelete(id);

    if (!sensor) {
      return res.status(404).json({ success: false, message: 'Sensor not found.' });
    }

    res.json({ success: true, message: 'Sensor deleted successfully.' });
  } catch (error) {
    console.error('Error deleting sensor:', error);
    res.status(500).json({ success: false, message: 'Error deleting sensor.' });
  }
};
