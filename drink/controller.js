const express = require('express');
const ensureAuthenticated = require('../utils');
const Drink = require('./models/Drink');

const {
  drinkExists,
  createDrinkToDB,
  getAllDrinksFromDB,
  getDrinksByUserIdFromDB,
  createReviewToDB,
} = require("./service")

const createDrink = async (req, res) => {
  const { body } = req;
  const { name, recipe, userId } = body;
  console.log("Create new drink: ", name)
  const existingDrink = await drinkExists(name);
  if(existingDrink){
    return res.status(409).send({
      message: "Drink with that name already exists",
    })
  } else {
    const newDrink = {
      name,
      recipe,
      userId
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


const editDrink = (req, res) => {
};

const createReview = (req, res) => {
  const { userId, drinkId, content } = req.body;
  const newReview = {
    userId,
    drinkId,
    content,
  }
  console.log(newReview)
  createReviewToDB({ 
    ...newReview
  }).then(value => res.json(value))
  .catch(err => {
    console.log("RRlog review errro: ", err)
    res.status(500).send({
      message: "Error creating new review",
      err,
    })
    
  })
}

const getAll = (req, res) => {
  console.log(getAllDrinksFromDB)
  getAllDrinksFromDB()
    .then(drinks => res.json(drinks))
    .catch(err => res.status(500).send({
      message: "Error fetching drinks",
      err,
    }))
};

const getByUserId = (req, res) => {
  getDrinksByUserIdFromDB(req.params.userId).then((drinks) => {
    res.status(200).send(drinks)
  }).catch((err) => {
    res.status(500).send(err)
  })
};

const router = express.Router();
router.use("/drinks/create", createDrink);
router.use("/review/create", createReview);
router.use("/drinks/edit", ensureAuthenticated, editDrink);
router.use('/drinks/:userId', ensureAuthenticated, getByUserId);
router.use('/drinks', getAll);

module.exports = router;