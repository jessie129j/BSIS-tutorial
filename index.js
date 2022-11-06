// index.js
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const url = "mongodb://localhost:27017/BSIS";

mongoose
  .connect(url)
  .then(() => console.log("MongoDB connection is made."))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(5000, function () {
  console.log("Server listening on port 5000");
});
