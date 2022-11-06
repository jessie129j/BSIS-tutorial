// controllers > users.js
const User = require("../models/User");

module.exports.create = async (req, res) => {
  try {
    const { userId, password, info } = req.body;

    // 새로운 User 도큐먼트를 생성한다.
    const user = new User({ userId, password, info });

    // 도큐먼트를 저장한다.
    await user.save();

    return res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.find = async (req, res) => {
  try {
    const { userId } = req.params;

    // req.params.userId가 있을 시 해당 유저 정보를 리턴한다.
    if (userId) {
      // userId가 일치하는 User 도큐먼트를 하나 찾는다.
      const user = await User.findOne({ userId });

      // 해당 유저 정보가 존재하지 않으면 404를 리턴한다.
      if (!user) return res.status(404).send("user not found");
      return res.send(user);
    }
    // req.params.userId가 없으면 모든 유저 정보를 리턴한다.
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { userId } = req.params;
    // userId를 가진 유저 정보를 찾는다.
    const user = await User.findOne({ userId });

    // userId를 가진 유저가 없으면 404를 리턴한다.
    if (!user) return res.status(404).send("user not found");

    // 유저 정보를 삭제한다.
    await user.remove();
    return res.send();
  } catch (err) {
    return res.status(500).send(err);
  }
};
