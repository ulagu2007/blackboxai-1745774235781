const express = require('express');
const Template = require('../models/Template');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create a new template
router.post('/', authMiddleware, async (req, res) => {
  const { name, content } = req.body;
  try {
    const template = new Template({ name, content, createdBy: req.user.id });
    await template.save();
    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all templates for the user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const templates = await Template.find({ createdBy: req.user.id });
    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get a single template by id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const template = await Template.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update a template by id
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, content } = req.body;
  try {
    const template = await Template.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { name, content },
      { new: true }
    );
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a template by id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const template = await Template.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json({ message: 'Template deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
