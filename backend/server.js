const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();


app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api/v1/user', authRoutes);
app.use('/api/v1/emp/employees', employeeRoutes);

// Handle undefined routes
app.use((req, res, next) => {
    console.log("Route: ", req.url);
  res.status(404).json({
    status: false,
    message: 'Route Not Found',
  });
});

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
