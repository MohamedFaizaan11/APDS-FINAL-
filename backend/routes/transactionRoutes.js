// src/routes/transactionRoutes.js
const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

// Define a POST route for creating transactions
router.post('/', transactionController.createTransaction);

module.exports = router;
