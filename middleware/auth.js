const User = require("../models/User");

exports.isLoggedIn = (req, res, next) => {
  const token = req.cookies.x_auth;
  User.decodeToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(403).send("you are not logged in");
    req.user = user;
    next();
  });
};

exports.isNotLoggedIn = (req, res, next) => {
  const token = req.cookies.x_auth;
  User.decodeToken(token, (err, user) => {
    if (err) throw err;
    if (user) return res.status(403).send("you are already logged in");
    next();
  });
};
