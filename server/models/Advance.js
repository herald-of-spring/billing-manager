const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Advance extends Model {}

Advance.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    created_by: {
      type: DataTypes.STRING,
      references: {
        model: "user",
        key: "email"
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING
    },
    isFulfilled: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    shipment_contract_num: {
      type: DataTypes.STRING,
      references: {
        model: "shipment",
        key: "contract_num"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = Advance;
