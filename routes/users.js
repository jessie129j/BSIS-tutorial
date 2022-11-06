// routes > users.js
const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const { isLoggedIn, isNotLoggedIn } = require("../middleware/auth");

// `POSTS /users` routes to users.register
router.post("/", isNotLoggedIn, users.register);

// `POST /users/login` routes to users.login
router.post("/login", isNotLoggedIn, users.login);

// `GET /users/logout` routes to users.logout
router.get("/logout", isLoggedIn, users.logout);

module.exports = router;
