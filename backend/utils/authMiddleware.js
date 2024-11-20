const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');

const authMiddleware = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1]; // Token is expected after 'Bearer '
  
  // If no token is found, deny access
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the farmer from the decoded token ID
    const farmer = await Farmer.findById(decoded.id).select('-password'); // Don't send the password in the response
    if (!farmer) {
      return res.status(401).json({ message: 'Authorization denied: user not found.' });
    }
    
    // Attach the farmer object to the request for future use
    req.user = farmer;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid or expired, send an error message
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
