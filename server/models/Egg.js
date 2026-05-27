const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Egg = sequelize.define('Egg', {
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM('egg'), allowNull: false, defaultValue: 'egg' },
  cost: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT },
  icon: { type: DataTypes.STRING, defaultValue: 'fa-egg' },
  cssClass: { type: DataTypes.STRING },
  probabilities: { type: DataTypes.JSON },
  isEvent: { type: DataTypes.BOOLEAN, defaultValue: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  availableFrom: { type: DataTypes.DATE, allowNull: true },
  availableUntil: { type: DataTypes.DATE, allowNull: true }
}, { timestamps: true });

module.exports = Egg;
