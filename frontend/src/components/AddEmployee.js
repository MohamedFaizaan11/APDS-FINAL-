import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const initialData = { email: '', password: '' };
  const [employeeData, setEmployeeData] = useState(initialData);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/employees', employeeData);

      if (response.data.success) {
        setSuccess('Employee added successfully!');
        setEmployeeData(initialData); // Reset form fields
      } else {
        setError(response.data.message || 'Failed to add employee. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Failed to add employee. Please try again.');
      } else if (error.request) {
        setError('No response from server. Check if it is running.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="add-employee">
      <button className="back-button" onClick={handleBackClick}>Back</button>
      <h1>Add Employee</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter employee's email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={employeeData.password}
            onChange={handleInputChange}
            required
            placeholder="Enter password"
          />
          <p className="password-requirements">
            Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.
          </p>
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
