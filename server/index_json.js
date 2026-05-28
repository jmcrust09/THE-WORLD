const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dataManager = require('./dataManager');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_123andWMcame4M3';

app.use(cors());
app.use(express.json());

// Serve static files from React app
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Middleware de autenticación
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No hay token, autorización denegada' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ msg: 'Token inválido' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no es válido' });
  }
};

// Middleware de admin
const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    const user = dataManager.getUserById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ msg: 'Acceso denegado. Se requiere ser admin.' });
    }
    next();
  });
};

// ===== AUTH ROUTES =====
const authRouter = express.Router();

// Registro
authRouter.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Verificar si el usuario ya existe
    const existingUser = dataManager.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }
    
    // Hash de contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    // Crear usuario
    const newUser = dataManager.createUser({
      username,
      email,
      passwordHash,
      isGuest: false,
      isAdmin: false,
      isBanned: false,
      totalPoints: 0,
      currentStreak: 0,
      bestStreak: 0,
      bonusMultiplier: 1.0
    });
    
    // Generar token
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        totalPoints: newUser.totalPoints,
        currentStreak: newUser.currentStreak,
        bestStreak: newUser.bestStreak,
        bonusMultiplier: newUser.bonusMultiplier
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en servidor' });
  }
});

// Login
authRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Buscar usuario
    const user = dataManager.getUserByUsername(username);
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }
    
    // Verificar si está baneado
    if (user.isBanned) {
      return res.status(403).json({ msg: 'Usuario baneado', banReason: user.banReason });
    }
    
    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }
    
    // Generar token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        totalPoints: user.totalPoints,
        currentStreak: user.currentStreak,
        bestStreak: user.bestStreak,
        bonusMultiplier: user.bonusMultiplier,
        profilePictureUrl: user.profilePictureUrl
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en servidor' });
  }
});

// Login como invitado
authRouter.post('/guest', async (req, res) => {
  try {
    const { username } = req.body;
    
    // Crear usuario invitado
    const newUser = dataManager.createUser({
      username: username || `guest_${Date.now()}`,
      email: null,
      passwordHash: null,
      isGuest: true,
      isAdmin: false,
      isBanned: false,
      totalPoints: 0,
      currentStreak: 0,
      bestStreak: 0,
      bonusMultiplier: 1.0
    });
    
    // Generar token
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        totalPoints: newUser.totalPoints,
        currentStreak: newUser.currentStreak,
        bestStreak: newUser.bestStreak,
        bonusMultiplier: newUser.bonusMultiplier
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en servidor' });
  }
});

// Obtener usuario actual
authRouter.get('/me', auth, (req, res) => {
  try {
    const user = dataManager.getUserById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
    if (user.isBanned) return res.status(403).json({ msg: 'Usuario baneado', banReason: user.banReason });
    
    const { passwordHash, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).send('Error');
  }
});

app.use('/api/auth', authRouter);

// ===== TASKS ROUTES =====
const tasksRouter = express.Router();

tasksRouter.get('/', auth, (req, res) => {
  try {
    const tasks = dataManager.getTasks(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo tareas' });
  }
});

tasksRouter.post('/', auth, (req, res) => {
  try {
    const task = dataManager.createTask({
      userId: req.user.id,
      ...req.body
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: 'Error creando tarea' });
  }
});

tasksRouter.put('/:id', auth, (req, res) => {
  try {
    const task = dataManager.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' });
    if (task.userId !== req.user.id) return res.status(403).json({ msg: 'No autorizado' });
    
    const updatedTask = dataManager.updateTask(req.params.id, req.body);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ msg: 'Error actualizando tarea' });
  }
});

tasksRouter.delete('/:id', auth, (req, res) => {
  try {
    const task = dataManager.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' });
    if (task.userId !== req.user.id) return res.status(403).json({ msg: 'No autorizado' });
    
    dataManager.deleteTask(req.params.id);
    res.json({ msg: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ msg: 'Error eliminando tarea' });
  }
});

app.use('/api/tasks', tasksRouter);

// ===== PETS ROUTES =====
const petsRouter = express.Router();

petsRouter.get('/', auth, (req, res) => {
  try {
    const pets = dataManager.getPets(req.user.id);
    res.json(pets);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo mascotas' });
  }
});

petsRouter.post('/', auth, (req, res) => {
  try {
    const pet = dataManager.createPet({
      userId: req.user.id,
      ...req.body
    });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ msg: 'Error creando mascota' });
  }
});

petsRouter.put('/:id', auth, (req, res) => {
  try {
    const pet = dataManager.getPetById(req.params.id);
    if (!pet) return res.status(404).json({ msg: 'Mascota no encontrada' });
    if (pet.userId !== req.user.id) return res.status(403).json({ msg: 'No autorizado' });
    
    const updatedPet = dataManager.updatePet(req.params.id, req.body);
    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({ msg: 'Error actualizando mascota' });
  }
});

petsRouter.delete('/:id', auth, (req, res) => {
  try {
    const pet = dataManager.getPetById(req.params.id);
    if (!pet) return res.status(404).json({ msg: 'Mascota no encontrada' });
    if (pet.userId !== req.user.id) return res.status(403).json({ msg: 'No autorizado' });
    
    dataManager.deletePet(req.params.id);
    res.json({ msg: 'Mascota eliminada' });
  } catch (error) {
    res.status(500).json({ msg: 'Error eliminando mascota' });
  }
});

app.use('/api/pets', petsRouter);

// ===== SHOP ROUTES =====
const shopRouter = express.Router();

shopRouter.get('/', auth, (req, res) => {
  try {
    const items = dataManager.getShopItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo items de tienda' });
  }
});

app.use('/api/shop', shopRouter);

// ===== EGGS ROUTES =====
const eggsRouter = express.Router();

eggsRouter.get('/', auth, (req, res) => {
  try {
    const eggs = dataManager.getEggs().filter(e => e.isActive);
    res.json(eggs);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo huevos' });
  }
});

eggsRouter.get('/all', adminAuth, (req, res) => {
  try {
    const eggs = dataManager.getEggs();
    res.json(eggs);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo huevos' });
  }
});

eggsRouter.post('/', adminAuth, (req, res) => {
  try {
    const egg = dataManager.createEgg(req.body);
    res.json(egg);
  } catch (error) {
    res.status(500).json({ msg: 'Error creando huevo' });
  }
});

eggsRouter.put('/:id', adminAuth, (req, res) => {
  try {
    const updatedEgg = dataManager.updateEgg(req.params.id, req.body);
    res.json(updatedEgg);
  } catch (error) {
    res.status(500).json({ msg: 'Error actualizando huevo' });
  }
});

eggsRouter.delete('/:id', adminAuth, (req, res) => {
  try {
    dataManager.deleteEgg(req.params.id);
    res.json({ msg: 'Huevo eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error eliminando huevo' });
  }
});

app.use('/api/eggs', eggsRouter);

// ===== INVENTORY ROUTES =====
const inventoryRouter = express.Router();

inventoryRouter.get('/', auth, (req, res) => {
  try {
    const inventory = dataManager.getInventories(req.user.id);
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo inventario' });
  }
});

inventoryRouter.post('/', auth, (req, res) => {
  try {
    const item = dataManager.createInventory({
      userId: req.user.id,
      ...req.body
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ msg: 'Error añadiendo al inventario' });
  }
});

app.use('/api/inventory', inventoryRouter);

// ===== GARDEN ROUTES =====
const gardenRouter = express.Router();

gardenRouter.get('/', auth, (req, res) => {
  try {
    const garden = dataManager.getGartens(req.user.id);
    res.json(garden);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo jardín' });
  }
});

gardenRouter.post('/', auth, (req, res) => {
  try {
    const plant = dataManager.createGarden({
      userId: req.user.id,
      ...req.body
    });
    res.json(plant);
  } catch (error) {
    res.status(500).json({ msg: 'Error plantando' });
  }
});

gardenRouter.put('/:id', auth, (req, res) => {
  try {
    const plant = dataManager.getGardenById(req.params.id);
    if (!plant) return res.status(404).json({ msg: 'Planta no encontrada' });
    if (plant.userId !== req.user.id) return res.status(403).json({ msg: 'No autorizado' });
    
    const updatedPlant = dataManager.updateGarden(req.params.id, req.body);
    res.json(updatedPlant);
  } catch (error) {
    res.status(500).json({ msg: 'Error actualizando planta' });
  }
});

app.use('/api/garden', gardenRouter);

// ===== FRIENDS ROUTES =====
const friendsRouter = express.Router();

friendsRouter.get('/', auth, (req, res) => {
  try {
    const friends = dataManager.getFriends(req.user.id);
    res.json(friends);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo amigos' });
  }
});

friendsRouter.post('/request', auth, (req, res) => {
  try {
    const request = dataManager.createFriendRequest({
      senderId: req.user.id,
      ...req.body
    });
    res.json(request);
  } catch (error) {
    res.status(500).json({ msg: 'Error enviando solicitud' });
  }
});

friendsRouter.post('/accept/:id', auth, (req, res) => {
  try {
    const request = dataManager.getFriendRequestById(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Solicitud no encontrada' });
    if (request.receiverId !== req.user.id) return res.status(403).json({ msg: 'No autorizado' });
    
    dataManager.updateFriendRequest(req.params.id, { status: 'accepted' });
    
    // Crear amistad bidireccional
    dataManager.createFriend({
      userId: request.senderId,
      friendId: request.receiverId,
      friendshipStreak: 0,
      streakStartDate: new Date().toISOString(),
      lastInteractionDate: new Date().toISOString()
    });
    
    dataManager.createFriend({
      userId: request.receiverId,
      friendId: request.senderId,
      friendshipStreak: 0,
      streakStartDate: new Date().toISOString(),
      lastInteractionDate: new Date().toISOString()
    });
    
    res.json({ msg: 'Solicitud aceptada' });
  } catch (error) {
    res.status(500).json({ msg: 'Error aceptando solicitud' });
  }
});

friendsRouter.delete('/:id', auth, (req, res) => {
  try {
    const friend = dataManager.getFriendById(req.params.id);
    if (!friend) return res.status(404).json({ msg: 'Amigo no encontrado' });
    if (friend.userId !== req.user.id && friend.friendId !== req.user.id) {
      return res.status(403).json({ msg: 'No autorizado' });
    }
    
    dataManager.deleteFriend(req.params.id);
    res.json({ msg: 'Amigo eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error eliminando amigo' });
  }
});

app.use('/api/friends', friendsRouter);

// ===== ADMIN ROUTES =====
const adminRouter = express.Router();

adminRouter.get('/users', adminAuth, (req, res) => {
  try {
    const users = dataManager.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo usuarios' });
  }
});

adminRouter.put('/users/:id/admin', adminAuth, (req, res) => {
  try {
    const user = dataManager.updateUser(req.params.id, { isAdmin: req.body.isAdmin });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Error actualizando admin status' });
  }
});

adminRouter.put('/users/:id/ban', adminAuth, (req, res) => {
  try {
    const user = dataManager.updateUser(req.params.id, {
      isBanned: req.body.isBanned,
      banReason: req.body.isBanned ? req.body.banReason : null,
      bannedAt: req.body.isBanned ? new Date().toISOString() : null
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Error actualizando ban status' });
  }
});

adminRouter.get('/shop-items', adminAuth, (req, res) => {
  try {
    const items = dataManager.getShopItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo items de tienda' });
  }
});

adminRouter.post('/shop-items', adminAuth, (req, res) => {
  try {
    const item = dataManager.createShopItem(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ msg: 'Error creando item' });
  }
});

adminRouter.put('/shop-items/:id', adminAuth, (req, res) => {
  try {
    const item = dataManager.updateShopItem(req.params.id, req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ msg: 'Error actualizando item' });
  }
});

adminRouter.delete('/shop-items/:id', adminAuth, (req, res) => {
  try {
    dataManager.deleteShopItem(req.params.id);
    res.json({ msg: 'Item eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error eliminando item' });
  }
});

app.use('/api/admin', adminRouter);

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor JSON corriendo en puerto ${PORT}`);
  console.log('Sistema de base de datos: JSON (archivos en carpeta data/)');
});
