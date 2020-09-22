const Sequelize = require('Sequelize')
const sequelize = require('../../sequelize')

const Drink = sequelize.define("drink",{
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    rating: {
      type: Sequelize.NUMBER,
      allowNull: false
    }
  },
)

module.exports = Drink;
