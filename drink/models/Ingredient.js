const Sequelize = require('Sequelize')
const sequelize = require('../../sequelize')

const Ingredient = sequelize.define("ingredient",{
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    ingredientClass: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false
    }
  },
)

module.exports = Ingredient;
