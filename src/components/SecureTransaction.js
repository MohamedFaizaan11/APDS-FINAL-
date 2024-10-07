// src/components/SecureTransaction.js
import React, { useState } from 'react';

const SecureTransaction = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log(`Processing payment of ${amount}`);
    // Add secure payment processing logic here
  };

  return (
    <div>
      <h2>Secure Payment</h2>
      <form onSubmit={handlePaymentSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Expiry Date:</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
        <button type="submit">Make Payment</button>
      </form>
    </div>
  );
};

export default SecureTransaction;
