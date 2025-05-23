// bloodSearchController.js
const Donor = require('../models/donorModel'); // Assuming the Donor model is defined

// Search donors by blood group, university, and department (optional)
const searchDonors = async (req, res) => {
    try {
        // Extract query parameters
        const { bloodGroup, university, department } = req.query;

        // Validation: bloodGroup and university are mandatory
        if (!bloodGroup || !university) {
            return res.status(400).json({ message: 'Blood group and university are required' });
        }

        // Build query object
        const query = {
            bloodGroup,
            university,
            available: true, // Only fetch available donors
        };

        // Include department in query if provided
        if (department) {
            query.department = department;
        }

        // Fetch donors from MongoDB based on the query
        const donors = await Donor.find(query).select('name mobile department batch notes');

        // Check if any donors are found
        if (donors.length === 0) {
            return res.status(404).json({ message: 'No available donors found' });
        }

        // Return the list of donors
        res.status(200).json(donors);
    } catch (error) {
        console.error('Error searching donors:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { searchDonors };
