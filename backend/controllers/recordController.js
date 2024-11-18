const Record = require('../models/Record');

// Fetch all records
exports.getRecords = async (req, res) => {
  try {
    const records = await Record.find({ farmerId: req.user.id }).sort({ cultivationDate: -1 });
    res.json({ success: true, records });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch records.' });
  }
};

// Add a new record
exports.addRecord = async (req, res) => {
  try {
    const { crop, cultivationDate, quantity, description } = req.body;
    const record = await Record.create({
      farmerId: req.user.id,
      crop,
      cultivationDate,
      quantity,
      description,
    });
    res.status(201).json({ success: true, record });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to add record.' });
  }
};
