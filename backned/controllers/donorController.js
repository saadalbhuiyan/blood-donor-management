const Donor = require('../models/donorModel');

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

    const newDonor = new Donor({
        name,
        mobile,
        university,
        department,
        batch,
        roll,
        bloodGroup,
        notes
    });

    try {
        await newDonor.save();
        return res.status(201).json({ message: 'Donor registered successfully.', donor: newDonor });
    } catch (error) {
        return res.status(500).json({ message: 'Server error, please try again.', error: error.message });
    }
};

module.exports = { registerDonor };
