const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Inventory = sequelize.define('Inventory', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  shopItemId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  isEquipped: { type: DataTypes.BOOLEAN, defaultValue: false },
  obtainedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: true });

Inventory.associate = (models) => {
  Inventory.belongsTo(models.User, { foreignKey: 'userId' });
  Inventory.belongsTo(models.ShopItem, { foreignKey: 'shopItemId', as: 'item' });
};

module.exports = Inventory;
