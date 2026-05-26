const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Task = sequelize.define('Task', {
  day: { type: DataTypes.STRING, allowNull: false },
  schedule: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING },
  priority: { type: DataTypes.STRING },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  pointsEarned: { type: DataTypes.INTEGER, defaultValue: 0 },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  userId: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

module.exports = Task;
