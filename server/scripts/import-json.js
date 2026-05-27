require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../db');
const User = require('../models/User');
const Pet = require('../models/Pet');
const Task = require('../models/Task');
const ShopItem = require('../models/ShopItem');
const bcrypt = require('bcryptjs');

// Función para leer archivos JSON
const readJsonFile = (filename) => {
  const filePath = path.join(__dirname, '../../postgredb', filename);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Función para convertir MongoDB ObjectId a número (para PostgreSQL)
const convertMongoId = (mongoId) => {
  if (!mongoId || !mongoId.$oid) return null;
  // Usar los últimos 8 caracteres del ObjectId como número
  return parseInt(mongoId.$oid.slice(-8), 16);
};

// Función para convertir fecha MongoDB a Date
const convertMongoDate = (mongoDate) => {
  if (!mongoDate || !mongoDate.$date) return new Date();
  return new Date(mongoDate.$date);
};

// Importar usuarios
const importUsers = async () => {
  console.log('📥 Importando usuarios...');
  const usersData = readJsonFile('users.json');
  
  for (const [key, userData] of Object.entries(usersData)) {
    try {
      // Verificar si el usuario ya existe
      const existing = await User.findOne({ where: { username: userData.username } });
      if (existing) {
        console.log(`⏭️  Usuario ${userData.username} ya existe, saltando...`);
        continue;
      }
      
      // Crear hash de contraseña si es el hash falso
      let passwordHash = userData.passwordHash;
      if (userData.passwordHash === 'hash_falso_para_insertar_a_mano') {
        const salt = await bcrypt.genSalt(10);
        passwordHash = await bcrypt.hash('password123', salt);
      }
      
      await User.create({
        username: userData.username,
        email: userData.email,
        passwordHash: passwordHash,
        isGuest: false,
        totalPoints: userData.totalPoints,
        currentStreak: userData.currentStreak,
        bestStreak: userData.bestStreak,
        bonusMultiplier: userData.bonusMultiplier,
        createdAt: convertMongoDate(userData.createdAt),
        updatedAt: convertMongoDate(userData.updatedAt)
      });
      
      console.log(`✅ Usuario ${userData.username} importado`);
    } catch (error) {
      console.error(`❌ Error importando usuario ${userData.username}:`, error.message);
    }
  }
};

// Importar mascotas
const importPets = async () => {
  console.log('📥 Importando mascotas...');
  const petsData = readJsonFile('pets.json');
  
  // Obtener usuarios para asignar userId
  const users = await User.findAll();
  if (users.length === 0) {
    console.log('⚠️  No hay usuarios, importando mascotas con userId=1 (por defecto)');
  }
  
  const defaultUserId = users.length > 0 ? users[0].id : 1;
  
  for (const [key, petData] of Object.entries(petsData)) {
    try {
      await Pet.create({
        userId: defaultUserId,
        species: petData.species,
        name: petData.name,
        rarity: petData.rarity,
        stage: petData.stage,
        pointsAccumulated: petData.pointsAccumulated,
        eggOrigin: petData.eggOrigin,
        isFavorite: petData.isFavorite,
        hatchedAt: convertMongoDate(petData.createdAt),
        lastInteraction: new Date(),
        createdAt: convertMongoDate(petData.createdAt),
        updatedAt: new Date()
      });
      
      console.log(`✅ Mascota ${petData.name} importada`);
    } catch (error) {
      console.error(`❌ Error importando mascota ${petData.name}:`, error.message);
    }
  }
};

// Importar actividades (tasks)
const importActivities = async () => {
  console.log('📥 Importando actividades...');
  const activitiesData = readJsonFile('activities.json');
  
  // Obtener usuarios para asignar userId
  const users = await User.findAll();
  const defaultUserId = users.length > 0 ? users[0].id : 1;
  
  for (const [key, activityData] of Object.entries(activitiesData)) {
    try {
      await Task.create({
        userId: defaultUserId,
        day: activityData.day,
        schedule: activityData.schedule,
        title: activityData.task,
        category: activityData.category,
        priority: activityData.priority,
        completed: activityData.completed,
        pointsEarned: activityData.pointsEarned,
        timestamp: convertMongoDate(activityData.timestamp),
        createdAt: convertMongoDate(activityData.timestamp),
        updatedAt: new Date()
      });
      
      console.log(`✅ Actividad "${activityData.task}" importada`);
    } catch (error) {
      console.error(`❌ Error importando actividad ${activityData.task}:`, error.message);
    }
  }
};

// Importar items de tienda
const importShopItems = async () => {
  console.log('📥 Importando items de tienda...');
  const shopItemsData = readJsonFile('shopitems.json');
  
  for (const [key, itemData] of Object.entries(shopItemsData)) {
    try {
      // Verificar si el item ya existe
      const existing = await ShopItem.findOne({ where: { name: itemData.name } });
      if (existing) {
        console.log(`⏭️  Item ${itemData.name} ya existe, actualizando...`);
        await existing.update({
          cost: itemData.cost,
          description: itemData.description,
          icon: itemData.icon,
          cssClass: itemData.cssClass,
          probabilities: itemData.probabilities
        });
        continue;
      }
      
      await ShopItem.create({
        name: itemData.name,
        type: itemData.type,
        cost: itemData.cost,
        description: itemData.description,
        icon: itemData.icon,
        cssClass: itemData.cssClass,
        probabilities: itemData.probabilities,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log(`✅ Item ${itemData.name} importado`);
    } catch (error) {
      console.error(`❌ Error importando item ${itemData.name}:`, error.message);
    }
  }
};

// Función principal
const importAll = async () => {
  try {
    console.log('🚀 Iniciando importación de datos JSON a PostgreSQL...\n');
    
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conectado a PostgreSQL\n');
    
    // Sincronizar modelos
    await sequelize.sync();
    console.log('✅ Modelos sincronizados\n');
    
    // Importar en orden
    await importUsers();
    console.log('');
    
    await importShopItems();
    console.log('');
    
    await importPets();
    console.log('');
    
    await importActivities();
    console.log('');
    
    console.log('🎉 Importación completada con éxito!');
    console.log('\n📝 Resumen:');
    console.log('- Usuarios importados');
    console.log('- Items de tienda importados/actualizados');
    console.log('- Mascotas importadas');
    console.log('- Actividades importadas');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante la importación:', error);
    process.exit(1);
  }
};

// Ejecutar importación
importAll();
