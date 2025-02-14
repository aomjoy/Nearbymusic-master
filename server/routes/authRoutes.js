const express = require('express');
const router = express.Router();
const { loginMusician, loginRestaurant } = require('../controllers/authController');

// Login routes
router.post('/musicians/login', loginMusician);
router.post('/restaurants/login', loginRestaurant);

module.exports = router;