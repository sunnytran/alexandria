const passport = require("passport");

const handleLogin = () => (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("Incorrect username/password");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Authenticated sucessfully");
      });
    }
  })(req, res, next);
};

const handleUserGet = () => (req, res, next) => {
  res.send(req.user);
};

module.exports = {
  handleLogin: handleLogin,
  handleUserGet: handleUserGet,
};
