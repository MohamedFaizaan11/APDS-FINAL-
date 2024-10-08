const express = require('express');
const bcrypt = require('bcrypt'); // using bcrypt for password hashing to ensure safety of the user
const User = require('../models/User'); // Import User models
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Checking if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hashing password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // If authentication is successful, you can send success and optionally user data
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
