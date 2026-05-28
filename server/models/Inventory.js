const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Inventory = sequelize.define('Inventory', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  shopItemId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  isEquipped: { type: DataTypes.BOOLEAN, defaultValue: false },
  obtainedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { 
  timestamps: true,
  tableName: 'Inventories'
});

module.exports = Inventory;
