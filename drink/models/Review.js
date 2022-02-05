const Sequelize = require("Sequelize");
const sequelize = require("../../sequelize");
const User = require("./../../auth/models/User");
const Drink = require("./Drink");

const Review = sequelize.define("Review", {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


module.exports = Review;
