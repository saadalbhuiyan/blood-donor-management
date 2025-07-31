const Donor = require('../models/Donor');

// Search donors by filters
exports.searchDonors = async (req, res) => {
    const { bloodGroup, university, department } = req.query;
    try {
        const donors = await Donor.find({
            bloodGroup: bloodGroup || { $exists: true },
            university: university || { $exists: true },
            department: department || { $exists: true },
            availability: true  // Only show available donors
        });
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json({ message: 'Error searching for donors', error });
    }
};
