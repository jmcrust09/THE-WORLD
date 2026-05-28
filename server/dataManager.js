const fs = require('fs');
const path = require('path');

// Ruta a la carpeta data
const DATA_DIR = path.join(__dirname, '../data');

// Función para leer un archivo JSON
function readJSON(filename) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error leyendo ${filename}:`, error.message);
    return null;
  }
}

// Función para escribir un archivo JSON
function writeJSON(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error escribiendo ${filename}:`, error.message);
    return false;
  }
}

// Generar ID único
function generateId() {
  return Date.now() + Math.random().toString(36).substr(2, 9);
}

// ===== USERS =====
function getUsers() {
  const data = readJSON('users.json');
  return data ? data.users : [];
}

function getUserById(id) {
  const users = getUsers();
  return users.find(u => u.id === parseInt(id));
}

function getUserByUsername(username) {
  const users = getUsers();
  return users.find(u => u.username === username);
}

function createUser(userData) {
  const data = readJSON('users.json');
  if (!data) return null;
  
  const newUser = {
    id: data.users.length > 0 ? Math.max(...data.users.map(u => u.id)) + 1 : 1,
    ...userData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.users.push(newUser);
  writeJSON('users.json', data);
  return newUser;
}

function updateUser(id, updates) {
  const data = readJSON('users.json');
  if (!data) return null;
  
  const userIndex = data.users.findIndex(u => u.id === parseInt(id));
  if (userIndex === -1) return null;
  
  data.users[userIndex] = {
    ...data.users[userIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  writeJSON('users.json', data);
  return data.users[userIndex];
}

// ===== EGGS =====
function getEggs() {
  const data = readJSON('eggs.json');
  return data ? data.eggs : [];
}

function getEggById(id) {
  const eggs = getEggs();
  return eggs.find(e => e.id === parseInt(id));
}

function createEgg(eggData) {
  const data = readJSON('eggs.json');
  if (!data) return null;
  
  const newEgg = {
    id: data.eggs.length > 0 ? Math.max(...data.eggs.map(e => e.id)) + 1 : 1,
    ...eggData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.eggs.push(newEgg);
  writeJSON('eggs.json', data);
  return newEgg;
}

function updateEgg(id, updates) {
  const data = readJSON('eggs.json');
  if (!data) return null;
  
  const eggIndex = data.eggs.findIndex(e => e.id === parseInt(id));
  if (eggIndex === -1) return null;
  
  data.eggs[eggIndex] = {
    ...data.eggs[eggIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  writeJSON('eggs.json', data);
  return data.eggs[eggIndex];
}

function deleteEgg(id) {
  const data = readJSON('eggs.json');
  if (!data) return false;
  
  const initialLength = data.eggs.length;
  data.eggs = data.eggs.filter(e => e.id !== parseInt(id));
  
  if (data.eggs.length < initialLength) {
    writeJSON('eggs.json', data);
    return true;
  }
  return false;
}

// ===== SHOP ITEMS =====
function getShopItems() {
  const data = readJSON('shopitems.json');
  return data ? data.shopitems : [];
}

function getShopItemById(id) {
  const items = getShopItems();
  return items.find(i => i.id === parseInt(id));
}

function createShopItem(itemData) {
  const data = readJSON('shopitems.json');
  if (!data) return null;
  
  const newItem = {
    id: data.shopitems.length > 0 ? Math.max(...data.shopitems.map(i => i.id)) + 1 : 1,
    ...itemData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.shopitems.push(newItem);
  writeJSON('shopitems.json', data);
  return newItem;
}

function updateShopItem(id, updates) {
  const data = readJSON('shopitems.json');
  if (!data) return null;
  
  const itemIndex = data.shopitems.findIndex(i => i.id === parseInt(id));
  if (itemIndex === -1) return null;
  
  data.shopitems[itemIndex] = {
    ...data.shopitems[itemIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  writeJSON('shopitems.json', data);
  return data.shopitems[itemIndex];
}

function deleteShopItem(id) {
  const data = readJSON('shopitems.json');
  if (!data) return false;
  
  const initialLength = data.shopitems.length;
  data.shopitems = data.shopitems.filter(i => i.id !== parseInt(id));
  
  if (data.shopitems.length < initialLength) {
    writeJSON('shopitems.json', data);
    return true;
  }
  return false;
}

// ===== TASKS =====
function getTasks(userId = null) {
  const data = readJSON('tasks.json');
  if (!data) return [];
  
  const tasks = data.tasks;
  return userId ? tasks.filter(t => t.userId === parseInt(userId)) : tasks;
}

function getTaskById(id) {
  const tasks = getTasks();
  return tasks.find(t => t.id === parseInt(id));
}

function createTask(taskData) {
  const data = readJSON('tasks.json');
  if (!data) return null;
  
  const newTask = {
    id: data.tasks.length > 0 ? Math.max(...data.tasks.map(t => t.id)) + 1 : 1,
    ...taskData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.tasks.push(newTask);
  writeJSON('tasks.json', data);
  return newTask;
}

function updateTask(id, updates) {
  const data = readJSON('tasks.json');
  if (!data) return null;
  
  const taskIndex = data.tasks.findIndex(t => t.id === parseInt(id));
  if (taskIndex === -1) return null;
  
  data.tasks[taskIndex] = {
    ...data.tasks[taskIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  writeJSON('tasks.json', data);
  return data.tasks[taskIndex];
}

function deleteTask(id) {
  const data = readJSON('tasks.json');
  if (!data) return false;
  
  const initialLength = data.tasks.length;
  data.tasks = data.tasks.filter(t => t.id !== parseInt(id));
  
  if (data.tasks.length < initialLength) {
    writeJSON('tasks.json', data);
    return true;
  }
  return false;
}

// ===== PETS =====
function getPets(userId = null) {
  const data = readJSON('pets.json');
  if (!data) return [];
  
  const pets = data.pets;
  return userId ? pets.filter(p => p.userId === parseInt(userId)) : pets;
}

function getPetById(id) {
  const pets = getPets();
  return pets.find(p => p.id === parseInt(id));
}

function createPet(petData) {
  const data = readJSON('pets.json');
  if (!data) return null;
  
  const newPet = {
    id: data.pets.length > 0 ? Math.max(...data.pets.map(p => p.id)) + 1 : 1,
    ...petData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.pets.push(newPet);
  writeJSON('pets.json', data);
  return newPet;
}

function updatePet(id, updates) {
  const data = readJSON('pets.json');
  if (!data) return null;
  
  const petIndex = data.pets.findIndex(p => p.id === parseInt(id));
  if (petIndex === -1) return null;
  
  data.pets[petIndex] = {
    ...data.pets[petIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  writeJSON('pets.json', data);
  return data.pets[petIndex];
}

function deletePet(id) {
  const data = readJSON('pets.json');
  if (!data) return false;
  
  const initialLength = data.pets.length;
  data.pets = data.pets.filter(p => p.id !== parseInt(id));
  
  if (data.pets.length < initialLength) {
    writeJSON('pets.json', data);
    return true;
  }
  return false;
}

// ===== INVENTORIES =====
function getInventories(userId = null) {
  const data = readJSON('inventories.json');
  if (!data) return [];
  
  const inventories = data.inventories;
  return userId ? inventories.filter(i => i.userId === parseInt(userId)) : inventories;
}

function getInventoryById(id) {
  const inventories = getInventories();
  return inventories.find(i => i.id === parseInt(id));
}

function createInventory(inventoryData) {
  const data = readJSON('inventories.json');
  if (!data) return null;
  
  const newInventory = {
    id: data.inventories.length > 0 ? Math.max(...data.inventories.map(i => i.id)) + 1 : 1,
    ...inventoryData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.inventories.push(newInventory);
  writeJSON('inventories.json', data);
  return newInventory;
}

function updateInventory(id, updates) {
  const data = readJSON('inventories.json');
  if (!data) return null;
  
  const inventoryIndex = data.inventories.findIndex(i => i.id === parseInt(id));
  if (inventoryIndex === -1) return null;
  
  data.inventories[inventoryIndex] = {
    ...data.inventories[inventoryIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  writeJSON('inventories.json', data);
  return data.inventories[inventoryIndex];
}

function deleteInventory(id) {
  const data = readJSON('inventories.json');
  if (!data) return false;
  
  const initialLength = data.inventories.length;
  data.inventories = data.inventories.filter(i => i.id !== parseInt(id));
  
  if (data.inventories.length < initialLength) {
    writeJSON('inventories.json', data);
    return true;
  }
  return false;
}

// ===== GARTENS =====
function getGartens(userId = null) {
  const data = readJSON('gartens.json');
  if (!data) return [];
  
  const gartens = data.gartens;
  return userId ? gartens.filter(g => g.userId === parseInt(userId)) : gartens;
}

function getGardenById(id) {
  const gartens = getGartens();
  return gartens.find(g => g.id === parseInt(id));
}

function createGarden(gardenData) {
  const data = readJSON('gartens.json');
  if (!data) return null;
  
  const newGarden = {
    id: data.gartens.length > 0 ? Math.max(...data.gartens.map(g => g.id)) + 1 : 1,
    ...gardenData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.gartens.push(newGarden);
  writeJSON('gartens.json', data);
  return newGarden;
}

function updateGarden(id, updates) {
  const data = readJSON('gartens.json');
  if (!data) return null;
  
  const gardenIndex = data.gartens.findIndex(g => g.id === parseInt(id));
  if (gardenIndex === -1) return null;
  
  data.gartens[gardenIndex] = {
    ...data.gartens[gardenIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  writeJSON('gartens.json', data);
  return data.gartens[gardenIndex];
}

function deleteGarden(id) {
  const data = readJSON('gartens.json');
  if (!data) return false;
  
  const initialLength = data.gartens.length;
  data.gartens = data.gartens.filter(g => g.id !== parseInt(id));
  
  if (data.gartens.length < initialLength) {
    writeJSON('gartens.json', data);
    return true;
  }
  return false;
}

// ===== FRIENDS =====
function getFriends(userId = null) {
  const data = readJSON('friends.json');
  if (!data) return [];
  
  const friends = data.friends;
  return userId ? friends.filter(f => f.userId === parseInt(userId) || f.friendId === parseInt(userId)) : friends;
}

function getFriendById(id) {
  const friends = getFriends();
  return friends.find(f => f.id === parseInt(id));
}

function createFriend(friendData) {
  const data = readJSON('friends.json');
  if (!data) return null;
  
  const newFriend = {
    id: data.friends.length > 0 ? Math.max(...data.friends.map(f => f.id)) + 1 : 1,
    ...friendData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.friends.push(newFriend);
  writeJSON('friends.json', data);
  return newFriend;
}

function updateFriend(id, updates) {
  const data = readJSON('friends.json');
  if (!data) return null;
  
  const friendIndex = data.friends.findIndex(f => f.id === parseInt(id));
  if (friendIndex === -1) return null;
  
  data.friends[friendIndex] = {
    ...data.friends[friendIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  writeJSON('friends.json', data);
  return data.friends[friendIndex];
}

function deleteFriend(id) {
  const data = readJSON('friends.json');
  if (!data) return false;
  
  const initialLength = data.friends.length;
  data.friends = data.friends.filter(f => f.id !== parseInt(id));
  
  if (data.friends.length < initialLength) {
    writeJSON('friends.json', data);
    return true;
  }
  return false;
}

// ===== FRIEND REQUESTS =====
function getFriendRequests(userId = null) {
  const data = readJSON('friendrequests.json');
  if (!data) return [];
  
  const requests = data.friendrequests;
  return userId ? requests.filter(r => r.senderId === parseInt(userId) || r.receiverId === parseInt(userId)) : requests;
}

function getFriendRequestById(id) {
  const requests = getFriendRequests();
  return requests.find(r => r.id === parseInt(id));
}

function createFriendRequest(requestData) {
  const data = readJSON('friendrequests.json');
  if (!data) return null;
  
  const newRequest = {
    id: data.friendrequests.length > 0 ? Math.max(...data.friendrequests.map(r => r.id)) + 1 : 1,
    ...requestData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.friendrequests.push(newRequest);
  writeJSON('friendrequests.json', data);
  return newRequest;
}

function updateFriendRequest(id, updates) {
  const data = readJSON('friendrequests.json');
  if (!data) return null;
  
  const requestIndex = data.friendrequests.findIndex(r => r.id === parseInt(id));
  if (requestIndex === -1) return null;
  
  data.friendrequests[requestIndex] = {
    ...data.friendrequests[requestIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  writeJSON('friendrequests.json', data);
  return data.friendrequests[requestIndex];
}

function deleteFriendRequest(id) {
  const data = readJSON('friendrequests.json');
  if (!data) return false;
  
  const initialLength = data.friendrequests.length;
  data.friendrequests = data.friendrequests.filter(r => r.id !== parseInt(id));
  
  if (data.friendrequests.length < initialLength) {
    writeJSON('friendrequests.json', data);
    return true;
  }
  return false;
}

// ===== ANIMALS =====
function getAnimals() {
  const data = readJSON('animals.json');
  return data ? data.animals : [];
}

function getAnimalById(id) {
  const animals = getAnimals();
  return animals.find(a => a.id === parseInt(id));
}

function createAnimal(animalData) {
  const data = readJSON('animals.json');
  if (!data) return null;
  
  const newAnimal = {
    id: data.animals.length > 0 ? Math.max(...data.animals.map(a => a.id)) + 1 : 1,
    ...animalData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.animals.push(newAnimal);
  writeJSON('animals.json', data);
  return newAnimal;
}

function updateAnimal(id, updates) {
  const data = readJSON('animals.json');
  if (!data) return null;
  
  const animalIndex = data.animals.findIndex(a => a.id === parseInt(id));
  if (animalIndex === -1) return null;
  
  data.animals[animalIndex] = {
    ...data.animals[animalIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  writeJSON('animals.json', data);
  return data.animals[animalIndex];
}

function deleteAnimal(id) {
  const data = readJSON('animals.json');
  if (!data) return false;
  
  const initialLength = data.animals.length;
  data.animals = data.animals.filter(a => a.id !== parseInt(id));
  
  if (data.animals.length < initialLength) {
    writeJSON('animals.json', data);
    return true;
  }
  return false;
}

module.exports = {
  // Users
  getUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  // Eggs
  getEggs,
  getEggById,
  createEgg,
  updateEgg,
  deleteEgg,
  // Shop Items
  getShopItems,
  getShopItemById,
  createShopItem,
  updateShopItem,
  deleteShopItem,
  // Tasks
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  // Pets
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  // Inventories
  getInventories,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
  // Gardens
  getGartens,
  getGardenById,
  createGarden,
  updateGarden,
  deleteGarden,
  // Friends
  getFriends,
  getFriendById,
  createFriend,
  updateFriend,
  deleteFriend,
  // Friend Requests
  getFriendRequests,
  getFriendRequestById,
  createFriendRequest,
  updateFriendRequest,
  deleteFriendRequest,
  // Animals
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  // Utilities
  generateId
};
