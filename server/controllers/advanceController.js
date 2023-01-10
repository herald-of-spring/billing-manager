// import advance model
const { User, Advance } = require('../models');

module.exports = {
  async getAdvance({ user = null, body, params }, res) {
    if (!user) {
      return res.status(400).json({ message: 'User is not logged in.' });
    }
    if (!params.key || (params.key == "shipment" && !params.value)) {
      return res.status(400).json({ message: 'Missing parameters.' });
    }

    const curUser = await User.findOne({ where: { email: user.email } });
    if (params.key == "user") {
      if (curUser.isSuper && params.value) {
        const userAdvances = await Advance.findAll({ where: { created_by: params.value } });
        return res.json(userAdvances);
      }
      const myAdvances = await Advance.findAll({ where: { created_by: user.email } });
      return res.json(myAdvances);
    }
    if (params.key == "shipment") {
      if (curUser.isSuper) {
        const shipmentAdvances = await Advance.findAll({ where: { shipment_contract_num: params.value } });
        return res.json(shipmentAdvances);
      }
      const myShipmentAdvances = await Advance.findAll({ where: { created_by: user.email, shipment_contract_num: params.value } });
      return res.json(myShipmentAdvances);
    }

    return res.status(400).json({ message: 'Invalid filter condition.' });
  },
  async createAdvance({ user = null, body }, res) {
    if (!user) {
      return res.status(400).json({ message: 'User is not logged in.' });
    }

    const advance = await Advance.create({...body, created_by: user.email});
    if (!advance) {
      return res.status(400).json({ message: 'Missing input parameters.' });
    }
    res.json(advance);
  },
  async updateAdvance({ user = null, body, params }, res) {
    if (!user) {
      return res.status(400).json({ message: 'User is not logged in.' });
    }
    if (!params.id) {
      return res.status(400).json({ message: 'Missing parameter.' });
    }

    const advance = await Advance.findOne({ where: { id: params.id} });
    if (!advance) {
      return res.status(400).json({ message: 'Invalid advance id.' });
    }
    if (advance.created_by != user.email) {
      return res.status(400).json({ message: 'Insufficient privileges.' });
    }
    
    await advance.update(body);
    res.json(advance);
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
