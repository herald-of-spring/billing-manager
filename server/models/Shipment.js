const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Shipment extends Model {}

Shipment.init(
  {
    // table 1: shipment information
    // bill of lading
    bl_id: {
      type: DataTypes.STRING,
    },
    etd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    eta: {
      type: DataTypes.DATE,
      allowNull: false
    },
    contract_num: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dest_port: {
      type: DataTypes.STRING,
      allowNull: false
    },
    loading_loc: {
      type: DataTypes.STRING,
    },
    shipping_line: {
      type: DataTypes.STRING,
    },
    // instead of shipping_line
    forwarder: {
      type: DataTypes.STRING,
    },
    count: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ocean_freight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    thc: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bl_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // environment fee
    lss: {
      type: DataTypes.INTEGER,
    },
    telex_release: {
      type: DataTypes.INTEGER,
    },
    payment_term: {
      type: DataTypes.STRING,
    },
    // table 2: customs fee
    phytosanitary: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    phytosanitary_invoice: {
      type: DataTypes.STRING,
    },
    phytosanitary_reg: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preloading: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    traffic_control: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    handler: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    handling_tip: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seal_tip: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    infrastructure_fee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customs_reg: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customs_reg_tip: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    return_customs_dec: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    co: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    co_tip: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    courier: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'shipment',
  }
);

module.exports = Shipment;
