const Sequelize = require('Sequelize');
const Drink = require('../../drink/models/Drink');
const Review = require('../../drink/models/Review');
const sequelize = require('../../sequelize');

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
      },
    }, { include: [ Drink ]
    }
   )

   User.associate = () => {
    User.hasMany(Drink, {
      foreignKey: 'userId',
      as: 'drinks'
    });
    User.hasMany(Review, {
      foreignKey: 'userId',
      as: 'reviews'
    });
  };

module.exports = User;


