const express = require("express");
const ensureAuthenticated = require("../utils");
const Drink = require("./models/Drink");

const {
  drinkExists,
  createDrinkToDB,
  getAllDrinksFromDB,
  getDrinksByUserIdFromDB,
  createReviewToDB,
  getReviewsByDrinkIdFromDB,
  getReviewsByUserIdFromDB
} = require("./service");

const createDrink = async (req, res) => {
  const { body } = req;
  const { name, recipe, userId } = body;
  const existingDrink = await drinkExists(name);
  if (existingDrink) {
    return res.status(409).send({
      message: "Drink with that name already exists",
    });
  } else {
    const newDrink = {
      name,
      recipe,
      userId,
    };
    createDrinkToDB({
      ...newDrink,
    })
      .then((value) => res.json(value))
      .catch((err) =>
        res.status(500).send({
          message: "Error creating new drink",
          err,
        })
      );
  }
};

const editDrink = (req, res) => {};

const createReview = (req, res) => {
  const { userId, drinkId, content } = req.body;
  const newReview = {
    userId,
    drinkId,
    content,
  };
  createReviewToDB({
    ...newReview,
  })
    .then((value) => res.json(value))
    .catch((err) => {
      res.status(500).send({
        message: "Error creating new review",
        err,
      });
    });
};

const getAll = (req, res) => {
  getAllDrinksFromDB()
    .then((drinks) => res.json(drinks))
    .catch((err) =>
      res.status(500).send({
        message: "Error fetching drinks",
        err,
      })
    );
};

const getDrinksByUserId = (req, res) => {
  getDrinksByUserIdFromDB(req.params.userId)
    .then((drinks) => {
      res.status(200).send(drinks);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
const getReviewsByDrinkId = (req, res) => {
  console.log("DRINK ID: ", req.params.drinkId)
  getReviewsByDrinkIdFromDB(req.params.drinkId)
    .then((drinks) => {
      res.status(200).send(drinks);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
const getReviewsByUserId = (req, res) => {
  console.log(req.session.passport.user, req.params.userId)
  if(Number(req.session.passport.user) === Number(req.params.userId)) {
    getReviewsByUserIdFromDB(req.params.userId)
    .then((drinks) => {
      res.status(200).send(drinks);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  } else {
    res.status(401).send("Unauthorized ID passed with request")
  }
};


const router = express.Router();
router.use("/drinks/create", createDrink);
router.use("/review/create", createReview);
router.use("/drinks/edit", ensureAuthenticated, editDrink);
router.use("/drinks/:userId", ensureAuthenticated, getDrinksByUserId);
router.use("/review/drink/:drinkId", ensureAuthenticated, getReviewsByDrinkId);
router.use("/review/user/:userId", ensureAuthenticated, getReviewsByUserId);
router.use("/drinks", ensureAuthenticated, getAll);

module.exports = router;
