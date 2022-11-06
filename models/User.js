// models > User.js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    unique: true, //userId는 중복을 허용하지 않는다.
    require: true, // user 도큐먼트에 userId는 반드시 필요하다.
  },
  password: {
    type: String,
    require: true, // user 도큐먼트에 userId는 반드시 필요하다.
  },
  info: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
