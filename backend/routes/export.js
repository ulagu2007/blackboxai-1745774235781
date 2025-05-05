const express = require('express');
const User = require('../models/User');
const Template = require('../models/Template');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Export user data
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Export templates
router.get('/templates', authMiddleware, async (req, res) => {
  try {
    const templates = await Template.find({ createdBy: req.user.id });
    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
