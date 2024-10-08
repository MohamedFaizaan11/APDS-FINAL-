import React, { useState } from 'react';
import axios from 'axios';
import './SecureTransaction.css'; // Import the CSS file for styling

const SecureTransaction = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [currency, setCurrency] = useState('USD'); // New state for currency
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const cardNumberPattern = /^[0-9]{16}$/;
  const expiryDatePattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  const cvvPattern = /^[0-9]{3,4}$/;
  const amountPattern = /^[1-9][0-9]*$/;

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!amountPattern.test(amount)) {
      setError('Invalid amount');
      return;
    }
    if (!cardNumberPattern.test(cardNumber)) {
      setError('Invalid card number');
      return;
    }
    if (!expiryDatePattern.test(expiryDate)) {
      setError('Invalid expiry date (MM/YY)');
      return;
    }
    if (!cvvPattern.test(cvv)) {
      setError('Invalid CVV');
      return;
    }

    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/transactions', {
        recipient,
        amount,
        currency,  // Include the selected currency
        cardNumber,
        expiryDate,
        cvv,
      });

      if (response.data.success) {
        setSuccess(true);
        setPaymentInfo({ recipient, amount, currency });
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during payment processing.');
    }
  };

  return (
    <div className="secure-transaction-container">
      <div className="secure-transaction-card">
        <h2 className="secure-transaction-title">Secure Payment</h2>
        <form className="secure-transaction-form" onSubmit={handlePaymentSubmit}>
          {error && <p className="secure-transaction-error">{error}</p>}
          <div className="secure-transaction-field">
            <label>Recipient:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          <div className="secure-transaction-field">
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="secure-transaction-field">
            <label>Currency:</label> {/* Dropdown for selecting currency */}
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="ZAR">ZAR</option> {/* South African Rand */}
            </select>
          </div>
          <div className="secure-transaction-field">
            <label>Card Number:</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="secure-transaction-field">
            <label>Expiry Date (MM/YY):</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="secure-transaction-field">
            <label>CVV:</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
          <button className="secure-transaction-button" type="submit">
            Make Payment
          </button>
        </form>

        {success && (
          <div className="secure-transaction-success">
            <h3>Payment Successful!</h3>
            <p>Recipient: {paymentInfo.recipient}</p>
            <p>Amount: {paymentInfo.amount} {paymentInfo.currency}</p> {/* Display amount and currency */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureTransaction;
