const Drink = require("./models/Drink");
const Review = require("./models/Review");

const createDrinkToDB = async (newDrink) => {
  return Drink.create(newDrink);
};


const createReviewToDB = async (review) => {
  return Review.create(review)
}

const getDrinkByNameFromDB = async(name) => {
  return await Drink.findOne({
    where: { name: name }
  });
}

const getDrinksByUserIdFromDB = async(userId) => {
  return await Drink.findAll({
    where: {
      userId: userId,
    }
  })
}

const drinkExists = async(name) => {
  const drink = await getDrinkByNameFromDB(name);
  console.log("DRINK!", drink);
  return drink === null ? false : true;
};

const getAllDrinksFromDB = async() => {
  return await Drink.findAll();
};

module.exports = {
  createDrinkToDB, 
  drinkExists, 
  getAllDrinksFromDB, 
  getDrinkByNameFromDB,
  getDrinksByUserIdFromDB,
  createReviewToDB,
};