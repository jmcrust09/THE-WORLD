const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: true, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: true },
  isGuest: { type: DataTypes.BOOLEAN, defaultValue: false },
  totalPoints: { type: DataTypes.INTEGER, defaultValue: 0 },
  currentStreak: { type: DataTypes.INTEGER, defaultValue: 0 },
  bestStreak: { type: DataTypes.INTEGER, defaultValue: 0 },
  bonusMultiplier: { type: DataTypes.FLOAT, defaultValue: 1.0 },
  favoritePetId: { type: DataTypes.INTEGER }
}, { timestamps: true });

module.exports = User;
