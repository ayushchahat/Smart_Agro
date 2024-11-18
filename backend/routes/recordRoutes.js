const express = require('express');
const { getRecords, addRecord } = require('../controllers/recordController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getRecords); // Fetch all records
router.post('/', authMiddleware, addRecord); // Add a new record

module.exports = router;
