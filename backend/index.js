is all require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const templateRoutes = require('./routes/templates');
const exportRoutes = require('./routes/export');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/brainai', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Brain.AI Backend is running');
});

const path = require('path');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/export', exportRoutes);

app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all handler to serve React's index.html for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
