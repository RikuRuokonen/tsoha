const sequelize = require('./sequelize');
const User = require("./auth/models/User.js");
const Drink = require("./drink/models/Drink.js");
const Review = require("./drink/models/Review.js");

const initDB = () => {
  sequelize.authenticate().then(() => {
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
  await sequelize.sync({ force: true });
}

module.exports = initDB;