require('dotenv').config();
const mongoose = require('mongoose');
const ShopItem = require('./models/ShopItem');
const connectDB = require('./db');

const seedShop = async () => {
  await connectDB();

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
      cssClass: 'bg-bg border-beige opacity-50', // Mocking not allowed state
      probabilities: { comun: 0, poco_comun: 40, raro: 35, epico: 20, legendario: 4, mitico: 1 }
    }
  ];

  try {
    await ShopItem.deleteMany({});
    await ShopItem.insertMany(items);
    console.log('Tienda (Shop Items) inicializada con éxito en MongoDB Atlas.');
    process.exit();
  } catch (error) {
    console.error('Error inicializando la tienda:', error);
    process.exit(1);
  }
};

seedShop();
