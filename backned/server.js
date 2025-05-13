const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import Routes
const donorRoute = require('./routes/donorRoute');
const universityRoute = require('./routes/universityRoute');
const bloodSearchRoutes = require('./routes/bloodSearchRoute');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database Connection
connectDB();

// ✅ Important: Mount search routes before donorRoute to prevent ":id" conflict
app.use('/api/donors', bloodSearchRoutes);     // ✅ /api/donors/search
app.use('/api/donors', donorRoute);            // ✅ /api/donors/:id
app.use('/api/universities', universityRoute); // ✅ university routes

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
