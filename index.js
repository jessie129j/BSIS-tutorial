// index.js
require("dotenv").config();
console.log(`debug: process.env['DB_URL'] is ${process.env["DB_URL"]}\n`);

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
var session = require("express-session");
const FileStore = require("session-file-store")(session);

mongoose
  .connect(process.env["DB_URL"])
  .then(() => console.log("MongoDB connection is made."))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    resave: false, // req마다 session 새로 저장하지 않음
    saveUninitialized: false, // uninitialized session 저장하는 것을 막음
    secret: process.env["SESSION_KEY"],
    cookie: {
      httpOnly: true, // 브라우저에서 쿠키값에 대한 접근을 하지 못하게 막는다.
      secure: false, // HTTPS 통신 외에서는 쿠키를 전달하지 않는다.
    },
    store: new FileStore({
      path: "./sessions",
      ttl: 24 * 60 * 60, // 세션은 마지막 요청 시간으로부터 하루간 유효하다
      reapInterval: 12 * 60 * 60, // 12시간 간격으로 만료된 세션을 삭제한다
    }),
  })
);

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(5000, function () {
  console.log("Server listening on port 5000");
});
