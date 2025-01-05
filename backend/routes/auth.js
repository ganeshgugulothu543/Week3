const express = require("express");
const { register, login } = require("../controllers/authController");
const validatePassword = require("../middleware/validatePassword");

const router = express.Router();

// Register route
router.post("/register", validatePassword, register);

// Login route
router.post("/login", login);

module.exports = router;