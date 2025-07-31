const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
    },
    mobile: {
        type: String,
        required: [true, 'Please provide your mobile number'],
        unique: true,
    },
    rollNumber: {
        type: String,
        required: [true, 'Please provide your roll number']
        
    },
    batchNumber: {
        type: String,
        required: [true, 'Please provide your batch number'],
    },
    bloodGroup: {
        type: String,
        required: [true, 'Please select your blood group'],
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    university: {
        type: mongoose.Schema.ObjectId,
        ref: 'University',
        required: [true, 'Please select your university'],
    },
    department: {
        type: mongoose.Schema.ObjectId,
        ref: 'Department',
        required: [true, 'Please select your department'],
    },
    availability: {
        type: Boolean,
        default: true,
    },
    // avatar: {
    //     type: String,
    //     default: 'default.jpg',
    // },
    notes: String,
}, { timestamps: true });

const Donor = mongoose.model('Donor', donorSchema);
module.exports = Donor;