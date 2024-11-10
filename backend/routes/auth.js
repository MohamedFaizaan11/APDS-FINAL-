const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// Constants for maximum attempts and lockout duration
const MAX_ATTEMPTS = 3; // Maximum login attempts
const LOCKOUT_DURATION = 5 * 60 * 1000; // Lockout period in milliseconds (5 minutes)

// Helper function to generate a unique account number
const generateAccountNumber = () => {
  return 'ACCT' + Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit account number
};

// Registration route
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('idNumber').isLength({ min: 13, max: 13 }).withMessage('ID number must be 13 digits')
  ],
  async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password, idNumber } = req.body;

    try {
      // Checking if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }

      // Hashing password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      const accountNumber = generateAccountNumber(); // Generate a unique account number
      const newUser = new User({ email, password: hashedPassword, idNumber, accountNumber });

      // Save the new user to the database
      await newUser.save();

      res.status(201).json({ 
        success: true, 
        message: 'User registered successfully', 
        email: newUser.email, 
        idNumber: newUser.idNumber, 
        accountNumber: newUser.accountNumber 
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ success: false, message: 'Error registering user' });
    }
  }
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').notEmpty().withMessage('Password cannot be empty')
  ],
  async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
      }

      // Check if the user is locked out
      if (user.failedAttempts >= MAX_ATTEMPTS) {
        const currentTime = Date.now();
        const lockoutEnd = new Date(user.lockoutUntil).getTime() || 0;

        if (currentTime < lockoutEnd) {
          const remainingTime = Math.ceil((lockoutEnd - currentTime) / 1000); // Convert to seconds
          return res.status(429).json({ success: false, message: `Too many attempts. Try again in ${remainingTime} seconds.` });
        } else {
          // Reset failed attempts if lockout duration has passed
          user.failedAttempts = 0; 
          user.lockoutUntil = null; // Clear lockout time
        }
      }

      // Compare the entered password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        user.failedAttempts += 1; // Increment failed attempts
        user.lockoutUntil = user.failedAttempts >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_DURATION : null; // Set lockout time if max attempts reached
        await user.save(); // Save user data with updated attempts and timestamp

        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      // If authentication is successful, reset failed attempts
      user.failedAttempts = 0;
      user.lockoutUntil = null; // Clear lockout time
      await user.save();

      // If authentication is successful
      res.status(200).json({ 
        success: true, 
        message: 'Login successful', 
        email: user.email, 
        idNumber: user.idNumber, 
        accountNumber: user.accountNumber 
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

module.exports = router;
