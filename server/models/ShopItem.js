const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const ShopItem = sequelize.define('ShopItem', {
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  cost: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT },
  icon: { type: DataTypes.STRING },
  cssClass: { type: DataTypes.STRING },
  probabilities: { type: DataTypes.JSON }
}, { timestamps: true });

module.exports = ShopItem;
