const bcrypt = require('bcryptjs');
const Musician = require('../models/musicianModel');
const Restaurant = require('../models/restaurantModel');

const loginMusician = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if musician exists
    const musician = await Musician.findOne({ email });
    if (!musician) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, musician.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Don't send password in response
    const musicianData = musician.toObject();
    delete musicianData.password;

    res.status(200).json({
      success: true,
      user: musicianData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginRestaurant = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if restaurant exists
    const restaurant = await Restaurant.findOne({ email });
    if (!restaurant) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, restaurant.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Don't send password in response
    const restaurantData = restaurant.toObject();
    delete restaurantData.password;

    res.status(200).json({
      success: true,
      user: restaurantData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  loginMusician,
  loginRestaurant
};