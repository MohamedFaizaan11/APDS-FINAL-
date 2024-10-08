// src/models/Transaction.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // bcryptjs used for hashing sensitive data

const transactionSchema = new mongoose.Schema({
//command defines a schema for the MongoDB collection using Mongoose

  recipient: {
    type: String,
    required: true,
  },
// recipient name

  amount: {
    type: Number,
    required: true,
  },
// total amount due

  cardNumber: {
    type: String,
    required: true,
  },
// card number

  expiryDate: {
    type: String,
    required: true,
  },
// expiry date for users card

  cvv: {
    type: String,
    required: true,
  },
// cvv number for users card

}, { timestamps: true });

transactionSchema.pre('save', async function (next) {
  const transaction = this;


  if (transaction.isModified('cardNumber') || transaction.isModified('cvv')) {
    // Hashing the card number

    transaction.cardNumber = await bcrypt.hash(transaction.cardNumber, 10);
    // Hashing the CVV number
    transaction.cvv = await bcrypt.hash(transaction.cvv, 10);
  }

  next();
});

// Create the Transaction model from the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
