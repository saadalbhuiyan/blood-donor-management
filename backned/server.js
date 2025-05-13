const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const donorRoute = require('./routes/donorRoute');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.use('/api/donors', donorRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
