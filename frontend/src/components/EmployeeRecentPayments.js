import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EmployeeRecentPayments = () => {
  const [payments, setPayments] = useState([]);
  const [status, setStatus] = useState('pending'); // Initial status
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchPayments = async (status) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions?status=${status}`);
      if (response.data.success) {
        setPayments(response.data.transactions);
      } else {
        setError(response.data.message || 'Failed to fetch payments.');
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError('An error occurred while fetching payments.');
    }
  };

  useEffect(() => {
    fetchPayments(status);
  }, [status]);

  const handleApproval = async (id, action) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/transactions/${id}/${action}`);
      if (response.data.success) {
        setPayments(prevPayments =>
          prevPayments.map(payment =>
            payment._id === id ? { ...payment, status: action === 'approve' ? 'approved' : 'denied' } : payment
          )
        );
      } else {
        setError(response.data.message || 'Failed to update payment status.');
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      setError('An error occurred while updating payment status.');
    }
  };

  return (
    <div className="recent-payments">
      <h1>Recent Payments</h1>

      <label htmlFor="status">Filter by status:</label>
      <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="denied">Denied</option>
      </select>

      {error && <div className="error-message">{error}</div>}
      {payments.length === 0 ? (
        <p>No {status} payments available.</p>
      ) : (
        <ul>
          {payments.map((payment) => (
            <li key={payment._id}>
              <p>User Email: {payment.userEmail}</p>
              <p>Recipient: {payment.recipient}</p>
              <p>Amount: ${payment.amount}</p>
              <p>Date: {new Date(payment.date).toLocaleDateString() || 'Date Invalid'}</p>
              <p>Status: {payment.status}</p>
              {payment.status === 'pending' && (
                <div>
                  <button onClick={() => handleApproval(payment._id, 'approve')}>Approve</button>
                  <button onClick={() => handleApproval(payment._id, 'deny')}>Deny</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      
      {/* Back button */}
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default EmployeeRecentPayments;
