const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'gaurav1' });
    if (!adminExists) {
      const admin = new User({
        name: 'Gaurav',
        email: 'gaurav@raifinancial.com',
        username: 'gaurav1',
        password: 'Grai0098',
        role: 'Admin',
        status: 'Active'
      });
      await admin.save();
      console.log('[Seed] Default Admin account created successfully: Username (gaurav1)');
    } else {
      console.log('[Seed] Default Admin account already exists (gaurav1)');
    }
  } catch (error) {
    console.error('[Seed Error] Failed to seed default admin:', error.message);
  }
};

module.exports = seedAdmin;
