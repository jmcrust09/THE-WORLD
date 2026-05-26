const mongoose = require('mongoose');

const shopItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // 'egg', 'event_egg', etc.
  cost: { type: Number, required: true },
  description: { type: String },
  icon: { type: String },
  cssClass: { type: String }, // For frontend styling
  probabilities: {
    comun: Number,
    poco_comun: Number,
    raro: Number,
    epico: Number,
    legendario: Number,
    mitico: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('ShopItem', shopItemSchema);
