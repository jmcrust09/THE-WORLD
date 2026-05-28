const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://jmcrust09:FUjvk9ssAzsShrVetRX1jJtMzXDrTADh@dpg-d8b1edq8qa3s73dfqfj0-a/theinferno7',
  ssl: { rejectUnauthorized: false }
});

const sqlFiles = [
  'add_eggs_columns.sql',
  'add_tasks_columns.sql',
  'add_shopitems_columns.sql',
  'create_animals_table.sql',
  'eggs_full.sql',
  'shopitems_full.sql',
  'users_full.sql',
  'tasks_full.sql',
  'pets_full.sql',
  'inventories_full.sql',
  'gardens_full.sql'
];

async function executeSQLFile(filename) {
  const filePath = path.join(__dirname, filename);
  const sql = fs.readFileSync(filePath, 'utf8');
  
  try {
    await pool.query(sql);
    console.log(`✅ Ejecutado: ${filename}`);
  } catch (error) {
    console.error(`❌ Error en ${filename}:`, error.message);
    throw error;
  }
}

async function updateDatabase() {
  try {
    console.log('🔄 Conectando a la base de datos...');
    await pool.connect();
    console.log('✅ Conectado');
    
    console.log('🔄 Ejecutando archivos SQL...');
    for (const file of sqlFiles) {
      await executeSQLFile(file);
    }
    
    console.log('✅ Base de datos actualizada correctamente');
  } catch (error) {
    console.error('❌ Error actualizando base de datos:', error.message);
  } finally {
    await pool.end();
  }
}

updateDatabase();
