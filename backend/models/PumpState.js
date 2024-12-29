// models/PumpState.js
const mongoose = require('mongoose');

const PumpStateSchema = new mongoose.Schema({
  isOn: { type: Boolean, default: false }, 
  onTime: { type: Number, default: 0 }, 
  timer: { type: Number, default: 0 }, 
  updatedAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('PumpState', PumpStateSchema);
