const express = require('express');
const auth = require('../middleware/auth');
const Garden = require('../models/Garden');
const User = require('../models/User');
const router = express.Router();

const PLANT_TYPES = {
  wheat: { name: 'Trigo', growthTime: 3600000, yield: 10, icon: 'fa-wheat' },
  carrot: { name: 'Zanahoria', growthTime: 7200000, yield: 15, icon: 'fa-carrot' },
  tomato: { name: 'Tomate', growthTime: 10800000, yield: 20, icon: 'fa-apple-whole' },
  corn: { name: 'Maíz', growthTime: 14400000, yield: 25, icon: 'fa-seedling' },
  pumpkin: { name: 'Calabaza', growthTime: 21600000, yield: 35, icon: 'fa-leaf' },
  flower: { name: 'Flor Mágica', growthTime: 28800000, yield: 50, icon: 'fa-spa' }
};

// Obtener jardín del usuario
router.get('/', auth, async (req, res) => {
  try {
    const garden = await Garden.findAll({
      where: { userId: req.user.id },
      order: [['position', 'ASC']]
    });
    res.json(garden);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching garden', error: err.message });
  }
});

// Plantar semilla
router.post('/plant', auth, async (req, res) => {
  try {
    const { plantType, position } = req.body;
    
    // Verificar que la posición esté disponible
    const existing = await Garden.findOne({
      where: { userId: req.user.id, position }
    });
    if (existing) return res.status(400).json({ msg: 'Posición ocupada' });
    
    if (!PLANT_TYPES[plantType]) return res.status(400).json({ msg: 'Tipo de planta inválido' });
    
    const plant = await Garden.create({
      userId: req.user.id,
      plantType,
      stage: 'seed',
      plantedAt: new Date(),
      lastWateredAt: new Date(),
      growthProgress: 0,
      yield: 0,
      position
    });
    
    res.json(plant);
  } catch (err) {
    res.status(500).json({ msg: 'Error planting', error: err.message });
  }
});

// Regar planta
router.post('/:id/water', auth, async (req, res) => {
  try {
    const plant = await Garden.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    
    if (!plant) return res.status(404).json({ msg: 'Planta no encontrada' });
    if (plant.stage === 'harvested') return res.status(400).json({ msg: 'Planta ya cosechada' });
    
    plant.lastWateredAt = new Date();
    plant.growthProgress = Math.min(100, plant.growthProgress + 10);
    
    // Actualizar etapa según progreso
    if (plant.growthProgress >= 100) {
      plant.stage = 'mature';
      plant.harvestAt = new Date();
    } else if (plant.growthProgress >= 75) {
      plant.stage = 'growing';
    } else if (plant.growthProgress >= 25) {
      plant.stage = 'sprout';
    }
    
    await plant.save();
    res.json(plant);
  } catch (err) {
    res.status(500).json({ msg: 'Error watering', error: err.message });
  }
});

// Cosechar planta
router.post('/:id/harvest', auth, async (req, res) => {
  try {
    const plant = await Garden.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    
    if (!plant) return res.status(404).json({ msg: 'Planta no encontrada' });
    if (plant.stage !== 'mature') return res.status(400).json({ msg: 'Planta no está madura' });
    if (plant.stage === 'harvested') return res.status(400).json({ msg: 'Planta ya cosechada' });
    
    const plantInfo = PLANT_TYPES[plant.plantType];
    plant.yield = plantInfo.yield;
    plant.stage = 'harvested';
    await plant.save();
    
    // Dar puntos al usuario
    const user = await User.findByPk(req.user.id);
    user.totalPoints += plant.yield;
    await user.save();
    
    res.json({ plant, user: { totalPoints: user.totalPoints }, yield: plant.yield });
  } catch (err) {
    res.status(500).json({ msg: 'Error harvesting', error: err.message });
  }
});

// Eliminar planta (después de cosechar)
router.delete('/:id', auth, async (req, res) => {
  try {
    const plant = await Garden.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    
    if (!plant) return res.status(404).json({ msg: 'Planta no encontrada' });
    if (plant.stage !== 'harvested') return res.status(400).json({ msg: 'Solo puedes eliminar plantas cosechadas' });
    
    await plant.destroy();
    res.json({ msg: 'Planta eliminada' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting plant', error: err.message });
  }
});

// Obtener tipos de plantas disponibles
router.get('/types', auth, async (req, res) => {
  res.json(PLANT_TYPES);
});

module.exports = router;
