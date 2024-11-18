const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: String, required: true },
});

module.exports = mongoose.model('Sensor', sensorSchema);
