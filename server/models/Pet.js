const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  species: { type: String, required: true },
  name: { type: String, default: 'Sin nombre' },
  rarity: { type: String, required: true },
  stage: { type: String, default: 'huevo' }, // huevo, bebe, joven, adulto, evolucionado, ascendido
  pointsAccumulated: { type: Number, default: 0 },
  eggOrigin: { type: String },
  isFavorite: { type: Boolean, default: false },
  hatchedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
