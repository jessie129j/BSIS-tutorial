// controllers > users.js
const User = require("../models/User");

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
    return res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.login = async (req, res) => {
  try {
    // userId가 일치하는 User 도큐먼트를 찾는다.
    const user = await User.findOne({ userId: req.body.userId });
    if (!user)
      return res.status(404).send({ message: "존재하지 않는 ID입니다." });

    // 비밀번호 비교
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch)
        return res
          .status(409)
          .send({ message: "비밀번호가 일치하지 않습니다." });

      // 세션에 저장하고 반환
      req.session.user = user._id; //user는 user._id를 의미한다
      req.session.userId = user.userId;
      req.session.isLoggedIn = true;
      req.session.save(() => {
        return res.status(200).send(user);
      });
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.logout = async (req, res) => {
  try {
    // 세션 삭제하고 반환
    console.log(`debug: user(${req.user._id}) is trying to logout`);
    req.session.destroy((err) => {
      if (err) throw err;
      return res.clearCookie("connect.sid").status(200).send();
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.current = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};
