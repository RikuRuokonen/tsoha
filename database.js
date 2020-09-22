const sequelize = require('./sequelize');
const User = require("./auth/models/User.js");

const initDB = () => {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    syncTables();
  })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

const syncTables = () => {
  User.sync()
}

module.exports = initDB;