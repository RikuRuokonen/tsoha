const Sequelize = require("Sequelize");
const sequelize = require("../../sequelize");
const User = require("./../../auth/models/User");
const Review = require("./Review");

const Drink = sequelize.define("drink", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  recipe: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
});

Drink.hasMany(Review, {
  foreignKey: "drinkId",
  as: "reviews",
});

/* Review.belongsTo(Drink, {
  as: "arviot",
}); */

module.exports = Drink;
