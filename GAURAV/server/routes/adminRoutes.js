const express = require('express');
const router = express.Router();
const { getDashboardStats, getActivityLogs } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.use(protect);
router.use(authorize('Admin'));

router.get('/dashboard', getDashboardStats);
router.get('/logs', getActivityLogs);

module.exports = router;
