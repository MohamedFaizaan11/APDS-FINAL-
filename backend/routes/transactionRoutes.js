// src/routes/transactionRoutes.js
const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

// Existing POST route for creating transactions
router.post('/', transactionController.createTransaction);

// Approve and deny routes
router.put('/:id/approve', transactionController.approveTransaction);
router.put('/:id/deny', transactionController.denyTransaction);

router.get('/', transactionController.getTransactions);


module.exports = router;
