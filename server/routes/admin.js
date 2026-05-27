const express = require('express');
const adminAuth = require('../middleware/admin');
const ShopItem = require('../models/ShopItem');
const User = require('../models/User');
const router = express.Router();

// Crear nuevo item en la tienda
router.post('/shop-items', adminAuth, async (req, res) => {
  try {
    const { name, type, cost, description, icon, cssClass, probabilities } = req.body;
    
    const item = await ShopItem.create({
      name,
      type,
      cost,
      description,
      icon: icon || 'fa-box',
      cssClass: cssClass || 'bg-bg',
      probabilities: probabilities || {}
    });
    
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: 'Error creando item', error: err.message });
  }
});

// Actualizar item de la tienda
router.put('/shop-items/:id', adminAuth, async (req, res) => {
  try {
    const { name, type, cost, description, icon, cssClass, probabilities } = req.body;
    
    const item = await ShopItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item no encontrado' });
    
    await item.update({
      name: name || item.name,
      type: type || item.type,
      cost: cost || item.cost,
      description: description || item.description,
      icon: icon || item.icon,
      cssClass: cssClass || item.cssClass,
      probabilities: probabilities || item.probabilities
    });
    
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: 'Error actualizando item', error: err.message });
  }
});

// Eliminar item de la tienda
router.delete('/shop-items/:id', adminAuth, async (req, res) => {
  try {
    const item = await ShopItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item no encontrado' });
    
    await item.destroy();
    res.json({ msg: 'Item eliminado' });
  } catch (err) {
    res.status(500).json({ msg: 'Error eliminando item', error: err.message });
  }
});

// Obtener todos los usuarios
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'isAdmin', 'totalPoints', 'currentStreak', 'bestStreak', 'bonusMultiplier', 'createdAt']
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Error obteniendo usuarios', error: err.message });
  }
});

// Modificar puntos de usuario
router.put('/users/:id/points', adminAuth, async (req, res) => {
  try {
    const { points } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
    
    user.totalPoints = points;
    await user.save();
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Error modificando puntos', error: err.message });
  }
});

// Crear evento (guardado en ShopItem como tipo 'event')
router.post('/events', adminAuth, async (req, res) => {
  try {
    const { name, description, icon, startDate, endDate, reward, cssClass } = req.body;
    
    const event = await ShopItem.create({
      name,
      type: 'event',
      cost: 0,
      description,
      icon: icon || 'fa-calendar-star',
      cssClass: cssClass || 'bg-purple-100 border-purple-500',
      probabilities: {
        startDate,
        endDate,
        reward
      }
    });
    
    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: 'Error creando evento', error: err.message });
  }
});

// Obtener eventos activos
router.get('/events', adminAuth, async (req, res) => {
  try {
    const events = await ShopItem.findAll({
      where: { type: 'event' },
      order: [['createdAt', 'DESC']]
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: 'Error obteniendo eventos', error: err.message });
  }
});

module.exports = router;
