const express = require('express');
const auth = require('../middleware/auth');
const { Friend, FriendRequest } = require('../models/Friend');
const User = require('../models/User');
const router = express.Router();

// Obtener lista de amigos
router.get('/', auth, async (req, res) => {
  try {
    const friends = await Friend.findAll({
      where: { userId: req.user.id },
      include: [{
        model: User,
        as: 'friend',
        attributes: ['id', 'username', 'totalPoints', 'profilePictureUrl']
      }]
    });
    res.json(friends);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching friends', error: error.message });
  }
});

// Buscar usuarios para añadir como amigos
router.get('/search', auth, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);
    
    const users = await User.findAll({
      where: {
        username: { [require('sequelize').Op.iLike]: `%${q}%` },
        id: { [require('sequelize').Op.ne]: req.user.id }
      },
      attributes: ['id', 'username', 'totalPoints']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error searching users', error: error.message });
  }
});

// Enviar solicitud de amistad
router.post('/request', auth, async (req, res) => {
  try {
    const { friendId } = req.body;
    
    // Verificar que no sea uno mismo
    if (friendId === req.user.id) {
      return res.status(400).json({ msg: 'No puedes enviarte solicitud a ti mismo' });
    }
    
    // Verificar que ya no sean amigos
    const existingFriend = await Friend.findOne({
      where: { userId: req.user.id, friendId }
    });
    if (existingFriend) {
      return res.status(400).json({ msg: 'Ya son amigos' });
    }
    
    // Verificar que no haya solicitud pendiente
    const existingRequest = await FriendRequest.findOne({
      where: {
        [require('sequelize').Op.or]: [
          { requesterId: req.user.id, recipientId: friendId },
          { requesterId: friendId, recipientId: req.user.id }
        ]
      }
    });
    if (existingRequest) {
      return res.status(400).json({ msg: 'Ya hay una solicitud pendiente' });
    }
    
    await FriendRequest.create({
      requesterId: req.user.id,
      recipientId: friendId,
      status: 'pending'
    });
    
    res.json({ msg: 'Solicitud enviada' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending friend request', error: error.message });
  }
});

// Obtener solicitudes de amistad pendientes
router.get('/requests', auth, async (req, res) => {
  try {
    const requests = await FriendRequest.findAll({
      where: { recipientId: req.user.id, status: 'pending' },
      include: [{
        model: User,
        as: 'requester',
        attributes: ['id', 'username', 'totalPoints']
      }]
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching friend requests', error: error.message });
  }
});

// Aceptar solicitud de amistad
router.put('/request/:id/accept', auth, async (req, res) => {
  try {
    const request = await FriendRequest.findByPk(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Solicitud no encontrada' });
    if (request.recipientId !== req.user.id) {
      return res.status(403).json({ msg: 'No autorizado' });
    }
    
    // Crear amistad bidireccional
    await Friend.create({
      userId: request.requesterId,
      friendId: request.recipientId,
      friendshipStreak: 0,
      streakStartDate: new Date()
    });
    
    await Friend.create({
      userId: request.recipientId,
      friendId: request.requesterId,
      friendshipStreak: 0,
      streakStartDate: new Date()
    });
    
    // Eliminar solicitud
    await request.destroy();
    
    res.json({ msg: 'Amistad aceptada' });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting friend request', error: error.message });
  }
});

// Rechazar solicitud de amistad
router.put('/request/:id/reject', auth, async (req, res) => {
  try {
    const request = await FriendRequest.findByPk(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Solicitud no encontrada' });
    if (request.recipientId !== req.user.id) {
      return res.status(403).json({ msg: 'No autorizado' });
    }
    
    await request.destroy();
    res.json({ msg: 'Solicitud rechazada' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting friend request', error: error.message });
  }
});

// Eliminar amigo
router.delete('/:id', auth, async (req, res) => {
  try {
    const friendId = parseInt(req.params.id);
    
    // Eliminar amistad bidireccional
    await Friend.destroy({
      where: {
        [require('sequelize').Op.or]: [
          { userId: req.user.id, friendId },
          { userId: friendId, friendId: req.user.id }
        ]
      }
    });
    
    res.json({ msg: 'Amigo eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing friend', error: error.message });
  }
});

// Actualizar racha de amistad (se llama cuando ambos amigos completan tareas)
router.post('/streak/update', auth, async (req, res) => {
  try {
    const { friendId } = req.body;
    
    // Verificar que son amigos
    const friendship = await Friend.findOne({
      where: { userId: req.user.id, friendId }
    });
    if (!friendship) return res.status(404).json({ msg: 'No son amigos' });
    
    // Verificar que el amigo también completó tareas hoy
    const friend = await User.findByPk(friendId);
    const today = new Date().toDateString();
    const friendLastTask = friend.lastTaskDate ? new Date(friend.lastTaskDate).toDateString() : null;
    
    if (friendLastTask !== today) {
      return res.json({ msg: 'Amigo no ha completado tareas hoy', streak: friendship.friendshipStreak });
    }
    
    // Actualizar racha
    const now = new Date();
    const lastInteraction = friendship.lastInteractionDate ? new Date(friendship.lastInteractionDate).toDateString() : null;
    
    if (lastInteraction === today) {
      // Ya se actualizó hoy
      return res.json({ msg: 'Racha ya actualizada hoy', streak: friendship.friendshipStreak });
    }
    
    // Verificar si es el primer día de racha (3 días seguidos)
    if (!friendship.streakStartDate) {
      friendship.streakStartDate = now;
      friendship.friendshipStreak = 1;
    } else {
      const streakStart = new Date(friendship.streakStartDate);
      const daysSinceStart = Math.floor((now - streakStart) / (1000 * 60 * 60 * 24));
      
      if (daysSinceStart >= 3) {
        friendship.friendshipStreak += 1;
      } else {
        // Reiniciar racha si no han sido 3 días seguidos
        friendship.streakStartDate = now;
        friendship.friendshipStreak = 1;
      }
    }
    
    friendship.lastInteractionDate = now;
    await friendship.save();
    
    // Actualizar también la amistad del amigo
    const reverseFriendship = await Friend.findOne({
      where: { userId: friendId, friendId: req.user.id }
    });
    if (reverseFriendship) {
      reverseFriendship.friendshipStreak = friendship.friendshipStreak;
      reverseFriendship.lastInteractionDate = now;
      reverseFriendship.streakStartDate = friendship.streakStartDate;
      await reverseFriendship.save();
    }
    
    // Calcular bonus multiplicador
    const bonusMultiplier = 1 + (friendship.friendshipStreak * 0.05);
    
    res.json({ 
      streak: friendship.friendshipStreak, 
      bonusMultiplier,
      msg: 'Racha de amistad actualizada' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating friendship streak', error: error.message });
  }
});

module.exports = router;
