const express = require('express');
const auth = require('../middleware/auth');
const Egg = require('../models/Egg');
const router = express.Router();

// Obtener todos los huevos (admin - protegido)
router.get('/all', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'No autorizado' });
    }
    const eggs = await Egg.findAll({ order: [['cost', 'ASC']] });
    res.json(eggs);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching eggs', error: err.message });
  }
});

// Obtener huevos disponibles para usuarios (protegido)
router.get('/', auth, async (req, res) => {
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

// Obtener un huevo por ID (protegido)
router.get('/:id', auth, async (req, res) => {
  try {
    const egg = await Egg.findByPk(req.params.id);
    if (!egg) return res.status(404).json({ msg: 'Huevo no encontrado' });
    res.json(egg);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching egg', error: err.message });
  }
});

module.exports = router;
