const Donor = require('../models/donorModel');

// Phase 3 - Donor Registration
const registerDonor = async (req, res) => {
    const { name, mobile, university, department, batch, roll, bloodGroup, notes } = req.body;

    if (!name || !mobile || !university || !department || !batch || !roll || !bloodGroup) {
        return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    if (notes && notes.length > 300) {
        return res.status(400).json({ message: 'Notes must be under 300 characters.' });
    }

    const exists = await Donor.findOne({ mobile, roll });
    if (exists) {
        return res.status(400).json({ message: 'Donor already registered with this mobile and roll number.' });
    }

    try {
        const newDonor = new Donor({ name, mobile, university, department, batch, roll, bloodGroup, notes });
        await newDonor.save();
        return res.status(201).json({ message: 'Donor registered successfully.', donor: newDonor });
    } catch (error) {
        return res.status(500).json({ message: 'Server error, please try again.', error: error.message });
    }
};

// Phase 4 - Login
const loginDonor = async (req, res) => {
    const { mobile, roll } = req.body;

    if (!mobile || !roll) {
        return res.status(400).json({ message: 'Mobile and roll number are required.' });
    }

    try {
        const donor = await Donor.findOne({ mobile, roll });
        if (!donor) {
            return res.status(404).json({ message: 'No donor found with provided credentials.' });
        }
        return res.status(200).json({ message: 'Login successful.', donor });
    } catch (error) {
        return res.status(500).json({ message: 'Server error during login.', error: error.message });
    }
};

// Phase 5 - Get donor profile
const getDonorProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const donor = await Donor.findById(id);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found.' });
        }
        return res.status(200).json(donor);
    } catch (error) {
        return res.status(500).json({ message: 'Server error fetching donor.', error: error.message });
    }
};

// Phase 5 - Update donor
const updateDonorProfile = async (req, res) => {
    const { id } = req.params;
    const { name, university, department, batch, bloodGroup, notes } = req.body;

    try {
        const donor = await Donor.findById(id);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found.' });
        }

        if (notes && notes.length > 300) {
            return res.status(400).json({ message: 'Notes must be under 300 characters.' });
        }

        donor.name = name || donor.name;
        donor.university = university || donor.university;
        donor.department = department || donor.department;
        donor.batch = batch || donor.batch;
        donor.bloodGroup = bloodGroup || donor.bloodGroup;
        donor.notes = notes || donor.notes;

        await donor.save();
        return res.status(200).json({ message: 'Profile updated successfully.', donor });
    } catch (error) {
        return res.status(500).json({ message: 'Server error updating profile.', error: error.message });
    }
};

// Phase 5 - Toggle availability
const toggleAvailability = async (req, res) => {
    const { id } = req.params;
    const { available } = req.body;

    try {
        const donor = await Donor.findById(id);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found.' });
        }

        donor.available = available;
        await donor.save();

        return res.status(200).json({ message: 'Availability updated.', available: donor.available });
    } catch (error) {
        return res.status(500).json({ message: 'Server error updating availability.', error: error.message });
    }
};

module.exports = {
    registerDonor,
    loginDonor,
    getDonorProfile,
    updateDonorProfile,
    toggleAvailability
};
