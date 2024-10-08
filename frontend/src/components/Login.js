// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Send the email and password to the backend for authentication
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // If the login is successful, navigate to the home page
      if (response.data.success) {
        navigate('/home');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error(error);
      // Handle the error message from the server
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h1 className="welcome-message">Welcome to Your Secure Portal</h1> {/* Welcome message at the top */}
      <div className="login-content">
        <h2>Log In</h2>
        <p>Please log in to your account</p> {/* Welcoming message */}
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="register-link">
          <p>Don't have an account? <button onClick={goToRegister}>Register here</button></p> {/* Navigation to Register */}
        </div>
      </div>
    </div>
  );
};

export default Login;
