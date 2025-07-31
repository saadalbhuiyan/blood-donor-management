// Required Modules
const Admin = require('../models/Admin');
const University = require('../models/University');
const Department = require('../models/Department');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Currently unused
const crypto = require('crypto');   // Currently unused

// =========================
// Email Configuration (OTP)
// =========================
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saadalbhuiyan@gmail.com',
        pass: 'ffyu ksss mlor dffv',
    },
});

const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Your OTP for Admin Login',
        text: `Your OTP for login is ${otp}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (err) {
        console.error('Error sending email:', err);
        throw err;
    }
};

// ====================
// Admin Authentication
// ====================

// Send OTP for Login
exports.adminLogin = async (req, res) => {
    try {
        const { email } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        admin.otp = otp;
        admin.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
        await admin.save();

        await sendOTP(email, otp);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// Verify OTP & Generate Token
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin || admin.otp !== otp || admin.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        admin.otp = undefined;
        admin.otpExpiry = undefined;
        await admin.save();

        res.status(200).json({ message: 'OTP verified successfully', token });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'Server error during OTP verification' });
    }
};

// Admin Logout
exports.logout = (req, res) => {
    try {
        res.status(200).json({ message: 'Admin logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Server error during logout' });
    }
};

// ================
// Admin Management
// ================

// Upload Admin Avatar
exports.uploadAvatar = async (req, res) => {
    try {
        const { adminId } = req.params;
        const avatarUrl = req.file.path;

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        admin.avatar = avatarUrl;
        await admin.save();

        res.status(200).json({ message: 'Avatar uploaded successfully', avatarUrl });
    } catch (error) {
        console.error('Upload avatar error:', error);
        res.status(500).json({ message: 'Server error during avatar upload' });
    }
};

// Update Admin Name
exports.updateAdminName = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { name } = req.body;

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        admin.name = name;
        await admin.save();

        res.status(200).json({ message: 'Admin name updated successfully' });
    } catch (error) {
        console.error('Update name error:', error);
        res.status(500).json({ message: 'Server error during admin name update' });
    }
};

// ==========================
// University CRUD Operations
// ==========================

exports.getUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        res.status(200).json(universities);
    } catch (error) {
        console.error('Get universities error:', error);
        res.status(500).json({ message: 'Server error fetching universities' });
    }
};

exports.createUniversity = async (req, res) => {
    try {
        const { name } = req.body;

        const existing = await University.findOne({ name });
        if (existing) {
            return res.status(409).json({ message: 'University already exists' });
        }

        const university = new University({ name });
        await university.save();

        res.status(201).json({ message: 'University created successfully', university });
    } catch (error) {
        console.error('Create university error:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Duplicate university name' });
        }
        res.status(500).json({ message: 'Server error creating university' });
    }
};

exports.updateUniversity = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const university = await University.findByIdAndUpdate(id, { name }, { new: true });

        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }

        res.status(200).json({ message: 'University updated successfully', university });
    } catch (error) {
        console.error('Update university error:', error);
        res.status(500).json({ message: 'Server error updating university' });
    }
};

exports.deleteUniversity = async (req, res) => {
    try {
        const { id } = req.params;

        const university = await University.findByIdAndDelete(id);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }

        res.status(200).json({ message: 'University deleted successfully' });
    } catch (error) {
        console.error('Delete university error:', error);
        res.status(500).json({ message: 'Server error deleting university' });
    }
};

// ==========================
// Department CRUD Operations
// ==========================

exports.getDepartments = async (req, res) => {
    try {
        const { universityId } = req.params;
        const departments = await Department.find({ university: universityId });

        res.status(200).json(departments);
    } catch (error) {
        console.error('Get departments error:', error);
        res.status(500).json({ message: 'Server error fetching departments' });
    }
};

exports.addDepartment = async (req, res) => {
    try {
        const { universityId } = req.params;
        const { name } = req.body;

        const existing = await Department.findOne({ name, university: universityId });
        if (existing) {
            return res.status(409).json({ message: 'Department already exists in this university' });
        }

        const department = new Department({ name, university: universityId });
        await department.save();

        res.status(201).json({ message: 'Department added successfully', department });
    } catch (error) {
        console.error('Add department error:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Duplicate department name' });
        }
        res.status(500).json({ message: 'Server error adding department' });
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const department = await Department.findByIdAndUpdate(id, { name }, { new: true });

        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json({ message: 'Department updated successfully', department });
    } catch (error) {
        console.error('Update department error:', error);
        res.status(500).json({ message: 'Server error updating department' });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findByIdAndDelete(id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        console.error('Delete department error:', error);
        res.status(500).json({ message: 'Server error deleting department' });
    }
};
