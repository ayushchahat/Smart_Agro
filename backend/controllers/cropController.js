const Crop = require('../models/Crop');

// Fetch all crops
exports.getCrops = async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json({ success: true, crops });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch crops.' });
  }
};

// Add a crop
exports.addCrop = async (req, res) => {
  const { image, about, season } = req.body;
  try {
    const crop = await Crop.create({ image, about, season });
    res.status(201).json({ success: true, crop });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to add crop.' });
  }
};

// Delete a crop
exports.deleteCrop = async (req, res) => {
  try {
    await Crop.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Crop deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete crop.' });
  }
};
