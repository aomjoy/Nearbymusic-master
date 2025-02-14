const bcrypt = require("bcryptjs");
const Restaurant = require("../models/restaurantModel");
const Musician = require("../models/musicianModel"); // Import Musician model
const HttpError = require("../models/errorModel");

// Restaurant signup
const signupRestaurant = async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Check if email exists in Musician collection
        const emailExistsMusician = await Musician.findOne({ email: email.toLowerCase() });
        if (emailExistsMusician) {
            return next(new HttpError("Email already exists in musician account.", 422));
        }

        // Check if email exists in Restaurant collection
        const emailExistsRestaurant = await Restaurant.findOne({ email: email.toLowerCase() });
        if (emailExistsRestaurant) {
            return next(new HttpError("Email already exists in restaurant account.", 422));
        }

        if (!username || !email || !password || !confirmPassword) {
            return next(new HttpError("Fill in all fields", 422));
        }

        if (password.length < 6) {
            return next(new HttpError("Password should be at least 6 characters.", 422));
        }

        if (password !== confirmPassword) {
            return next(new HttpError("Passwords do not match!", 422));
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newRestaurant = await Restaurant.create({
            username,
            email: email.toLowerCase(),
            password: hashedPass,
        });

        res.status(201).json({ message: `New restaurant ${newRestaurant.email} registered.` });

    } catch (error) {
        return next(new HttpError(error.message || "Restaurant registration failed.", 500));
    }
};

// Restaurant login
const loginRestaurant = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return next(new HttpError("Email and password are required.", 422));
        }

        // Find restaurant by email
        const restaurant = await Restaurant.findOne({ email: email.toLowerCase() });
        if (!restaurant) {
            return next(new HttpError("Invalid email or password.", 401));
        }

        // Compare provided password with hashed password
        const isPasswordValid = await bcrypt.compare(password, restaurant.password);
        if (!isPasswordValid) {
            return next(new HttpError("Invalid email or password.", 401));
        }

        // Return a success message
        res.status(200).json({
            message: `Restaurant ${restaurant.email} logged in successfully.`,
        });

    } catch (error) {
        return next(new HttpError(error.message || "Login failed. Please try again later.", 500));
    }
};

module.exports = { signupRestaurant, loginRestaurant };
