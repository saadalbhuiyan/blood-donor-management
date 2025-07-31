const express = require('express');
const { donorLogin, donorLogout } = require('../controllers/donorAuthController');

const router = express.Router();

// Donor Authentication Routes
router.post('/donors/login', donorLogin);
router.post('/donors/logout', donorLogout);

module.exports = router;
