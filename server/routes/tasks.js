const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const router = express.Router();

// Obtener todas las tareas del usuario autenticado
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Error');
  }
});

// Crear tarea
router.post('/', auth, async (req, res) => {
  try {
    const newTask = new Task({ user: req.user.id, title: req.body.title, description: req.body.description });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Error');
  }
});

// Actualizar tarea (para marcar completada)
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

// Eliminar tarea
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