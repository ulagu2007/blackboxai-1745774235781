const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// AI chat endpoint
router.post('/chat', authMiddleware, async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });
    res.json({ response: completion.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ message: 'OpenAI API error', error: err.message });
  }
});

module.exports = router;
