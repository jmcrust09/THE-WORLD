const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
  bestStreak: { type: Number, default: 0 },
  bonusMultiplier: { type: Number, default: 1.0 },
  favoritePetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
