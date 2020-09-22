const Sequelize = require('Sequelize')
const sequelize = require('../../sequelize')

  const User = sequelize.define("user",{
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salt: {
      type: Sequelize.STRING,
      allowNull: false,
      }
    },
   )

module.exports = User;


