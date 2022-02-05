const User = require("../auth/models/User");
const Drink = require("./models/Drink");
const Review = require("./models/Review");

const createDrinkToDB = async (newDrink) => {
  return Drink.create(newDrink);
};

const createReviewToDB = async (review) => {
  return Review.create(review);
};

const getDrinkByNameFromDB = async (name) => {
  return await Drink.findOne({
    where: { name: name },
  });
};

const getDrinksByUserIdFromDB = async (userId) => {
  return await Drink.findAll({
    where: {
      userId: userId,
    },
  });
};

const drinkExists = async (name) => {
  const drink = await getDrinkByNameFromDB(name);
  return drink === null ? false : true;
};

const getAllDrinksFromDB = async () => {
  return await Drink.findAll({
    include: [
      { model: Review, as: "reviews" },
      { model: User, attributes: ["username"] },
    ],
  });
};

const getReviewsByDrinkIdFromDB = async (drinkId) => {
  return await Review.findAll({
    where: {
      drinkId: drinkId,
    },
    include: [
      { model: User, attributes: ["username"] },
    ],
  });
};
const getReviewsByUserIdFromDB = async (userId) => {
  return await Review.findAll({
    where: {
      userId: userId,
    },
  });
};

module.exports = {
  createDrinkToDB,
  drinkExists,
  getAllDrinksFromDB,
  getDrinkByNameFromDB,
  getDrinksByUserIdFromDB,
  createReviewToDB,
  getReviewsByUserIdFromDB,
  getReviewsByDrinkIdFromDB
};
