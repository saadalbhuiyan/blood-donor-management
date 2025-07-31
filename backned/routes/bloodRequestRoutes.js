const express = require('express');
const { searchDonors } = require('../controllers/bloodRequestController');

const router = express.Router();

// Blood Request Routes
router.get('/donors/search', searchDonors);

module.exports = router;
