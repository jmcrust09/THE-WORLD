const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const router = express.Router();

const getPointValue = (category, priority) => {
  const categoryBase = {
    Deporte: 220,
    Aprendizaje: 180,
    Trabajo: 240,
    Bienestar: 130,
    Creatividad: 170,
    Hogar: 140
  };
  const priorityFactor = {
    Indispensable: 1.4,
    Necesaria: 1.1,
    Deseable: 0.85
  };
  return Math.round((categoryBase[category] || 130) * (priorityFactor[priority] || 1));
};

router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, category, priority, day, schedule, pointsEarned } = req.body;
    const task = new Task({
      user: req.user.id,
      title,
      category,
      priority,
      day,
      schedule,
      pointsEarned: pointsEarned ?? getPointValue(category, priority)
    });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { completed: req.body.completed },
      { new: true }
    );
    if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' });
    res.json(task);
  } catch (err) {
    res.status(500).send('Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' });
    res.json({ msg: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).send('Error');
  }
});

module.exports = router;
