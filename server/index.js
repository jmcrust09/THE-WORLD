require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./db');
const ShopItem = require('./models/ShopItem');
const User = require('./models/User');
const Pet = require('./models/Pet');

const app = express();
const PORT = process.env.PORT || 5000;

// Función para inicializar la tienda automáticamente
const initializeShop = async () => {
  try {
    const count = await ShopItem.count();
    if (count === 0) {
      console.log('🥚 Tienda vacía, inicializando huevos...');
      const items = [
        {
          name: 'Huevo Básico',
          type: 'egg',
          cost: 500,
          description: 'Alta probabilidad de Común, baja de Raro.',
          icon: '🥚',
          cssClass: 'bg-bg border-beige',
          probabilities: { comun: 55, poco_comun: 28, raro: 12, epico: 4, legendario: 1, mitico: 0 }
        },
        {
          name: 'Huevo Premium',
          type: 'egg',
          cost: 1500,
          description: 'Balanceado, mayor chance de Épico.',
          icon: '✨🥚✨',
          cssClass: 'bg-[rgba(248,244,239,1)] border-[#e8a87c]',
          probabilities: { comun: 35, poco_comun: 30, raro: 22, epico: 10, legendario: 2.5, mitico: 0.5 }
        },
        {
          name: 'Huevo Épico',
          type: 'egg',
          cost: 5000,
          description: 'Garantiza Poco Común o mejor.',
          icon: '🔮',
          cssClass: 'bg-bg border-beige opacity-50',
          probabilities: { comun: 0, poco_comun: 40, raro: 35, epico: 20, legendario: 4, mitico: 1 }
        },
        {
          name: 'Huevo Legendario',
          type: 'egg',
          cost: 15000,
          description: 'Garantiza Raro o mejor.',
          icon: '👑',
          cssClass: 'bg-bg border-[#ffa726]',
          probabilities: { comun: 0, poco_comun: 10, raro: 50, epico: 30, legendario: 8, mitico: 2 }
        },
        {
          name: 'Huevo Mítico',
          type: 'egg',
          cost: 50000,
          description: 'Garantiza Épico o mejor.',
          icon: '🌟',
          cssClass: 'bg-bg border-[#ef5350]',
          probabilities: { comun: 0, poco_comun: 0, raro: 15, epico: 45, legendario: 30, mitico: 10 }
        }
      ];
      await ShopItem.bulkCreate(items);
      console.log('✅ Tienda inicializada con 5 tipos de huevos');
    } else {
      console.log(`✅ Tienda ya tiene ${count} items`);
    }
  } catch (error) {
    console.error('❌ Error inicializando tienda:', error.message);
  }
};

// Connect to PostgreSQL + Sequelize
connectDB().then(async () => {
  // Sincronizar modelos y inicializar tienda
  await sequelize.sync();
  await initializeShop();
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

app.listen(PORT, () => {
  console.log(`🌍 THE WORLD backend is running on port ${PORT}`);
});
