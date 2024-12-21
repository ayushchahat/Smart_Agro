// routes/manualAutomationRoutes.js
const express = require('express');
const router = express.Router();
const {
  togglePump,
  setTimer,
  getPumpState,
} = require('../controllers/manualAutomationController');

// Route to toggle pump state
router.post('/toggle-pump', togglePump);

// Route to set pump timer
router.post('/set-timer', setTimer);

// Route to get pump state
router.get('/state', getPumpState);

module.exports = router;
