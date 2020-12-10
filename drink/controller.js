const express = require('express');
const ensureAuthenticated = require('../utils')

const {
  checkForNewIngredients,
  drinkExists,
  createDrinkToDB,
  getAllDrinksFromDB,
  createIngredientToDB
} = require("./service")

const createDrink = (req, res) => {
  const { body } = req;
  const { name } = body;
  console.log("Create new drink: ", name)
  if(1 === 2){
    return res.status(404).send({
      message: "Drink already exists",
    })
  } else {
    const newDrink = {
      name,
    };
    createDrinkToDB({
      ...newDrink,
    }).then(value => res.json(value))
      .catch(err => res.status(500).send({
        message: "Error creating new drink",
        err,
      }))
  }
};

const createIngredient = (req, res) => {
  const { body } = req;
  const { name, ingredientClass } = body;
    const newIngredient = {
      name,
      ingredientClass,
    };
    console.log("NEW INGREDIENT: ", newIngredient)
    createIngredientToDB({
      ...newIngredient,
    }).then(value => res.json(value))
      .catch(err => res.status(500).send({
        message: "Error creating new ingredient",
        err,
      }))
};


const editDrink = (req, res) => {

};

const getAll = (req, res) => {
  console.log(getAllDrinksFromDB)
  getAllDrinksFromDB()
    .then(drinks => res.json(drinks))
    .catch(err => res.status(500).send({
      message: "Error fetching drinks",
      err,
    }))

};

const getById = (req, res) => {

};
exports.addIngredientToDrink = (drinkId, ingredientId) => {
  return Drink.findByPk(drinkId)
    .then((tag) => {
      if (!tag) {
        console.log("Tag not found!");
        return null;
      }
      return Drink.findByPk(tutorialId).then((tutorial) => {
        if (!tutorial) {
          console.log("Tutorial not found!");
          return null;
        }

        tag.addTutorial(tutorial);
        console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
        return tag;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};

const router = express.Router();
router.use("/drinks/create", createDrink);
router.use("/ingredients/create", createIngredient);
router.use("/drinks/edit", ensureAuthenticated, editDrink);
router.use('/drinks/', getAll);
router.use('/drinks/:id', ensureAuthenticated, getById);

module.exports = router;