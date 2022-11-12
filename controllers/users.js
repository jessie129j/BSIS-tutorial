// controllers > users.js
const User = require("../models/User");
const passport = require("passport");

module.exports.register = async (req, res) => {
  try {
    // 유효성 검사
    if (!req.body.userId)
      return res.status(400).send({ message: "userId가 필요합니다." });
    if (!req.body.password)
      return res.status(400).send({ message: "password가 필요합니다." });

    // 중복 아이디 검사
    const exUser = await User.findOne({ userId: req.body.userId });
    if (exUser)
      return res.status(409).send({ message: "이미 사용 중인 아이디 입니다." });

    // 도큐먼트 생성
    const user = new User({
      userId: req.body.userId,
      password: req.body.password,
      info: req.body.info,
    });

    // 도큐먼트 저장
    await user.save();
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.login = async (req, res) => {
  passport.authenticate("local", (authError, user) => {
    try {
      if (authError) throw authError;
      return req.login(user, (loginError) => {
        if (loginError) throw loginError;

        /* set maxAge as 1 year if auto login is requested */
        if (req.body.persist === "true") {
          req.session.cookie["maxAge"] = 365 * 24 * 60 * 60 * 1000; //1 year
        }
        return res.status(200).send(user);
      });
    } catch (err) {
      return res.status(err.status || 500).send({ message: err.message });
    }
  })(req, res);
};

module.exports.logout = async (req, res) => {
  req.logout((err) => {
    try {
      if (err) throw err;
      req.session.destroy(); // 세션 객체를 삭제한다.
      res.clearCookie("connect.sid"); // 클라이언트에서 sid 쿠키를 삭제하도록 설정한다.
      return res.status(200).send();
    } catch (err) {
      return res.status(err.status || 500).send({ message: err.message });
    }
  });
};

module.exports.current = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};
