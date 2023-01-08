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
      type: DataTypes.INT,
      allowNull: false
    },
    thc: {
      type: DataTypes.INT,
      allowNull: false
    },
    bl_price: {
      type: DataTypes.INT,
      allowNull: false
    },
    seal: {
      type: DataTypes.INT,
      allowNull: false
    },
    // environment fee
    lss: {
      type: DataTypes.INT,
    },
    telex_release: {
      type: DataTypes.INT,
    },
    payment_term: {
      type: DataTypes.STRING,
    },
    // table 2: customs fee
    phytosanitary: {
      type: DataTypes.INT,
      allowNull: false
    },
    phytosanitary_invoice: {
      type: DataTypes.STRING,
    },
    phytosanitary_reg: {
      type: DataTypes.INT,
      allowNull: false
    },
    preloading: {
      type: DataTypes.INT,
      allowNull: false
    },
    traffic_control: {
      type: DataTypes.INT,
      allowNull: false
    },
    handler: {
      type: DataTypes.INT,
      allowNull: false
    },
    handling_tip: {
      type: DataTypes.INT,
      allowNull: false
    },
    seal_tip: {
      type: DataTypes.INT,
      allowNull: false
    },
    infrastructure_fee: {
      type: DataTypes.INT,
      allowNull: false
    },
    customs_reg: {
      type: DataTypes.INT,
      allowNull: false
    },
    customs_reg_tip: {
      type: DataTypes.INT,
      allowNull: false
    },
    return_customs_dec: {
      type: DataTypes.INT,
      allowNull: false
    },
    co: {
      type: DataTypes.INT,
      allowNull: false
    },
    co_tip: {
      type: DataTypes.INT,
      allowNull: false
    },
    courier: {
      type: DataTypes.INT,
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
