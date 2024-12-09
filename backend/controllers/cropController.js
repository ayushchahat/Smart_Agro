const Crop = require('../models/Crop');
const fs = require('fs');
const path = require('path');


exports.addCrop = async (req, res) => {
  try {
    const { about, season, image } = req.body;

    if (!about || !season || !image) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Parse and validate Base64 image
    const matches = image.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ success: false, message: 'Invalid image format.' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const fileName = `crop-${Date.now()}.${mimeType.split('/')[1]}`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, buffer);

    const crop = await Crop.create({
      about,
      season,
      image: `/uploads/${fileName}`, // Save relative path
    });

    res.status(201).json({ success: true, crop });
  } catch (err) {
    console.error('Error saving crop:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getCrops = async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json({ success: true, crops });
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({ success: false, message: 'Error fetching crops.' });
  }
};

exports.deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const crop = await Crop.findByIdAndDelete(id);

    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop not found.' });
    }

    res.json({ success: true, message: 'Crop deleted successfully.' });
  } catch (error) {
    console.error('Error deleting crop:', error);
    res.status(500).json({ success: false, message: 'Error deleting crop.' });
  }
};
