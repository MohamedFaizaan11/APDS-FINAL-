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
    });

    
    await transaction.save();
    res.status(201).json({ success: true, message: 'Transaction successful' });
    //if the transaction is successful the transaction will be stored in the DB and show the message above

  } catch (error) {
    console.error("Error in createTransaction:", error); 
    res.status(500).json({ success: false, message: 'Error processing transaction' });
  }
      //if the transaction is unsuccessful the transaction will not be stored in the DB and show the message above

};
