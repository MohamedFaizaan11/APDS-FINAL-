// src/components/TransactionHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Adjusting the URL to match the defined route
        const response = await axios.get(`http://localhost:5000/api/transactions`);
        if (response.data.success) {
          setTransactions(response.data.transactions);
        } else {
          setError(response.data.message || 'Failed to fetch transactions.');
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError('An error occurred while fetching transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transaction-history">
      <h1>Your Transaction History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              <p>Recipient: {transaction.recipient}</p>
              <p>Amount: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.amount)}</p>
              <p>Date: {transaction.date ? new Date(transaction.date).toLocaleDateString() : "N/A"}</p>
              <p>Status: {transaction.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;
