const mongoose = require('mongoose');

const WeeklyTaskSchema = new mongoose.Schema({
  day: { type: String, required: true },        // lunes, martes, etc.
  schedule: { type: String },                   // mañana, tarde, noche
  task: { type: String, required: true },
  category: { type: String },
  priority: { type: String },
  completed: { type: Boolean, default: false },
  pointsEarned: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // para asociar a cada usuario
});

module.exports = mongoose.model('Task', TaskSchema);