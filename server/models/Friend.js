const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Friend = sequelize.define('Friend', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  friendId: { type: DataTypes.INTEGER, allowNull: false },
  friendshipStreak: { type: DataTypes.INTEGER, defaultValue: 0 },
  lastInteractionDate: { type: DataTypes.DATE },
  streakStartDate: { type: DataTypes.DATE }
}, { timestamps: true });

const FriendRequest = sequelize.define('FriendRequest', {
  requesterId: { type: DataTypes.INTEGER, allowNull: false },
  recipientId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING(20), defaultValue: 'pending' }
}, { timestamps: true });

module.exports = { Friend, FriendRequest };
