const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Garden = sequelize.define('Garden', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  plantType: { type: DataTypes.STRING, allowNull: false },
  stage: { type: DataTypes.STRING, defaultValue: 'seed' }, // seed, sprout, growing, mature, harvested
  plantedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  lastWateredAt: { type: DataTypes.DATE },
  harvestAt: { type: DataTypes.DATE },
  growthProgress: { type: DataTypes.INTEGER, defaultValue: 0 }, // 0-100
  yield: { type: DataTypes.INTEGER, defaultValue: 0 },
  position: { type: DataTypes.INTEGER, allowNull: false } // Slot position in garden (1-9)
}, { timestamps: true });

module.exports = Garden;
