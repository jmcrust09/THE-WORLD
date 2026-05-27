require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./db');
const ShopItem = require('./models/ShopItem');
const User = require('./models/User');
const Pet = require('./models/Pet');
const Task = require('./models/Task');
const Inventory = require('./models/Inventory');
const Garden = require('./models/Garden');
const Egg = require('./models/Egg');

// Configurar asociaciones
User.hasMany(Pet, { foreignKey: 'userId' });
Pet.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Inventory, { foreignKey: 'userId' });
Inventory.belongsTo(User, { foreignKey: 'userId' });

ShopItem.hasMany(Inventory, { foreignKey: 'shopItemId', as: 'inventory' });
Inventory.belongsTo(ShopItem, { foreignKey: 'shopItemId', as: 'item' });

User.hasMany(Garden, { foreignKey: 'userId' });
Garden.belongsTo(User, { foreignKey: 'userId' });

const app = express();
const PORT = process.env.PORT || 5000;

// Función para inicializar la tienda automáticamente
const initializeShop = async () => {
  try {
    const count = await ShopItem.count();
    if (count === 0) {
      console.log('🥚 Tienda vacía, inicializando items...');
      const items = [
        { name: 'Semilla Pequeña', type: 'food', cost: 50, description: 'Da +10 EXP.', icon: 'fa-seedling', cssClass: 'bg-green-100 border-green-500', expValue: 10 },
        { name: 'Manzana Brillante', type: 'food', cost: 150, description: 'Da +50 EXP.', icon: 'fa-apple-whole', cssClass: 'bg-green-100 border-green-500', expValue: 50 },
        { name: 'Zanahoria Mágica', type: 'food', cost: 300, description: 'Da +120 EXP.', icon: 'fa-carrot', cssClass: 'bg-green-100 border-green-500', expValue: 120 },
        { name: 'Pescado Dorado', type: 'food', cost: 600, description: 'Da +250 EXP.', icon: 'fa-fish', cssClass: 'bg-green-100 border-green-500', expValue: 250 },
        { name: 'Carne Premium', type: 'food', cost: 1000, description: 'Da +500 EXP.', icon: 'fa-drumstick-bite', cssClass: 'bg-green-100 border-green-500', expValue: 500 },
        { name: 'Galleta Cósmica', type: 'food', cost: 2500, description: 'Da +1500 EXP.', icon: 'fa-cookie', cssClass: 'bg-green-100 border-green-500', expValue: 1500 },
        { name: 'Fruta del Edén', type: 'food', cost: 5000, description: 'Da +3500 EXP.', icon: 'fa-lemon', cssClass: 'bg-green-100 border-green-500', expValue: 3500 },
        { name: 'Néctar Divino', type: 'food', cost: 12000, description: 'Da +10000 EXP.', icon: 'fa-droplet', cssClass: 'bg-green-100 border-green-500', expValue: 10000 },
        { name: 'Estrella Fugaz', type: 'food', cost: 25000, description: 'Da +25000 EXP.', icon: 'fa-star', cssClass: 'bg-green-100 border-green-500', expValue: 25000 },
        { name: 'Esencia de Agujero Negro', type: 'food', cost: 100000, description: 'Da +150000 EXP.', icon: 'fa-circle-notch', cssClass: 'bg-green-100 border-green-500', expValue: 150000 },
        { name: 'Poción Menor de Suerte', type: 'potion', cost: 500, description: '+5% Suerte', icon: 'fa-flask', cssClass: 'bg-blue-100 border-blue-500', effect: '+5% Suerte' }
      ];
      await ShopItem.bulkCreate(items);
      console.log('✅ Tienda inicializada con 11 items');
    } else {
      console.log(`✅ Tienda ya tiene ${count} items`);
    }
  } catch (error) {
    console.error('❌ Error inicializando tienda:', error.message);
  }
};

// Función para inicializar huevos
const initializeEggs = async () => {
  try {
    const count = await Egg.count();
    if (count === 0) {
      console.log('🥚 Inicializando huevos...');
      const eggs = [
        { name: 'Huevo de Barro', type: 'egg', cost: 100, description: 'Lo más bajo. Solo comunes.', icon: 'fa-egg', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: false },
        { name: 'Huevo Básico', type: 'egg', cost: 500, description: 'Alta probabilidad de Común.', icon: 'fa-egg', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: false },
        { name: 'Huevo de Cobre', type: 'egg', cost: 800, description: 'Ligeramente mejor que el básico.', icon: 'fa-egg', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: false },
        { name: 'Huevo Premium', type: 'egg', cost: 1500, description: 'Balanceado.', icon: 'fa-egg', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: false },
        { name: 'Huevo de Plata', type: 'egg', cost: 2500, description: 'Más oportunidades de raros.', icon: 'fa-egg', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: false },
        { name: 'Huevo Épico', type: 'egg', cost: 5000, description: 'Garantiza Poco Común.', icon: 'fa-egg', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: false },
        { name: 'Huevo de Oro', type: 'egg', cost: 8000, description: 'Garantiza Raro.', icon: 'fa-egg', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: false },
        { name: 'Huevo Legendario', type: 'egg', cost: 15000, description: 'Garantiza Raro alto.', icon: 'fa-egg', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: false },
        { name: 'Huevo de Platino', type: 'egg', cost: 25000, description: 'Alto chance de Épico.', icon: 'fa-egg', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: false },
        { name: 'Huevo Mítico', type: 'egg', cost: 40000, description: 'Poder absoluto.', icon: 'fa-egg', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: false },
        { name: 'Huevo Estelar', type: 'egg', cost: 100000, description: 'Solo leyendas y mitos.', icon: 'fa-star', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: false },
        { name: 'Huevo Cyberpunk', type: 'egg', cost: 8000, description: 'Evento especial.', icon: 'fa-robot', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: true },
        { name: 'Huevo Fantasma', type: 'egg', cost: 12000, description: 'Evento de Halloween.', icon: 'fa-ghost', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: true },
        { name: 'Huevo de Cristal', type: 'egg', cost: 30000, description: 'Evento cristalino.', icon: 'fa-gem', cssClass: 'bg-bg', probabilities: { comun: 20, poco_comun: 20, raro: 20, epico: 20, legendario: 10, mitico: 10 }, isEvent: true }
      ];
      await Egg.bulkCreate(eggs);
      console.log('✅ Huevos inicializados con 14 items');
    } else {
      console.log(`✅ Huevos ya tienen ${count} items`);
    }
  } catch (error) {
    console.error('❌ Error inicializando huevos:', error.message);
  }
};

// Función para migrar columnas faltantes
const migrateDatabase = async () => {
  try {
    const tableDescription = await sequelize.getQueryInterface().describeTable('Users');
    
    if (!tableDescription.isGuest) {
      await sequelize.getQueryInterface().addColumn('Users', 'isGuest', {
        type: sequelize.Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
      });
      console.log('✅ Columna isGuest agregada');
    }
    
    if (!tableDescription.isAdmin) {
      await sequelize.getQueryInterface().addColumn('Users', 'isAdmin', {
        type: sequelize.Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
      });
      console.log('✅ Columna isAdmin agregada');
    }
    
    if (!tableDescription.lastTaskDate) {
      await sequelize.getQueryInterface().addColumn('Users', 'lastTaskDate', {
        type: sequelize.Sequelize.DATE,
        allowNull: true
      });
      console.log('✅ Columna lastTaskDate agregada');
    }
  } catch (error) {
    console.error('❌ Error en migración:', error.message);
  }
};

// Función para crear admin predeterminado
const initializeAdmin = async () => {
  try {
    const admin = await User.findOne({ where: { email: 'admin@theworld.com' } });
    if (!admin) {
      console.log('👤 Creando admin predeterminado...');
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('THEWORLDWM@adminpwd', salt);
      
      await User.create({
        username: 'Admin',
        email: 'admin@theworld.com',
        passwordHash: passwordHash,
        isGuest: false,
        isAdmin: true,
        totalPoints: 200000,
        currentStreak: 0,
        bestStreak: 0,
        bonusMultiplier: 2.0
      });
      console.log('✅ Admin creado: admin@theworld.com / THEWORLDWM@adminpwd');
    } else {
      console.log('✅ Admin ya existe');
    }
  } catch (error) {
    console.error('❌ Error creando admin:', error.message);
  }
};

// Connect to PostgreSQL + Sequelize
connectDB().then(async () => {
  // Sincronizar modelos y inicializar tienda
  await sequelize.sync();
  await migrateDatabase();
  await initializeShop();
  await initializeEggs();
  await initializeAdmin();
}).catch(err => {
  console.error('❌ Error conectando a la base de datos:', err.message);
  process.exit(1);
});

app.use(cors());
app.use(express.json());

// Check connection endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', message: 'THE WORLD backend is running and connected.' });
});

// Endpoint to get shop items from DB
app.get('/api/shop', async (req, res) => {
  try {
    const items = await ShopItem.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shop items', error: error.message });
  }
});

// Endpoint to get all pets from DB
app.get('/api/pets', async (req, res) => {
  try {
    const pets = await Pet.findAll({ order: [['rarity', 'ASC']] });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pets', error: error.message });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

app.use('/api/auth', require('./routes/auth'));

app.use('/api/tasks', require('./routes/tasks'));

app.use('/api/pets', require('./routes/pets'));

app.use('/api/admin', require('./routes/admin'));

app.use('/api/inventory', require('./routes/inventory'));

app.use('/api/garden', require('./routes/garden'));

app.use('/api/eggs', require('./routes/eggs'));

app.listen(PORT, () => {
  console.log(`🌍 THE WORLD backend is running on port ${PORT}`);
});
