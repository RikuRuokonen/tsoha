require('dotenv').config();

module.exports = {

  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER|| "postgres",
    password: process.env.DB_PASS || "postgres",
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },
};