// controllers/manualAutomationController.js
const PumpState = require('../models/PumpState');

// Toggle the pump state
const togglePump = async (req, res) => {
  try {
    const { isOn } = req.body;

    // Update the pump state in the database
    const pumpState = await PumpState.findOneAndUpdate(
      {},
      { isOn, updatedAt: new Date(), ...(isOn ? { onTime: 0 } : {}) },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, message: 'Pump state updated', data: pumpState });
  } catch (error) {
    console.error('Error toggling pump state:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Set the pump timer
const setTimer = async (req, res) => {
  try {
    const { timer } = req.body;

    if (!timer || isNaN(timer)) {
      return res.status(400).json({ success: false, message: 'Invalid timer value' });
    }

    // Update the timer in the database
    const pumpState = await PumpState.findOneAndUpdate(
      {},
      { timer, isOn: true, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, message: 'Timer set', data: pumpState });

    // Auto turn off pump after the timer expires
    setTimeout(async () => {
      await PumpState.findOneAndUpdate({}, { isOn: false, timer: 0 });
    }, timer * 1000);
  } catch (error) {
    console.error('Error setting timer:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get the current pump state
const getPumpState = async (req, res) => {
  try {
    const pumpState = await PumpState.findOne();
    res.status(200).json({ success: true, data: pumpState || {} });
  } catch (error) {
    console.error('Error fetching pump state:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  togglePump,
  setTimer,
  getPumpState,
};
