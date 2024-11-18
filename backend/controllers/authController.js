const Farmer = require('../models/Farmer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register farmer
exports.registerFarmer = async (req, res) => {
  const { name, email, password, role } = req.body; // Include 'role'
  try {
    const farmer = await Farmer.create({ name, email, password, role: role || 'Farmer' });
    const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Login farmer
exports.loginFarmer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const farmer = await Farmer.findOne({ email });
    if (!farmer || !(await bcrypt.compare(password, farmer.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch Farmer Profile
exports.getFarmerProfile = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.user.id).select('-password');
    res.json({ success: true, farmer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching profile data.' });
  }
};

// Update Farmer Profile
exports.updateFarmerProfile = async (req, res) => {
  const { name, email, role, profilePicture } = req.body; // Include 'role' and 'profilePicture'
  try {
    const farmer = await Farmer.findById(req.user.id);
    if (!farmer) {
      return res.status(404).json({ success: false, message: 'Farmer not found.' });
    }
    farmer.name = name || farmer.name;
    farmer.email = email || farmer.email;
    farmer.role = role || farmer.role;
    farmer.profilePicture = profilePicture || farmer.profilePicture;

    const updatedFarmer = await farmer.save();
    res.json({ success: true, farmer: updatedFarmer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating profile data.' });
  }
};
