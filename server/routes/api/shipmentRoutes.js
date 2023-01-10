const router = require('express').Router();
const {
  createShipment,
  getShipments,
  updateShipment,
  // deleteShipment
} = require('../../controllers/shipmentController');

// import middleware
const { authMiddleware } = require('../../utils/auth');

router.route('/create').post(authMiddleware, createShipment);

// can optionally filter shipments by key
router.route('/:key/:value').get(authMiddleware, getShipments);

router.route('/update/:contract_num').put(authMiddleware, updateShipment);

// router.route('/delete/:contract_num').put(authMiddleware, deleteShipment);

module.exports = router;
