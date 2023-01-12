// import shipment model
const { Shipment } = require('../models');

module.exports = {
  async getShipments({ user = null, params }, res) {
    if (!user) {
      return res.status(400).json({ message: 'User is not logged in.' });
    }

    let allShipments;
    if (params.key && params.value) {
      allShipments = await Shipment.findAll({ where: { [params.key] : params.value } })
    }
    else {
      allShipments = await Shipment.findAll();
    }

    if (!allShipments) {
      return res.status(400).json({ message: 'No shipments in the database.' });
    }
    res.json(allShipments);
  },
  async createShipment({ user = null, body }, res) {
    if (!user) {
      return res.status(400).json({ message: 'User is not logged in.' });
    }

    const shipment = await Shipment.create(body);
    if (!shipment) {
      return res.status(400).json({ message: 'Missing input parameters.' });
    }
    res.json(shipment);
  },
  async updateShipment({ user = null, body, params }, res) {
    if (!user) {
      return res.status(400).json({ message: 'User is not logged in.' });
    }
    if (!params.contract_num) {
      return res.status(400).json({ message: 'Missing parameter.' });
    }

    const shipment = await Shipment.findOne({ where: { contract_num: params.contract_num} });
    if (!shipment) {
      return res.status(400).json({ message: 'Shipment contract number does not exist.' });
    }

    await shipment.update(body);
    res.json(shipment);
  },
  // async deleteUser({ user = null, params }, res) {
  //   const foundUser = await User.findOne({
  //     email: user ? user.email : params.email
  //   });

  //   if (!foundUser) {
  //     return res.status(400).json({ message: 'Cannot find a user with this email!' });
  //   }

  //   res.json(foundUser);
  // },
};
