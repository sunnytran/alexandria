const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
b 
// const init = require('./passport');
const db = require("./db.js");

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    db("users")
      .where({ username })
      .first()
      .then((user) => {
        if (!user) return done(null, false);
        if (!authHelpers.comparePass(password, user.password)) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      })
      .catch((err) => {
        return done(err);
      });
  })
);

function initialize(passport) {
  const authenticateUser = (username, password, done) => {
    // const user = getUserByEmail(email)
    // if (!user) {
    // 	return done(null, false, { message: 'no user with that email' })
    // }
  };

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
