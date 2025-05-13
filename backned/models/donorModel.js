const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    university: { type: String, required: true },
    department: { type: String, required: true },
    batch: { type: String, required: true },
    roll: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    notes: { type: String, maxlength: 300 },
    available: { type: Boolean, default: true }
});

module.exports = mongoose.model('donor', donorSchema);
