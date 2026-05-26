const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Pet = sequelize.define('Pet', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  species: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, defaultValue: 'Sin nombre' },
  rarity: { type: DataTypes.STRING, allowNull: false },
  stage: { type: DataTypes.STRING, defaultValue: 'huevo' },
  pointsAccumulated: { type: DataTypes.INTEGER, defaultValue: 0 },
  eggOrigin: { type: DataTypes.STRING },
  isFavorite: { type: DataTypes.BOOLEAN, defaultValue: false },
  hatchedAt: { type: DataTypes.DATE }
}, { timestamps: true });

module.exports = Pet;
