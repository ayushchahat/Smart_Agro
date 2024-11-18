const express = require('express');
const { getCrops, addCrop, deleteCrop } = require('../controllers/cropController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', getCrops); // Fetch all crops
router.post('/', authMiddleware, addCrop); // Add a crop
router.delete('/:id', authMiddleware, deleteCrop); // Delete a crop

module.exports = router;
