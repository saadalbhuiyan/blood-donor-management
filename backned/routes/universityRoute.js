const express = require('express');
const router = express.Router();
const {
    getAllUniversities,
    getDepartmentsByUniversity
} = require('../controllers/universityController');

// Get list of all university names
router.get('/', getAllUniversities);

// Get departments of a selected university
router.get('/:university/departments', getDepartmentsByUniversity);

module.exports = router;
