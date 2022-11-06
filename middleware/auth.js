exports.isLoggedIn = (req, res, next) => {
  if (!req.session.isLoggedIn)
    return res.status(403).send("you are not logged in");
  req.user = { _id: req.session.user, userId: req.session.userId };
  next();
};

exports.isNotLoggedIn = (req, res, next) => {
  if (req.session.isLoggedIn)
    return res.status(403).send("you are already logged in");
  next();
};
