const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token after 'Bearer'
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const farmer = await Farmer.findById(decoded.id).select('-password');
    if (!farmer) {
      return res.status(401).json({ message: 'Authorization denied: user not found.' });
    }
    req.user = farmer;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
