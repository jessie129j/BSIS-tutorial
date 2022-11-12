// passport > localStrategy.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userId",
        passwordField: "password",
      },
      async (userId, password, done) => {
        try {
          const user = await User.findOne({ userId });

          // userId를 가진 유저가 없으면
          if (!user) {
            const err = new Error("존재하지 않는 ID입니다.");
            err.status = 404;
            return done(err, null);
          }

          // password가 틀리면
          user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (!isMatch) {
              const err = new Error("비밀번호가 일치하지 않습니다.");
              err.status = 409;
              return done(err, null);
            }

            // 인증 성공
            done(null, user);
          });
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
