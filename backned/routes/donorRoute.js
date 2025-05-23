const express = require('express');
const router = express.Router();

const {
    registerDonor,
    loginDonor,
    getDonorProfile,
    updateDonorProfile,
    toggleAvailability
} = require('../controllers/donorController');

// Register a new donor (Phase 3)
router.post('/register', registerDonor);

// Login a donor (Phase 4)
router.post('/login', loginDonor);

// Get donor profile (Phase 5)
router.get('/:id', getDonorProfile);

// Update donor profile (Phase 5)
router.put('/:id', updateDonorProfile);

// Toggle donor availability (Phase 5)
router.patch('/:id/availability', toggleAvailability);

module.exports = router;
