const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Import cors
require('dotenv').config();

const app = express();

// ✅ Enable CORS for all origins (or configure it below)
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/backend/user', require('./routes/userCreate'));
app.use('/backend/history', require('./routes/history'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
