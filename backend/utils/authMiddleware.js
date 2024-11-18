const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Split and get the token part after 'Bearer'
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Farmer.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
