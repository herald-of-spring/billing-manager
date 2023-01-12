const router = require('express').Router();
const {
  createUser,
  getUsers,
  getOneUser,
  updateUser,
  // deleteUser,
  promoteUser,
  login,
} = require('../../controllers/userController');

// import middleware
const { authMiddleware } = require('../../utils/auth');

router.route('/create').post(createUser);

router.route('/login').post(login);

router.route('/all').get(getUsers);

router.route('/me').get(authMiddleware, getOneUser);

router.route('/update/:code').put(updateUser);

router.route('/promote').put(promoteUser);

// router.route('/delete').delete(authMiddleware, deleteUser);

module.exports = router;
