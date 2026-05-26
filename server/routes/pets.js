const express = require('express');
const auth = require('../middleware/auth');
const Pet = require('../models/Pet');
const User = require('../models/User');
const router = express.Router();

const RARITY_MULTIPLIERS = {
  comun: 0.0,
  poco_comun: 0.1,
  raro: 0.3,
  epico: 0.5,
  legendario: 0.8,
  mitico: 1.5
};

const SPECIES_BY_RARITY = {
  comun: ['Gato Doméstico', 'Perro Labrador', 'Conejo', 'Hámster', 'Pez'],
  poco_comun: ['Zorro', 'Búho', 'Erizo', 'Pingüino', 'Ardilla'],
  raro: ['Lobo', 'Ciervo', 'Águila', 'Delfín', 'Pantera'],
  epico: ['Dragón de Agua', 'Grifo', 'Fénix Joven', 'Unicornio', 'Kitsune'],
  legendario: ['Dragón de Fuego', 'Pegaso', 'Quimera', 'Leviatán'],
  mitico: ['Dragón Celestial', 'Fénix Ancestral', 'Deidad Menor', 'Titán']
};

const rollRarity = (eggType) => {
  const tables = {
    basico: { comun: 55, poco_comun: 28, raro: 12, epico: 4, legendario: 1, mitico: 0 },
    premium: { comun: 35, poco_comun: 30, raro: 22, epico: 10, legendario: 2.5, mitico: 0.5 },
    epico: { comun: 0, poco_comun: 40, raro: 35, epico: 20, legendario: 4, mitico: 1 },
    legendario: { comun: 0, poco_comun: 10, raro: 50, epico: 30, legendario: 8, mitico: 2 },
    mitico: { comun: 0, poco_comun: 0, raro: 15, epico: 45, legendario: 30, mitico: 10 }
  };
  
  const table = tables[eggType] || tables.basico;
  const roll = Math.random() * 100;
  let cumulative = 0;
  
  for (const [rarity, chance] of Object.entries(table)) {
    cumulative += chance;
    if (roll <= cumulative) return rarity;
  }
  return 'comun';
};

const selectSpecies = (rarity) => {
  const pool = SPECIES_BY_RARITY[rarity] || SPECIES_BY_RARITY.comun;
  return pool[Math.floor(Math.random() * pool.length)];
};

// Obtener todas las mascotas del usuario
router.get('/', auth, async (req, res) => {
  try {
    const pets = await Pet.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching pets', error: err.message });
  }
});

// Comprar huevo y eclosionar mascota
router.post('/hatch', auth, async (req, res) => {
  try {
    const { eggType } = req.body;
    
    // Verificar que el usuario tenga suficientes puntos
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
    
    const costs = { basico: 500, premium: 1500, epico: 5000, legendario: 15000, mitico: 50000 };
    const cost = costs[eggType] || 500;
    
    if (user.totalPoints < cost) {
      return res.status(400).json({ msg: `Necesitas ${cost} puntos para comprar este huevo` });
    }
    
    // Restar puntos
    user.totalPoints -= cost;
    await user.save();
    
    // Determinar rareza y especie
    const rarity = rollRarity(eggType);
    const species = selectSpecies(rarity);
    
    // Crear mascota
    const pet = await Pet.create({
      userId: req.user.id,
      species,
      name: species,
      rarity,
      stage: 'huevo',
      pointsAccumulated: 0,
      eggOrigin: eggType,
      isFavorite: false,
      hatchedAt: new Date()
    });
    
    // Calcular nuevo bonus multiplier
    const allPets = await Pet.findAll({ where: { userId: req.user.id } });
    const totalBonus = allPets.reduce((sum, p) => sum + (RARITY_MULTIPLIERS[p.rarity] || 0), 0);
    user.bonusMultiplier = 1 + totalBonus;
    await user.save();
    
    res.json({ pet, user: { totalPoints: user.totalPoints, bonusMultiplier: user.bonusMultiplier } });
  } catch (err) {
    res.status(500).json({ msg: 'Error hatching egg', error: err.message });
  }
});

// Actualizar mascota favorita
router.put('/:id/favorite', auth, async (req, res) => {
  try {
    const pet = await Pet.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!pet) return res.status(404).json({ msg: 'Mascota no encontrada' });
    
    // Quitar favorito de todas las otras mascotas
    await Pet.update({ isFavorite: false }, { where: { userId: req.user.id } });
    
    // Marcar como favorita
    pet.isFavorite = true;
    await pet.save();
    
    // Actualizar usuario
    const user = await User.findByPk(req.user.id);
    user.favoritePetId = pet.id;
    await user.save();
    
    res.json(pet);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating favorite', error: err.message });
  }
});

// Interactuar con mascota (aumenta puntos acumulados)
router.post('/:id/interact', auth, async (req, res) => {
  try {
    const pet = await Pet.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!pet) return res.status(404).json({ msg: 'Mascota no encontrada' });
    
    pet.pointsAccumulated += 10;
    pet.lastInteraction = new Date();
    await pet.save();
    
    // Determinar etapa de crecimiento
    let stage = 'huevo';
    if (pet.pointsAccumulated >= 200) stage = 'bebe';
    if (pet.pointsAccumulated >= 800) stage = 'joven';
    if (pet.pointsAccumulated >= 2500) stage = 'adulto';
    if (pet.pointsAccumulated >= 8000) stage = 'evolucionado';
    if (pet.pointsAccumulated >= 25000) stage = 'ascendido';
    
    pet.stage = stage;
    await pet.save();
    
    res.json(pet);
  } catch (err) {
    res.status(500).json({ msg: 'Error interacting with pet', error: err.message });
  }
});

module.exports = router;
