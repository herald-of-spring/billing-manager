const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/shipments', shipmentRoutes);
router.use('/advances', advanceRoutes);

module.exports = router;
