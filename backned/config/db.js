const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    try {
        // Establish connection to MongoDB using the URI from the environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected');
    } catch (error) {
        // If connection fails, log the error and terminate the process
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);  // Exit the process with a failure code
    }
};

module.exports = connectDB;
