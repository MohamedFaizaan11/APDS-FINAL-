
const fs= require("fs")
const PORT = 3001;
const https=require("https")

const options = {
  key: fs.readFileSync('certs/privatekey.pem'),
  cert: fs.readFileSync('certs/certificate.pem')
}



let server = https.createServer(options)
console.log(PORT)
server.listen(PORT);



// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Ensure this path is correct
const transactionRoutes = require('./routes/transactionRoutes'); // Import transaction routes

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // 
app.use(express.json()); 
app.use(express.json());
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Use the auth routes
app.use('/api/auth', authRoutes);

// Use the transaction routes
app.use('/api/transactions', transactionRoutes); // Set base URL for transactions
