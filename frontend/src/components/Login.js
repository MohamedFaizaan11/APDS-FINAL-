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

  // Hardcoded employee credentials
  const employeeCredentials = {
    email: 'user1@mail.com',
    password: 'Jake123!',
  };

  // Define patterns for email and password validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Validate email pattern
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(''); // Clear any existing error
    setLoading(true); // Show loading state

    try {
      // Check for hardcoded employee credentials
      if (email === employeeCredentials.email && password === employeeCredentials.password) {
        localStorage.setItem('userToken', 'dummy_token');
        localStorage.setItem('role', 'employee');
        navigate('/employeedashboard');
        return;
      }

      // Prepare employee data for the API request
      const employeeData = { email, password };

      // First API call
      const response1 = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Handle the response from the first API call
      if (response1.data.success) {
        localStorage.setItem('userToken', response1.data.token);
        localStorage.setItem('role', response1.data.role);
        navigate('/home');
        return;
      }

      // Second API call for employee authentication
      const response = await axios.post('http://localhost:5000/api/employees', employeeData);

      // Handle the response from the second API call
      if (response.data.success) {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('role', response.data.role);
        navigate('/home');
      } else {
        setError('Invalid credentials. Please try again.'); // Show invalid credentials message
        setPassword(''); // Clear password field on failure
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
      setPassword(''); // Clear password field on error
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h1 className="welcome-message">Welcome to Your Secure Portal</h1>
      <div className="login-content">
        <h2>Log In</h2>
        <p>Please log in to your account</p>
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
          <p>Don't have an account? <button onClick={goToRegister}>Register here</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
