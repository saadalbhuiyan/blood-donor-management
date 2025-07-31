const Donor = require('../models/Donor');
const jwt = require('jsonwebtoken');

// Donor Login
exports.donorLogin = async (req, res) => {
    const { mobile, rollNumber } = req.body;
    try {
        const donor = await Donor.findOne({ mobile, rollNumber });
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        const token = jwt.sign({ id: donor._id, mobile: donor.mobile }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Donor Logout (Invalidate the token)
exports.donorLogout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};
