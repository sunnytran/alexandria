const passport = require("passport");
const jwt = require("jsonwebtoken");

const handleLogin = (secret) => (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("Incorrect username/password");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;

        const token = jwt.sign(user, secret);
        res.json({ token: token });
      });
    }
  })(req, res, next);
};

const handleUserGet = () => (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, token) => {
    if (req.headers["authorization"] === "Bearer null") res.json(null);
    else if (req.headers["authorization"] === "Bearer guest")
      res.json({ username: "guest", role: "guest" });
    else res.json(req.user);
  })(req, res, next);
};

module.exports = {
  handleLogin: handleLogin,
  handleUserGet: handleUserGet,
};
