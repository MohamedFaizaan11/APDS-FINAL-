const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token generation
const router = express.Router();

// Employee model (adjust the schema if needed)
const Employee = mongoose.model("Employee", new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

// Route to add a new employee
router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    try {
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({ success: false, message: "Employee already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newEmployee = new Employee({ email, password: hashedPassword });
      await newEmployee.save();

      res.status(201).json({ success: true, message: "Employee added successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to add employee." });
    }
});

// Route to login an employee
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    try {
      const employee = await Employee.findOne({ email });
      if (!employee) {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
      }

      // Compare provided password with hashed password
      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
      }

      // Generate a token (optional)
      const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({
        success: true,
        token, // Include the token in the response if you're using JWT
        message: "Login successful."
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Login failed. Please try again." });
    }
});

module.exports = router;
