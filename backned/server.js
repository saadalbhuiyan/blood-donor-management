// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const adminDonorRoutes = require('./routes/adminDonorRoutes');
const donorRoutes = require('./routes/donorRoutes');
const donorAuthRoutes = require('./routes/donorAuthRoutes');
const donorDashboardRoutes = require('./routes/donorDashboardRoutes');
const bloodRequestRoutes = require('./routes/bloodRequestRoutes');

// Middleware for error handling
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
};

// Initialize dotenv
dotenv.config();

// Initialize express app
const app = express();

// Set port
const port = process.env.PORT || 5000;

// Middleware for parsing JSON requests
app.use(express.json());
app.use(cors()); // Allow Cross-Origin Resource Sharing

// Serve static files (e.g., profile pictures)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });

// Routes
// Admin Routes (Authentication, Profile, University, Department)
app.use('/api/admin', adminRoutes);

// Admin Donor Routes (List, Get, Delete Donors)
app.use('/api/admin', adminDonorRoutes);

// Donor Routes (Registration, Blood Groups, Universities, Departments)
app.use('/api', donorRoutes);

// Donor Authentication Routes (Login, Logout)
app.use('/api', donorAuthRoutes);

// Donor Dashboard Routes (Profile, Avatar, Availability)
app.use('/api', donorDashboardRoutes);

// Blood Request Routes (Search Donors)
app.use('/api', bloodRequestRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
