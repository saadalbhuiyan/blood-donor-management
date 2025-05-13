// bloodSearchController.js
const Donor = require('../models/donorModel'); // ধরে নিচ্ছি Donor মডেল আছে

// Search Donors by blood group, university, and department (optional)
const searchDonors = async (req, res) => {
    try {
        // Query parameters
        const { bloodGroup, university, department } = req.query;

        // Validation: bloodGroup and university are required
        if (!bloodGroup || !university) {
            return res.status(400).json({ message: 'Blood group and university are required' });
        }

        // Build query object
        const query = {
            bloodGroup,
            university,
            available: true, // Only return available donors
        };

        // Add department to query if provided
        if (department) {
            query.department = department;
        }

        // Fetch donors from MongoDB
        const donors = await Donor.find(query).select('name mobile department batch notes');

        // Check if donors are found
        if (donors.length === 0) {
            return res.status(404).json({ message: 'No available donors found' });
        }

        // Return donor list
        res.status(200).json(donors);
    } catch (error) {
        console.error('Error searching donors:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { searchDonors };