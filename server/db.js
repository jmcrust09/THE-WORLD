const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: process.env.PGSSLMODE === 'require'
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : undefined
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('PostgreSQL conectado y sincronizado.');
  } catch (error) {
    console.error(`Error de conexión PostgreSQL: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
