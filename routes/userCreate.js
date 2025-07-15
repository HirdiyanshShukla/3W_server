



const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    const newUser = new User({ username });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate username if unique is enforced
      return res.status(400).json({ message: 'Username already exists' });
    }

    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all users sorted by totalPoints DESC
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});

// Update totalPoints for a user by ID
router.put('/:id', async (req, res) => {
  try {
    const { totalPoints } = req.body;

    if (typeof totalPoints !== 'number') {
      return res.status(400).json({ message: 'totalPoints must be a number' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $inc: { totalPoints: totalPoints } }, // ✅ increment totalPoints
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
});




module.exports = router;
