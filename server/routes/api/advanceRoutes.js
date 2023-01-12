const router = require('express').Router();
const {
  createAdvance,
  getAdvance,
  updateAdvance,
  completeAdvance,
  // deleteUser,
} = require('../../controllers/advanceController');

// import middleware
const { authMiddleware } = require('../../utils/auth');

router.route('/create').post(authMiddleware, createAdvance);

// key can be either user or shipment, which acts as filters
router.route('/:key/:value').get(authMiddleware, getAdvance);

// completed (paid) advances cannot be further edited
router.route('/complete/:id').put(authMiddleware, completeAdvance);

router.route('/update/:id').put(authMiddleware, updateAdvance);

// router.route('/delete').delete(authMiddleware, deleteUser);

module.exports = router;
