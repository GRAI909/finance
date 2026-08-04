const User = require('../models/User');
const logActivity = require('../utils/activityLogger');

// @desc    Get all users with search, filter & CSV export support
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const { search, role, status, exportCsv } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } }
      ];
    }

    if (role && role !== 'All') {
      query.role = role;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    if (exportCsv === 'true') {
      let csv = 'ID,Name,Username,Email,Role,Status,Created Date,Last Login\n';
      users.forEach(u => {
        csv += `"${u._id}","${u.name}","${u.username}","${u.email}","${u.role}","${u.status}","${u.createdAt.toISOString()}","${u.lastLogin ? u.lastLogin.toISOString() : 'Never'}"\n`;
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=users_export.csv');
      return res.status(200).send(csv);
    }

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new user
// @route   POST /api/users
// @access  Private/Admin
exports.createUser = async (req, res) => {
  try {
    const { name, email, username, password, role, status } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    const userExists = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
    });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'Username or Email already exists' });
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      role: role || 'User',
      status: status || 'Active'
    });

    await logActivity({
      userId: req.user._id,
      username: req.user.username,
      action: 'CREATE_USER',
      details: `Created user ${newUser.username} (${newUser.role})`,
      req
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
        status: newUser.status,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user details, role or status
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    if (role) user.role = role;
    if (status) user.status = status;

    await user.save();

    await logActivity({
      userId: req.user._id,
      username: req.user.username,
      action: 'UPDATE_USER',
      details: `Updated user ${user.username} (Role: ${user.role}, Status: ${user.status})`,
      req
    });

    res.json({
      success: true,
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own admin account' });
    }

    const usernameDeleted = user.username;
    await User.findByIdAndDelete(req.params.id);

    await logActivity({
      userId: req.user._id,
      username: req.user.username,
      action: 'DELETE_USER',
      details: `Deleted user ${usernameDeleted}`,
      req
    });

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reset user password
// @route   PUT /api/users/:id/reset-password
// @access  Private/Admin
exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    await logActivity({
      userId: req.user._id,
      username: req.user.username,
      action: 'RESET_USER_PASSWORD',
      details: `Reset password for user ${user.username}`,
      req
    });

    res.json({ success: true, message: `Password reset successfully for ${user.username}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
