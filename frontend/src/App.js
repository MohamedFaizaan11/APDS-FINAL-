// src/App.js
import React from 'react'; // Import React to use JSX
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import Login from './components/Login'; // Import Login component
import Register from './components/Register'; // Import Register component
import Home from './components/Home'; // Import Home component
import SecureTransaction from './components/SecureTransaction'; // Import SecureTransaction component
import EmployeeDashBoard from './components/EmployeeDashBoard'; // Import EmployeeDashBoard component
import EmployeeRecentPayments from './components/EmployeeRecentPayments'; // Import EmployeeRecentPayments component
import AddEmployee from './components/AddEmployee'; // Import AddEmployee component
import TransactionHistory from './components/TransactionHistory'; // Import TransactionHistory component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for Login Page */}
          <Route path="/" element={<Login />} />
          {/* Route for Register Page */}
          <Route path="/register" element={<Register />} />
          {/* Route for Home Page */}
          <Route path="/home" element={<Home />} />
          {/* Route for Secure Transaction (Payment) Page */}
          <Route path="/secure-transaction" element={<SecureTransaction />} />
          {/* Route for Employee Dashboard */}
          <Route path="/EmployeeDashBoard" element={<EmployeeDashBoard />} />
          {/* Route for Recent Payments */}
          <Route path="/recent-payments" element={<EmployeeRecentPayments />} />
          {/* Route for Add User */}
          <Route path="/add-user" element={<AddEmployee />} />
          {/* Route for Transaction History */}
          <Route path="/transaction-history" element={<TransactionHistory />} /> {/* New route for Transaction History */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
