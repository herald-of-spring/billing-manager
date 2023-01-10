const router = require('express').Router();
const {
  createAdvance,
  getAdvance,
  updateAdvance,
  // deleteUser,
} = require('../../controllers/advanceController');

// import middleware
const { authMiddleware } = require('../../utils/auth');

router.route('/create').post(authMiddleware, createAdvance);

// key can be either user or shipment, which acts as filters
router.route('/:key/:value').get(authMiddleware, getAdvance);

router.route('/update/:id').put(authMiddleware, updateAdvance);

// router.route('/delete').delete(authMiddleware, deleteUser);

module.exports = router;
