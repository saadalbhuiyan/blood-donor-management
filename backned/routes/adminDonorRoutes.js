const express = require('express');
const { getAllDonors, getDonorById, deleteDonor } = require('../controllers/adminDonorController');
const authenticateJWT = require('../middleware/authMiddleware'); // Protect routes with JWT

const router = express.Router();

// Admin Donor Management Routes
router.get('/donors', authenticateJWT, getAllDonors);
router.get('/donors/:id', authenticateJWT, getDonorById);
router.delete('/donors/:id', authenticateJWT, deleteDonor);

module.exports = router;
