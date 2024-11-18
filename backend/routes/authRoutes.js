const express = require('express');
const {
  registerFarmer,
  loginFarmer,
  getFarmerProfile,
  updateFarmerProfile,
} = require('../controllers/authController');
const authMiddleware = require('../utils/authMiddleware');
const router = express.Router();

router.post('/register', registerFarmer); // Register farmer
router.post('/login', loginFarmer); // Login farmer
router.get('/profile', authMiddleware, getFarmerProfile); // Fetch profile
router.put('/profile', authMiddleware, updateFarmerProfile); // Update profile

module.exports = router;
