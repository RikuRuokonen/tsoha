const Sequelize = require('sequelize')
const sequelize = require('./sequelize');
const User = require("./auth/models/User.js");
const Drink = require("./drink/models/Drink.js");
const Review = require("./drink/models/Review.js");

const sequelizeInstance = new Sequelize('tsoha', 'postgres', process.env.DB_PASS, {
  dialect: "postgres",
  port:5432,
});



const initDB = () => {
  sequelizeInstance.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    syncTables();
  })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

const syncTables = async () => {
  /*User.sync();
  Drink.sync();
  Ingredient.sync()*/
  await sequelize.sync()
}

module.exports = initDB;