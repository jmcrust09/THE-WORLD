const express = require('express');
const auth = require('../middleware/auth');
const Inventory = require('../models/Inventory');
const ShopItem = require('../models/ShopItem');
const User = require('../models/User');
const router = express.Router();

// Obtener inventario del usuario
router.get('/', auth, async (req, res) => {
  try {
    const inventory = await Inventory.findAll({
      where: { userId: req.user.id },
      include: [{ model: ShopItem, as: 'item' }],
      order: [['obtainedAt', 'DESC']]
    });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching inventory', error: err.message });
  }
});

// Añadir item al inventario (compra)
router.post('/', auth, async (req, res) => {
  try {
    const { shopItemId, quantity = 1 } = req.body;
    
    // Verificar que el item existe
    const shopItem = await ShopItem.findByPk(shopItemId);
    if (!shopItem) return res.status(404).json({ msg: 'Item no encontrado' });
    
    // Verificar que el usuario tiene suficientes puntos
    const user = await User.findByPk(req.user.id);
    if (user.totalPoints < shopItem.cost * quantity) {
      return res.status(400).json({ msg: 'Puntos insuficientes' });
    }
    
    // Restar puntos
    user.totalPoints -= shopItem.cost * quantity;
    await user.save();
    
    // Verificar si ya tiene el item en inventario
    const existing = await Inventory.findOne({
      where: { userId: req.user.id, shopItemId }
    });
    
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      res.json({ inventory: existing, user: { totalPoints: user.totalPoints } });
    } else {
      const inventory = await Inventory.create({
        userId: req.user.id,
        shopItemId,
        quantity
      });
      res.json({ inventory, user: { totalPoints: user.totalPoints } });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Error adding to inventory', error: err.message });
  }
});

// Usar item del inventario
router.post('/:id/use', auth, async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [{ model: ShopItem, as: 'item' }]
    });
    
    if (!inventory) return res.status(404).json({ msg: 'Item no encontrado en inventario' });
    if (inventory.quantity <= 0) return res.status(400).json({ msg: 'No hay cantidad disponible' });
    
    // Reducir cantidad
    inventory.quantity -= 1;
    await inventory.save();
    
    // Aplicar efecto según el tipo de item
    const effect = applyItemEffect(inventory.item, req.user);
    
    res.json({ inventory, effect });
  } catch (err) {
    res.status(500).json({ msg: 'Error using item', error: err.message });
  }
});

// Equipar/desequipar item
router.put('/:id/equip', auth, async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    
    if (!inventory) return res.status(404).json({ msg: 'Item no encontrado' });
    
    // Desequipar todos los items del mismo tipo
    await Inventory.update(
      { isEquipped: false },
      { where: { userId: req.user.id } }
    );
    
    // Equipar este item
    inventory.isEquipped = true;
    await inventory.save();
    
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ msg: 'Error equipping item', error: err.message });
  }
});

// Eliminar item del inventario
router.delete('/:id', auth, async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    
    if (!inventory) return res.status(404).json({ msg: 'Item no encontrado' });
    
    await inventory.destroy();
    res.json({ msg: 'Item eliminado del inventario' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting item', error: err.message });
  }
});

// Función para aplicar efectos de items
function applyItemEffect(item, user) {
  const effects = {
    food: { type: 'exp', value: item.cost / 10 },
    potion: { type: 'buff', value: item.cost / 100 },
    seed: { type: 'seed', value: 1 }
  };
  
  return effects[item.type] || { type: 'none', value: 0 };
}

module.exports = router;
