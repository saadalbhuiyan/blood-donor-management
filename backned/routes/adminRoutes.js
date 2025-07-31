const express = require('express');
const multer = require('multer');
const {
    adminLogin,
    verifyOTP,
    logout,
    uploadAvatar,
    updateAdminName,
    getUniversities,
    createUniversity,
    updateUniversity,
    deleteUniversity,
    getDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
} = require('../controllers/adminController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Admin Authentication Routes
router.post('/login', adminLogin);
router.post('/verify-otp', verifyOTP);
router.post('/logout', authenticateJWT, logout);

// Admin Profile Management Routes
router.post('/avatar', authenticateJWT, upload.single('avatar'), uploadAvatar);
router.put('/name/:adminId', authenticateJWT, updateAdminName);

// Admin University Management Routes
router.get('/universities', authenticateJWT, getUniversities);
router.post('/universities', authenticateJWT, createUniversity);
router.put('/universities/:id', authenticateJWT, updateUniversity);
router.delete('/universities/:id', authenticateJWT, deleteUniversity);

// Admin Department Management Routes
router.get('/universities/:universityId/departments', authenticateJWT, getDepartments);
router.post('/universities/:universityId/departments', authenticateJWT, addDepartment);
router.put('/departments/:id', authenticateJWT, updateDepartment);
router.delete('/departments/:id', authenticateJWT, deleteDepartment);

module.exports = router;
