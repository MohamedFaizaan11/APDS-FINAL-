// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ email: '', idNumber: '', accountNumber: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      navigate('/login');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const apiUrl = window.location.hostname === 'localhost'
          ? 'http://localhost:5000/api/auth/user'
          : 'https://your-production-domain.com/api/auth/user';
    
        console.log('Attempting to fetch user details from:', apiUrl);
    
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
    
        if (response.data.success) {
          setUserDetails({
            email: response.data.user.email,
            idNumber: response.data.user.idNumber,
            accountNumber: response.data.user.accountNumber,
          });
        } else {
          setError(response.data.message || 'Failed to fetch user details.');
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError(error.response?.data?.message || 'An error occurred while fetching user details.');
      }
    };
    

    fetchUserDetails();
  }, [navigate]);

  const goToPayment = () => {
    navigate('/secure-transaction');
  };

  const goToTransactionHistory = () => {
    navigate('/transaction-history');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="user-info">
        <p>Email: {userDetails.email}</p>
        <p>ID Number: {userDetails.idNumber}</p>
        <p>Account Number: {userDetails.accountNumber}</p>
      </div>
      <div className="home-card">
        <h2 className="home-title">Welcome to the Home Page!</h2>
        {error && <div className="error-message">{error}</div>}
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
