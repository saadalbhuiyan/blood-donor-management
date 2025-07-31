const Donor = require('../models/Donor');

// List all donors
exports.getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find();
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving donors', error });
    }
};

// Get donor details by ID
exports.getDonorById = async (req, res) => {
    const { id } = req.params;
    try {
        const donor = await Donor.findById(id);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        res.status(200).json(donor);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving donor details', error });
    }
};

// Delete donor record by ID
exports.deleteDonor = async (req, res) => {
    const { id } = req.params;
    try {
        const donor = await Donor.findByIdAndDelete(id);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        res.status(200).json({ message: 'Donor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting donor', error });
    }
};
