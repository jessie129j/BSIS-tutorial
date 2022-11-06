// index.js
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

const User = require("./models/User");

// Create user
app.post("/users", (req, res) => {
  const { userId, password, info } = req.body;

  User.push({ userId, password, info });

  // 위 두 줄은 아래 네 줄의 코드와 동일하다.
  // User.push({
  //	userId: req.body.userId,
  //    password: req.body.password,
  //    info: req.body.info
  // })
  return res.send(User);
});

// Read users
app.get("/users/:userId?", (req, res) => {
  const { userId } = req.params;

  // req.params.userId가 있을 시 해당 유저 정보를 리턴한다.
  if (userId) {
    for (let i = 0; i < User.length; i++) {
      if (User[i].userId == userId) {
        return res.send(User[i]);
      }
    }
    // 해당 유저 정보가 존재하지 않으면 404를 리턴한다.
    return res.status(404).send("user not found");
  }
  // req.params.userId가 없으면 모든 유저 정보를 리턴한다.
  return res.send(User);
});

// Delete user
app.delete("/users/:userId", (req, res) => {
  for (let i = 0; i < User.length; i++) {
    // userId를 가진 유저 정보를 찾는다.
    if (User[i].userId == req.params.userId) {
      // 유저 정보를 삭제하고 남은 유저들의 정보를 리턴한다.
      User.splice(i, 1);
      return res.send(User);
    }
  }
  // userId를 가진 유저가 없으면 404를 리턴한다.
  return res.status(404).send("user not found");
});

app.listen(5000, function () {
  console.log("Server listening on port 5000");
});
