const Crop = require('../models/Crop');
const fs = require('fs');
const path = require('path');

exports.addCrop = async (req, res) => {
  try {
    const { about, season, image } = req.body;

    if (!about || !season || !image) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const matches = image.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, message: 'Invalid image format.' });
    }

    const type = matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, 'base64');

    const fileName = `${Date.now()}-crop.${type.split('/')[1]}`;
    const filePath = path.join(__dirname, '../uploads', fileName);

    fs.writeFileSync(filePath, buffer);

    const newCrop = await Crop.create({
      about,
      season,
      image: `/uploads/${fileName}`,
    });

    res.status(201).json({ success: true, crop: newCrop });
  } catch (error) {
    console.error('Error adding crop:', error);
    res.status(500).json({ success: false, message: 'Error adding crop.' });
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
