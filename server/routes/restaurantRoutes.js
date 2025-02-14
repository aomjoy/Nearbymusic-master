const express = require("express");
const { signupRestaurant, loginRestaurant } = require("../controllers/restaurantControllers"); // Check if this is correct

const router = express.Router();

// Make sure signupRestaurant is properly defined in restaurantControllers.js
router.post("/signup", signupRestaurant);
router.post('/login', loginRestaurant);

module.exports = router;
