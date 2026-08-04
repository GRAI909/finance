const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, resetPassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

// All routes are protected and restricted to Admin
router.use(protect);
router.use(authorize('Admin'));

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .put(updateUser)
  .delete(deleteUser);

router.put('/:id/reset-password', resetPassword);

module.exports = router;
