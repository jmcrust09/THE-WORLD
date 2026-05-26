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
    const tasks = await Task.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, category, priority, day, schedule, pointsEarned } = req.body;
    const task = await Task.create({
      userId: req.user.id,
      title,
      category,
      priority,
      day,
      schedule,
      pointsEarned: pointsEarned ?? getPointValue(category, priority)
    });
    res.json(task);
  } catch (err) {
    res.status(500).send('Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const [updatedCount, updatedRows] = await Task.update(
      { completed: req.body.completed },
      { where: { id: req.params.id, userId: req.user.id }, returning: true }
    );
    if (!updatedCount) return res.status(404).json({ msg: 'Tarea no encontrada' });
    res.json(updatedRows[0]);
  } catch (err) {
    res.status(500).send('Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedCount = await Task.destroy({ where: { id: req.params.id, userId: req.user.id } });
    if (!deletedCount) return res.status(404).json({ msg: 'Tarea no encontrada' });
    res.json({ msg: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).send('Error');
  }
});

module.exports = router;
