// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const navigate = useNavigate();

  // Function to navigate to the SecureTransaction page if user successfully logs in
  const goToPayment = () => {
    navigate('/secure-transaction');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h2 className="home-title">Welcome to the Home Page!</h2>
        <p className="home-message">You have successfully registered.</p>
        <button className="home-button" onClick={goToPayment}>
          Make a Secure Payment
        </button>
      </div>
    </div>
  );
};

export default Home;
