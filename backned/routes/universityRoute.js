const express = require('express');
const router = express.Router();
const {
    getAllUniversities,
    getDepartmentsByUniversity
} = require('../controllers/universityController');

// Route to get a list of all university names
router.get('/', getAllUniversities);

// Route to get departments of a selected university
router.get('/:university/departments', getDepartmentsByUniversity);

module.exports = router;
