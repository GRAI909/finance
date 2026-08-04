const ActivityLog = require('../models/ActivityLog');

const logActivity = async ({ userId, username, action, details = '', req }) => {
  try {
    const ipAddress = req ? (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '') : '';
    const userAgent = req ? req.headers['user-agent'] || '' : '';

    await ActivityLog.create({
      user: userId,
      username: username || 'System',
      action,
      details,
      ipAddress,
      userAgent
    });
  } catch (error) {
    console.error('Failed to log activity:', error.message);
  }
};

module.exports = logActivity;
