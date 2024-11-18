const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  image: { type: String, required: true },
  about: { type: String, required: true },
  season: { type: String, required: true },
});

module.exports = mongoose.model('Crop', cropSchema);
