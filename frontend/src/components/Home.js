// src/components/Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by checking the token in local storage
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  const goToPayment = () => {
    navigate('/secure-transaction');
  };

  const goToTransactionHistory = () => {
    navigate('/transaction-history'); // Navigate to transaction history
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h2 className="home-title">Welcome to the Home Page!</h2>
        <p className="home-message">You have successfully registered.</p>
        <button className="home-button" onClick={goToPayment}>
          Make an International Payment
        </button>
        <button className="home-button" onClick={goToTransactionHistory}>
          View Transaction History
        </button>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
