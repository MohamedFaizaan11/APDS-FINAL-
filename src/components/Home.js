// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const Home = () => {
  const navigate = useNavigate();

  // Function to navigate to the SecureTransaction page
  const goToPayment = () => {
    navigate('/secure-transaction');
  };

  return (
    <div>
      <h2>Welcome to the Home Page!</h2>
      <p>You have successfully registered.</p>

      {/* Button to navigate to the secure transaction page */}
      <button onClick={goToPayment}>Make a Secure Payment</button>
    </div>
  );
};

export default Home;
