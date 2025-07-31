const Donor = require('../models/Donor');
const multer = require('multer');

// Setup file storage for multer (profile picture upload)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('avatar');

// Get donor profile
exports.getDonorProfile = async (req, res) => {
    const donor = await Donor.findById(req.admin.id);
    if (!donor) {
        return res.status(404).json({ message: 'Donor not found' });
    }
    res.status(200).json(donor);
};

// Update donor profile
exports.updateDonorProfile = async (req, res) => {
    const { name, mobile, rollNumber, batchNumber, notes } = req.body;
    const donor = await Donor.findByIdAndUpdate(req.admin.id, { name, mobile, rollNumber, batchNumber, notes }, { new: true });
    res.status(200).json({ message: 'Profile updated successfully', donor });
};

// Update availability status
exports.updateAvailability = async (req, res) => {
    const { availability } = req.body;
    const donor = await Donor.findByIdAndUpdate(req.admin.id, { availability }, { new: true });
    res.status(200).json({ message: 'Availability updated successfully', donor });
};

// Upload donor avatar
exports.uploadAvatar = async (req, res) => {
    const donor = await Donor.findById(req.admin.id);
    if (!donor) {
        return res.status(404).json({ message: 'Donor not found' });
    }

    donor.avatar = req.file.path;
    await donor.save();
    res.status(200).json({ message: 'Avatar updated successfully', avatarUrl: req.file.path });
};

// Get donor avatar
exports.getAvatar = async (req, res) => {
    const donor = await Donor.findById(req.admin.id);
    if (!donor || !donor.avatar) {
        return res.status(404).json({ message: 'Avatar not found' });
    }
    res.status(200).json({ avatarUrl: donor.avatar });
};
