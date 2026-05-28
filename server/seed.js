require('dotenv').config();
const ShopItem = require('./models/ShopItem');
const { connectDB } = require('./db');

const seedShop = async () => {
  await connectDB();

  const items = [
    {
      name: 'Huevo Básico',
      type: 'egg',
      cost: 500,
      description: 'Alta probabilidad de Común, baja de Raro.',
      icon: 'fa-egg',
      cssClass: 'bg-bg border-beige',
      probabilities: { comun: 55, poco_comun: 28, raro: 12, epico: 4, legendario: 1, mitico: 0 }
    },
    {
      name: 'Huevo Premium',
      type: 'egg',
      cost: 1500,
      description: 'Balanceado, mayor chance de Épico.',
      icon: 'fa-gem',
      cssClass: 'bg-[rgba(248,244,239,1)] border-[#e8a87c]',
      probabilities: { comun: 35, poco_comun: 30, raro: 22, epico: 10, legendario: 2.5, mitico: 0.5 }
    },
    {
      name: 'Huevo Épico',
      type: 'egg',
      cost: 5000,
      description: 'Garantiza Poco Común o mejor.',
      icon: 'fa-circle-notch',
      cssClass: 'bg-bg border-beige opacity-50',
      probabilities: { comun: 0, poco_comun: 40, raro: 35, epico: 20, legendario: 4, mitico: 1 }
    },
    {
      name: 'Huevo Legendario',
      type: 'egg',
      cost: 15000,
      description: 'Garantiza Raro o mejor.',
      icon: 'fa-crown',
      cssClass: 'bg-bg border-[#ffa726]',
      probabilities: { comun: 0, poco_comun: 10, raro: 50, epico: 30, legendario: 8, mitico: 2 }
    },
    {
      name: 'Huevo Mítico',
      type: 'egg',
      cost: 50000,
      description: 'Garantiza Épico o mejor.',
      icon: 'fa-star',
      cssClass: 'bg-bg border-[#ef5350]',
      probabilities: { comun: 0, poco_comun: 0, raro: 15, epico: 45, legendario: 30, mitico: 10 }
    }
  ];

  try {
    await ShopItem.destroy({ where: {} });
    await ShopItem.bulkCreate(items);
    console.log('Tienda (Shop Items) inicializada con éxito en PostgreSQL.');
    process.exit();
  } catch (error) {
    console.error('Error inicializando la tienda:', error);
    process.exit(1);
  }
};

seedShop();
