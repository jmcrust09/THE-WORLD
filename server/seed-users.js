require('dotenv').config();
const User = require('./models/User');
const Inventory = require('./models/Inventory');
const Garden = require('./models/Garden');
const { Friend, FriendRequest } = require('./models/Friend');
const ShopItem = require('./models/ShopItem');
const { connectDB, sequelize } = require('./db');

const seedUsers = async () => {
  await connectDB();

  try {
    // Delete all existing users and related data
    console.log('🗑️  Eliminando usuarios existentes...');
    await Friend.destroy({ where: {} });
    await FriendRequest.destroy({ where: {} });
    await Garden.destroy({ where: {} });
    await Inventory.destroy({ where: {} });
    await User.destroy({ where: {} });

    // Create admin user
    console.log('👤 Creando admin user...');
    const admin = await User.create({
      username: 'Admin',
      email: 'admin@theworld.com',
      passwordHash: '$2b$10$8ErKCLCTBNU9vCkU0BikfOMGIrpWrfvIHL/i638Pi4eVRPYyYImn.',
      isGuest: false,
      isAdmin: true,
      totalPoints: 50000,
      currentStreak: 0,
      bestStreak: 0,
      bonusMultiplier: 2.0
    });
    console.log('✅ Admin creado: admin@theworld.com');

    // Create user1
    console.log('👤 Creando user1...');
    const user1 = await User.create({
      username: 'user1',
      email: 'user1@theworld.com',
      passwordHash: '$2b$10$Ch8ykSJrnU37n3DJM3bG2.LXzi.CC0jreVdGIk82C.i7lBBmxwW1u',
      isGuest: false,
      isAdmin: false,
      totalPoints: 10000,
      currentStreak: 0,
      bestStreak: 0,
      bonusMultiplier: 1.0
    });
    console.log('✅ User1 creado: user1@theworld.com');

    // Create user2
    console.log('👤 Creando user2...');
    const user2 = await User.create({
      username: 'user2',
      email: 'user2@theworld.com',
      passwordHash: '$2b$10$YGWVXGOzdVDKlUPVjOsv3OICsevHnEsxkEcMcnX0VFYrD3ng1dIiW',
      isGuest: false,
      isAdmin: false,
      totalPoints: 10000,
      currentStreak: 0,
      bestStreak: 0,
      bonusMultiplier: 1.0
    });
    console.log('✅ User2 creado: user2@theworld.com');

    // Get shop items for inventory
    const shopItems = await ShopItem.findAll();
    console.log(`📦 Found ${shopItems.length} shop items`);

    // Add inventory for admin
    if (shopItems.length > 0) {
      await Inventory.bulkCreate([
        { userId: admin.id, shopItemId: shopItems[0].id, quantity: 5 },
        { userId: admin.id, shopItemId: shopItems[1].id, quantity: 3 },
      ]);
      console.log('✅ Inventario añadido para admin');
    }

    // Add inventory for user1
    if (shopItems.length > 0) {
      await Inventory.bulkCreate([
        { userId: user1.id, shopItemId: shopItems[0].id, quantity: 3 },
        { userId: user1.id, shopItemId: shopItems[1].id, quantity: 2 },
      ]);
      console.log('✅ Inventario añadido para user1');
    }

    // Add inventory for user2
    if (shopItems.length > 0) {
      await Inventory.bulkCreate([
        { userId: user2.id, shopItemId: shopItems[0].id, quantity: 3 },
        { userId: user2.id, shopItemId: shopItems[1].id, quantity: 2 },
      ]);
      console.log('✅ Inventario añadido para user2');
    }

    // Add garden for admin
    await Garden.bulkCreate([
      { userId: admin.id, plantType: 'tomato', stage: 'growing', position: 1, growthProgress: 50 },
      { userId: admin.id, plantType: 'carrot', stage: 'seed', position: 2, growthProgress: 0 },
      { userId: admin.id, plantType: 'lettuce', stage: 'mature', position: 3, growthProgress: 100 },
    ]);
    console.log('✅ Jardín añadido para admin');

    // Add garden for user1
    await Garden.bulkCreate([
      { userId: user1.id, plantType: 'tomato', stage: 'growing', position: 1, growthProgress: 30 },
      { userId: user1.id, plantType: 'carrot', stage: 'seed', position: 2, growthProgress: 0 },
    ]);
    console.log('✅ Jardín añadido para user1');

    // Add garden for user2
    await Garden.bulkCreate([
      { userId: user2.id, plantType: 'lettuce', stage: 'growing', position: 1, growthProgress: 40 },
      { userId: user2.id, plantType: 'tomato', stage: 'seed', position: 2, growthProgress: 0 },
    ]);
    console.log('✅ Jardín añadido para user2');

    // Add friend relationship between user1 and user2
    await Friend.create({
      userId: user1.id,
      friendId: user2.id,
      friendshipStreak: 0
    });
    await Friend.create({
      userId: user2.id,
      friendId: user1.id,
      friendshipStreak: 0
    });
    console.log('✅ Amistad creada entre user1 y user2');

    console.log('🎉 Seeding completado exitosamente!');
    process.exit();
  } catch (error) {
    console.error('❌ Error en seeding:', error);
    process.exit(1);
  }
};

seedUsers();
