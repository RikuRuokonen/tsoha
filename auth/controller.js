const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const User = require('./models/User')
const passport = require('passport');
const ensureAuthenticated = require('../utils')

const { getAllUsersFromDB, getUserByIdFromDB } = require('./service')

const login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return res.sendStatus(401); }

      if(user) {
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          res.status(200).send({
            message: "login successful",
            user: user,
          });
        });
      }
    })(req, res, next);
};

const logout = async(req, res) => {
  req.logout();
  res.status(200).send({
    message: "Logout successful"
  })
}

const createUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password ) {
    res.status(500).send({
      message: 'error, fill all the fields',
    })
    res.redirect('signup');
  }

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const newUser = {
    username: username,
    salt: salt,
    password: hashedPassword
  };

  User.create(newUser).then(function() {
    res.status(200).send({
      status: "success!",
    })
  }).catch(function(error) {
    res.status(500).send({
      message: error,
    })
    res.redirect('/signup')
  })
}

const getAllUsers = async (req, res) => {
  //TODO: Parse salt etc away from response :DDD
  getAllUsersFromDB().then(users => res.json(users))
};

const getUserById = async(req, res) => {
  const { body } = req;
  const { id } = body;
  if(_.isNil(id)) {
    res.status(400).send({
      message: "Id missing from request"
    })
  }
  getUserByIdFromDB(id).then(user => res.json(user))
};

const router = express.Router();
router.use("/login", login);
router.use("/logout", ensureAuthenticated, logout);
router.use('/register', createUser);
router.use('/getAllUsers', ensureAuthenticated, getAllUsers);
router.use('/getUserById', ensureAuthenticated, getUserById);

module.exports = router;