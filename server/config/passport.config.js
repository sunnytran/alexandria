const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("./db.js");
const bcrypt = require("bcrypt");

function initialize(passport) {
  const authenticateUser = (username, password, done) => {
    console.log("IN AUTH " + username + " " + password);
    db("users")
      .where({ username })
      .first()
      .then((user) => {
        if (!user) return done(null, false, { message: "Incorrect username" });
        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      })
      .catch((err) => {
        return done(err);
      });
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "req.body.username",
        passwordField: "req.body.password",
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    knex("users")
      .where({ id })
      .first()
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
}

module.exports = initialize;
