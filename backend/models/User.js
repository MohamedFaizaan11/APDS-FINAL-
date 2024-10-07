// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Trim whitespace
    lowercase: true, // Convert to lowercase
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Ensure minimum password length
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;