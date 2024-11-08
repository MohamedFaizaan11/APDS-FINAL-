// src/controllers/transactionController.js
const Transaction = require('../models/Transaction');
const bcrypt = require('bcryptjs');

exports.createTransaction = async (req, res) => {
  try {

    console.log("Transaction data received:", req.body); 
    //this will notify all data has been recieved

    const { recipient, amount, cardNumber, expiryDate, cvv } = req.body;
    //extraction of all payment details

    if (!recipient || !amount || !cardNumber || !expiryDate || !cvv) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    //using if statement to validate all the information entered 

    const hashedCardNumber = await bcrypt.hash(cardNumber, 10);
    //hasing the card number in the mongoDB
    const hashedCVV = await bcrypt.hash(cvv, 10);
    //hashing the CVV number in the mongoDB

    // a new transaction will be created as well as stored and displayed 
    const transaction = new Transaction({
      recipient, // name of recipient will be stored and displayed 
      amount,   // amount in rands will be stored and displayed
      cardNumber: hashedCardNumber,  // card number will be stored and displayed but it will be hashed
      expiryDate, // the expiration date will be stored and displayed
      cvv: hashedCVV,  // CVV number will be stored and displayed but it will be hashed
      status:'pending' 
    });

    
    await transaction.save();
    res.status(201).json({ success: true, message: 'Payment is pending approval' });
    //if the transaction is successful the transaction will be stored in the DB and show the message above

  } catch (error) {
    console.error("Error in createTransaction:", error); 
    res.status(500).json({ success: false, message: 'Error processing transaction' });
  }
      //if the transaction is unsuccessful the transaction will not be stored in the DB and show the message above

};

// Approve a transaction
exports.approveTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    res.status(200).json({ success: true, message: 'Transaction approved', transaction });
  } catch (error) {
    console.error("Error in approveTransaction:", error);
    res.status(500).json({ success: false, message: 'Error approving transaction' });
  }
};

// Deny a transaction
exports.denyTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(id, { status: 'denied' }, { new: true });
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    res.status(200).json({ success: true, message: 'Transaction denied', transaction });
  } catch (error) {
    console.error("Error in denyTransaction:", error);
    res.status(500).json({ success: false, message: 'Error denying transaction' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};  // Filter by status if provided
    const transactions = await Transaction.find(filter);
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error("Error in getTransactions:", error);
    res.status(500).json({ success: false, message: 'Error fetching transactions' });
  }
};
