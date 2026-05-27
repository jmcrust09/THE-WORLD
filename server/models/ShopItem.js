const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const ShopItem = sequelize.define('ShopItem', {
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM('food', 'potion', 'theme'), allowNull: false },
  cost: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT },
  icon: { type: DataTypes.STRING },
  cssClass: { type: DataTypes.STRING },
  expValue: { type: DataTypes.INTEGER, defaultValue: 0 },
  effect: { type: DataTypes.STRING }
}, { timestamps: true });

module.exports = ShopItem;
