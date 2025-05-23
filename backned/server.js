const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import Routes
const donorRoute = require('./routes/donorRoute');
const universityRoute = require('./routes/universityRoute');
const bloodSearchRoutes = require('./routes/bloodSearchRoute');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data
app.use(cors());  // Enable Cross-Origin Resource Sharing

// Database Connection
connectDB();  // Connect to MongoDB

// Route Mounting
// Important: Mount search routes before donorRoute to prevent ":id" conflict
app.use('/api/donors', bloodSearchRoutes);     // Search donors: /api/donors/search
app.use('/api/donors', donorRoute);            // Donor CRUD: /api/donors/:id
app.use('/api/universities', universityRoute); // University and departments routes

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
