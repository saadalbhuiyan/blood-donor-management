const Donor = require('../models/Donor');
const University = require('../models/University');
const Department = require('../models/Department');

// Get all blood groups (you can customize this if needed)
exports.getBloodGroups = (req, res) => {
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    res.status(200).json(bloodGroups);
};

// Get all universities
exports.getUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        res.status(200).json(universities);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving universities', error });
    }
};

// Get departments under a specific university
exports.getDepartments = async (req, res) => {
    const { universityId } = req.params;
    try {
        const departments = await Department.find({ university: universityId });
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving departments', error });
    }
};

// Register new donor
exports.registerDonor = async (req, res) => {
    const { bloodGroup, university, department, mobile, name, rollNumber, batchNumber } = req.body;
    try {
        const donor = new Donor({ bloodGroup, university, department, mobile, name, rollNumber, batchNumber });
        await donor.save();
        res.status(201).json({ message: 'Donor registered successfully', donor });
    } catch (error) {
        res.status(500).json({ message: 'Error registering donor', error });
    }
};
