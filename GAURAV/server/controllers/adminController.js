const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const Session = require('../models/Session');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'Active' });
    const disabledUsers = await User.countDocuments({ status: 'Disabled' });
    const adminCount = await User.countDocuments({ role: 'Admin' });

    // Recently logged in users (within last 7 days or sorted by lastLogin)
    const recentlyLoggedIn = await User.find({ lastLogin: { $ne: null } })
      .sort({ lastLogin: -1 })
      .limit(10)
      .select('name username email role status lastLogin');

    // Total activity logs count
    const totalActivities = await ActivityLog.countDocuments();

    // Active Sessions
    const activeSessionsCount = await Session.countDocuments({ expiresAt: { $gt: new Date() } });

    res.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        disabledUsers,
        adminCount,
        totalActivities,
        activeSessionsCount
      },
      recentlyLoggedIn
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get activity logs
// @route   GET /api/admin/logs
// @access  Private/Admin
exports.getActivityLogs = async (req, res) => {
  try {
    const { search, limit = 50, page = 1 } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { action: { $regex: search, $options: 'i' } },
        { details: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const logs = await ActivityLog.find(query)
      .populate('user', 'name username role')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await ActivityLog.countDocuments(query);

    res.json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      logs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
