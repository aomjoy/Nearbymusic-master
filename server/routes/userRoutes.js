const express = require("express");
const { signupMusician } = require("../controllers/musicianControllers");
const { signupRestaurant } = require("../controllers/restaurantControllers");

const router = express.Router();

// Musician Signup Route
router.post("/musicians/signup", signupMusician);

// Restaurant Signup Route
router.post("/restaurants/signup", signupRestaurant);

module.exports = router;
