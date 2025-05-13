// bloodSearchRoute.js
const express = require('express');
const router = express.Router();
const bloodSearchController = require('../controllers/bloodSearchController');

// GET /api/donors/search?bloodGroup=A+&university=DU&department=CSE
router.get('/search', bloodSearchController.searchDonors);

module.exports = router;