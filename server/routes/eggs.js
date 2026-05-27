const express = require('express');
const Egg = require('../models/Egg');
const router = express.Router();

// Obtener todos los huevos
router.get('/', async (req, res) => {
  try {
    const eggs = await Egg.findAll({ order: [['cost', 'ASC']] });
    res.json(eggs);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching eggs', error: err.message });
  }
});

// Obtener un huevo por ID
router.get('/:id', async (req, res) => {
  try {
    const egg = await Egg.findByPk(req.params.id);
    if (!egg) return res.status(404).json({ msg: 'Huevo no encontrado' });
    res.json(egg);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching egg', error: err.message });
  }
});

module.exports = router;
