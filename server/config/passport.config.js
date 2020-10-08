const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const db = require("./db.js");
const bcrypt = require("bcryptjs");

function initialize(passport, secret) {
  const authenticateUser = new LocalStrategy((username, password, done) => {
    db("users")
      .where({ username: username })
      .first()
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      })
      .catch((err) => {
        return done(err);
      });
  });

  passport.use(authenticateUser);

  const authenticateToken = new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    },
    (jwt_payload, done) => {
      db("users")
        .where({ username: jwt_payload.username })
        .first()
        .then((user) => {
          if (!user) return done(null, false, { message: "Token not matched" });
          done(null, user);
        });
    }
  );

  passport.use(authenticateToken);

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((id, done) => {
    db("users")
      .where({ username: id })
      .first()
      .then((user) => {
        done(null, { username: user.username, role: user.role });
      })
      .catch((err) => {
        done(err, null);
      });
  });
}

module.exports = initialize;
