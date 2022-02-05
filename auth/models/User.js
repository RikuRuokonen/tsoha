const Sequelize = require("Sequelize");
const Drink = require("../../drink/models/Drink");
const Review = require("../../drink/models/Review");
const sequelize = require("../../sequelize");

const User = sequelize.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { include: [Drink] }
);

User.hasMany(Drink, {
  foreignKey: "userId",
});
User.hasMany(Review, {
  foreignKey: "userId",
});

Drink.belongsTo(User);
Review.belongsTo(User)

module.exports = User;
