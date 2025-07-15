const express = require('express');
const router = express.Router();
const History = require('../models/History');

// 🔽 POST: Add a new history record
router.post('/', async (req, res) => {
  const { userId, points } = req.body;

  if (!userId || typeof points !== 'number') {
    return res.status(400).json({ error: 'userId and numeric points are required' });
  }

  try {
    const newHistory = new History({
      userId,
      points,
      timestamp: new Date(), // Optional, default is already set
    });

    await newHistory.save();
    res.status(201).json(newHistory);
  } catch (err) {
    console.error('❌ Error adding history:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 🔼 GET: Fetch all history records (most recent first)
router.get('/', async (req, res) => {
  try {
    const histories = await History.find()
      .sort({ timestamp: -1 }) // Descending order
      .populate('userId', 'username'); // Optional: populate username

    res.json(histories);
  } catch (err) {
    console.error('❌ Error fetching history:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
