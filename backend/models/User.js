// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
 

  failedAttempts: {
    type: Number,
    default: 0, // Track failed login attempts
  },
  lockoutUntil: {
    type: Date,
    default: null, // Track when the user should be unlocked
  },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
