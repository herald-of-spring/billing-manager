const router = require('express').Router();
const userRoutes = require('./userRoutes');
const shipmentRoutes = require('./shipmentRoutes');
const advanceRoutes = require('./advanceRoutes');

router.use('/users', userRoutes);
router.use('/shipments', shipmentRoutes);
router.use('/advances', advanceRoutes);

module.exports = router;
