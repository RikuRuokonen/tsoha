const Drink = require("./models/Drink")
const Ingredient = require("./models/Ingredient")

const createDrinkToDB = async (newDrink) => {
  return Drink.create(newDrink);
};

const createIngredientToDB = async (ingredient) => {
 return Ingredient.create(ingredient);
};

const checkForNewIngredients = () => {
  console.log("TODO")
};

const getDrinkByNameFromDB = async(name) => {

  return await Drink.findOne({
    where: { name: name }
  });
}

const drinkExists = async(name) => {
  const drink = await getDrinkByNameFromDB(name);
  console.log(drink)
  return !drink;
};

const getAllDrinksFromDB = async() => {
  return await Drink.findAll({
    include: [
      {
        model: Ingredient,
        as: "ingredients",
      },
    ],
  });
};

module.exports = {createDrinkToDB, createIngredientToDB, checkForNewIngredients, drinkExists, getAllDrinksFromDB, getDrinkByNameFromDB};