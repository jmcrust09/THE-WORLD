const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  day: { type: String, required: true },
  schedule: { type: String },
  title: { type: String, required: true },
  category: { type: String },
  priority: { type: String },
  completed: { type: Boolean, default: false },
  pointsEarned: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Task', TaskSchema);
