// routes > users.js
const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

// `POSTS /users` routes to users.register
router.post("/", users.register);

// `POST /users/login` routes to users.login
router.post("/login", users.login);

// `GET /users/logout` routes to users.logout
router.get("/logout", users.logout);

module.exports = router;
