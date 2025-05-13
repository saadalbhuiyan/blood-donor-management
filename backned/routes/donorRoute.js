const express = require('express');
const router = express.Router();

const {
    registerDonor,
    loginDonor,
    getDonorProfile,
    updateDonorProfile,
    toggleAvailability
} = require('../controllers/donorController');

// Phase 3
router.post('/register', registerDonor);

// Phase 4
router.post('/login', loginDonor);

// Phase 5
router.get('/:id', getDonorProfile);
router.put('/:id', updateDonorProfile);
router.patch('/:id/availability', toggleAvailability);

module.exports = router;
