// src/components/EmployeeDashBoard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeDashBoard.css';

const EmployeeDashBoard = () => {
  const navigate = useNavigate();

  // Function to handle navigation to recent payments
  const handleEmployeeRecentPayments = () => {
    navigate('/recent-payments');
  };

  // Function to handle navigation to add user
  const handleAddUser = () => {
    navigate('/add-user');
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear user session or authentication state here
    // For example: localStorage.removeItem('token'); or setAuth(null);
    console.log('Logout functionality to be implemented');
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="employee-dashboard">
      <h1>Employee Dashboard</h1>
      <p>Welcome to your dashboard, Employee!</p>
      <div className="dashboard-content">
        <p>Here you can manage transactions and add users!</p>
        <button onClick={handleEmployeeRecentPayments} className="dashboard-button">
          View Recent Payments
        </button>
        <button onClick={handleAddUser} className="dashboard-button">
          Add User
        </button>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="footer">
        &copy; {new Date().getFullYear()} Secure Portal. All Rights Reserved.
      </div>
    </div>
  );
};

export default EmployeeDashBoard;
