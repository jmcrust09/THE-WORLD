require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const ShopItem = require('./models/ShopItem');
const User = require('./models/User');
const Pet = require('./models/Pet');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Check connection endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', message: 'THE WORLD backend is running and connected.' });
});

// Endpoint to get shop items from DB
app.get('/api/shop', async (req, res) => {
  try {
    const items = await ShopItem.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shop items', error: error.message });
  }
});

// Endpoint to get mock user info (for now, just returns the first user or a default)
app.get('/api/user/mock', async (req, res) => {
  try {
    let user = await User.findOne({});
    if (!user) {
      // Create a mock user if none exists
      user = await User.create({
        username: 'Jugador1',
        email: 'test@test.com',
        passwordHash: 'hashed',
        totalPoints: 1500
      });
    }
    res.json({
      username: user.username,
      totalPoints: user.totalPoints,
      currentStreak: user.currentStreak
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// Endpoint to get all pets from DB
app.get('/api/pets', async (req, res) => {
  try {
    const pets = await Pet.find({}).sort({ rarity: 1 });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pets', error: error.message });
  }
});

if (process.env.NODE_ENV === 'production') {
  
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🌍 THE WORLD backend is running on port ${PORT}`);
});
