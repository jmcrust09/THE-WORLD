const express = require('express');
const Egg = require('../models/Egg');
const router = express.Router();

// Obtener todos los huevos (admin)
router.get('/all', async (req, res) => {
  try {
    const eggs = await Egg.findAll({ order: [['cost', 'ASC']] });
    res.json(eggs);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching eggs', error: err.message });
  }
});

// Obtener huevos disponibles para usuarios
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const eggs = await Egg.findAll({
      where: {
        isActive: true,
        [require('sequelize').Op.or]: [
          { availableFrom: null },
          { availableFrom: { [require('sequelize').Op.lte]: now } }
        ],
        [require('sequelize').Op.or]: [
          { availableUntil: null },
          { availableUntil: { [require('sequelize').Op.gte]: now } }
        ]
      },
      order: [['cost', 'ASC']]
    });
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
