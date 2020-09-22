const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./auth/models/User')

module.exports = function(app) {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({
        where: {
          'username': username
        }
      }).then(function (user) {
        if (user == null) {
          return done(null, false, { message: 'Incorrect credentials.' })
        }

        const hashedPassword = bcrypt.hashSync(password, user.salt)
        console.log(hashedPassword, user.password)
        if (user.password === hashedPassword) {
          return done(null, user)
        }

        return done(null, false, { message: 'Incorrect credentials.' })
      })
    }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({
      where: {
        'id': id
      }
    }).then(function (user) {
      if (user == null) {
        done(new Error('Wrong user id.'))
      }

      done(null, user)
    })
  })

  app.use(passport.initialize());
  app.use(passport.session());
}