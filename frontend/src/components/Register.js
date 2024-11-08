// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check for matching passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Validate password format
    if (!passwordPattern.test(password)) {
      setError("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });
      alert(response.data.message);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/');
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        // Check if the error message indicates an existing email
        if (error.response.data.message === "Email already exists!") {
          setError("This email is already registered. Please use a different email.");
        } else {
          setError(error.response.data.message); // General error message
        }
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2>Register</h2>
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
          <div className="input-group password-container">
            <label>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div 
              className={`eye-icon ${showPassword ? 'active' : ''}`}
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </div>
          </div>
          <div className="input-group password-container">
            <label>Confirm Password:</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div 
              className={`eye-icon ${showConfirmPassword ? 'active' : ''}`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              👁️
            </div>
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
