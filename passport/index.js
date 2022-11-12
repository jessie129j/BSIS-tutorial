// passport > index.js
const passport = require("passport");
const local = require("./localStrategy");
const User = require("../models/User");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, { _id: user._id });
  });

  passport.deserializeUser((user, done) => {
    User.findById(user._id, (err, user) => {
      if (err) done(err);
      done(null, user);
    });
  });

  local();
};
