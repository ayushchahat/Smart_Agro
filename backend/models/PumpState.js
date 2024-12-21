// models/PumpState.js
const mongoose = require('mongoose');

const PumpStateSchema = new mongoose.Schema({
  isOn: { type: Boolean, default: false }, // Current state of the pump
  onTime: { type: Number, default: 0 }, // Total time the pump has been on (in seconds)
  timer: { type: Number, default: 0 }, // User-set timer value (in seconds)
  updatedAt: { type: Date, default: Date.now }, // Timestamp of the last update
});

module.exports = mongoose.model('PumpState', PumpStateSchema);
