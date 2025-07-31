const express = require('express');
const { getBloodGroups, getUniversities, getDepartments, registerDonor } = require('../controllers/donorController');

const router = express.Router();

// Donor Registration Routes
router.get('/blood-groups', getBloodGroups);
router.get('/universities', getUniversities);
router.get('/universities/:universityId/departments', getDepartments);
router.post('/donors', registerDonor);

module.exports = router;
