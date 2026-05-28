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

// Función para inicializar la tienda automáticamente (solo crea tabla, sin datos)
const initializeShop = async () => {
  try {
    await ShopItem.count();
    console.log('✅ Tabla ShopItems lista');
  } catch (error) {
    console.error('❌ Error inicializando tienda:', error.message);
  }
};

// Función para inicializar huevos (solo crea tabla, sin datos)
const initializeEggs = async () => {
  try {
    await Egg.count();
    console.log('✅ Tabla Eggs lista');
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
    
    // Migración para Eggs.isActive
    try {
      const eggTable = await sequelize.getQueryInterface().describeTable('Eggs');
      if (!eggTable.isActive) {
        await sequelize.getQueryInterface().addColumn('Eggs', 'isActive', {
          type: sequelize.Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: true
        });
        console.log('✅ Columna isActive agregada a Eggs');
      }
      if (!eggTable.availableFrom) {
        await sequelize.getQueryInterface().addColumn('Eggs', 'availableFrom', {
          type: sequelize.Sequelize.DATE,
          allowNull: true
        });
        console.log('✅ Columna availableFrom agregada a Eggs');
      }
      if (!eggTable.availableUntil) {
        await sequelize.getQueryInterface().addColumn('Eggs', 'availableUntil', {
          type: sequelize.Sequelize.DATE,
          allowNull: true
        });
        console.log('✅ Columna availableUntil agregada a Eggs');
      }
    } catch (error) {
      // La tabla puede no existir aún
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

// Endpoint to get shop items from DB (protegido)
app.get('/api/shop', require('./middleware/auth'), async (req, res) => {
  try {
    const items = await ShopItem.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shop items', error: error.message });
  }
});

// Endpoint to get all pets from DB (protegido)
app.get('/api/pets', require('./middleware/auth'), async (req, res) => {
  try {
    const pets = await Pet.findAll({ where: { userId: req.user.id }, order: [['rarity', 'ASC']] });
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

app.use('/api/friends', require('./routes/friends'));

app.listen(PORT, () => {
  console.log(`🌍 THE WORLD backend is running on port ${PORT}`);
});
