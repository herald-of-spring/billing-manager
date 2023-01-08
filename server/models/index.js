const User = require('./User');
const Shipment = require('./Shipment');
const Advance = require('./Advance');

Shipment.belongsToMany(User, {
  through: Advance,
  foreignKey: "shipment_contract_num"
});

User.belongsToMany(Shipment, {
  through: Advance,
  foreignKey: "created_by"
});

module.exports = { User, Shipment, Advance };
