const Sequelize = require('Sequelize');
const sequelize = require('../../sequelize');
const User = require("./../../auth/models/User")

const Drink = sequelize.define("drink",{
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    recipe: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false
    },
  },
);

Drink.associate = () => {
  Drink.hasMany(Review, {
    foreignKey: 'drinkId',
    as: 'reviews'
  });
};


module.exports = Drink;
