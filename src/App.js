// src/App.js
import React from 'react'; // Import React to use JSX
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import Login from './components/Login'; // Import Login component
import Register from './components/Register'; // Import Register component
import Home from './components/Home'; // Import Home component
import SecureTransaction from './components/SecureTransaction'; // Import SecureTransaction component

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
