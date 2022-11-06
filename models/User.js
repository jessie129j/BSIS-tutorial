const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretToken = "secretToken"; // 숨겨져야 하는 정보

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

// user document가 저장될 때마다 pre함수가 실행된다.
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 비밀번호가 같은지 검사한다.
userSchema.methods.comparePassword = function (plainPassword, cb) {
  const user = this;
  bcrypt.compare(plainPassword, user.password, function (err, isMatch) {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

// JWT를 생성한다.
userSchema.methods.generateToken = function (cb) {
  const user = this;
  const payload = { _id: user._id, userId: user.userId };
  const token = jwt.sign(payload, secretToken);
  return token;
};

// JWT를 복호화하여 유저 정보를 확인한다.
userSchema.statics.decodeToken = function (token, cb) {
  jwt.verify(token, secretToken, function (err, decoded) {
    cb(null, decoded);
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
