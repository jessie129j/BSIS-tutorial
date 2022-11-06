// routes>users.js
const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

// Read users
router.get("/:userId?", users.find);

// Create user
router.post("/", users.create);

// Delete user
router.delete("/:userId", users.remove);

module.exports = router;
