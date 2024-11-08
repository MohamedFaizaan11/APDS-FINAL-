const fs = require("fs");
const PORT = 3001;
const https = require("https");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet'); // Import helmet
const rateLimit = require('express-rate-limit'); // Import rate limiter
const morgan = require('morgan'); // Import morgan
const authRoutes = require('./routes/auth'); // Ensure this path is correct
const transactionRoutes = require('./routes/transactionRoutes'); // Import transaction routes
const employeeRoutes = require("./routes/employeeRoutes"); // Import employee routes


// Load environment variables
dotenv.config();

// SSL options
const options = {
  key: fs.readFileSync('certs/privatekey.pem'),
  cert: fs.readFileSync('certs/certificate.pem')
};

let server = https.createServer(options);
console.log(PORT);
server.listen(PORT);

// Express app setup
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Use helmet for security
app.use(cors()); // Default CORS
app.use(express.json());
app.use(morgan('combined')); // Use morgan for logging requests

// CORS options (customize as needed)
const corsOptions = {
  origin: 'https://localhost:3000', // Replace with your frontend URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use custom CORS options

// Rate limiter middleware (limit requests to 100 per minute)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter); // Apply rate limiter to all routes

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
app.use('/api/transactions', transactionRoutes);

app.use("/api/employees", employeeRoutes); // Use employee routes


// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});


