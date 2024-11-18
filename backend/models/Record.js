const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
  crop: { type: String, required: true },
  cultivationDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Record', recordSchema);
