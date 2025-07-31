const express = require('express');
const { getDonorProfile, updateDonorProfile, updateAvailability, uploadAvatar, getAvatar } = require('../controllers/donorDashboardController');
const authenticateJWT = require('../middleware/authMiddleware');
const multer = require('multer');

// Setup file storage for multer (profile picture upload)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('avatar');

const router = express.Router();

// Donor Dashboard Routes
router.get('/donors/me', authenticateJWT, getDonorProfile);
router.put('/donors/me', authenticateJWT, updateDonorProfile);
router.put('/donors/me/availability', authenticateJWT, updateAvailability);
router.post('/donors/avatar', authenticateJWT, upload, uploadAvatar);
router.get('/donors/avatar', authenticateJWT, getAvatar);

module.exports = router;
