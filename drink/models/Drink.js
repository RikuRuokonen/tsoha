const Sequelize = require('Sequelize');
const sequelize = require('../../sequelize');
const Ingredient = require('./Ingredient');

const Drink = sequelize.define("drink",{
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
  },
);

Drink.belongsToMany(Ingredient,{through:"Drink_Ingredients", as:"ingredients", foreignKey: "ingredient_id",});
Ingredient.belongsToMany(Drink,{through:"Drink_Ingredients", as: "drinks", foreignKey: "drink_id",});

module.exports = Drink;
