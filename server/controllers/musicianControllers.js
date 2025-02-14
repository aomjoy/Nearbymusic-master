const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Musician = require("../models/musicianModel");
const Restaurant = require("../models/restaurantModel"); // Assuming you have a restaurant model
const HttpError = require("../models/errorModel");

const signupMusician = async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword, genres, instruments, provinces } = req.body;

        // Basic validation
        if (!username || !email || !password || !confirmPassword) {
            return next(new HttpError("Fill in all fields", 422));
        }

        // Validate selections
        if (!genres || genres.length === 0) {
            return next(new HttpError("Please select at least one genre", 422));
        }

        if (!instruments || instruments.length === 0) {
            return next(new HttpError("Please select at least one instrument", 422));
        }

        if (!provinces || provinces.length === 0) {
            return next(new HttpError("Please select at least one location", 422));
        }

        const newEmail = email.toLowerCase();

        // Check if email exists in Musician collection
        const emailExistsMusician = await Musician.findOne({ email: newEmail });
        if (emailExistsMusician) {
            return next(new HttpError("Email already exists in musician account.", 422));
        }

        // Check if email exists in Restaurant collection
        const emailExistsRestaurant = await Restaurant.findOne({ email: newEmail });
        if (emailExistsRestaurant) {
            return next(new HttpError("Email already exists in restaurant account.", 422));
        }

        if (password.length < 6) {
            return next(new HttpError("Password should be at least 6 characters.", 422));
        }

        if (password !== confirmPassword) {
            return next(new HttpError("Passwords do not match!", 422));
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // Create musician with additional fields
        const newMusician = await Musician.create({
            username,
            email: newEmail,
            password: hashedPass,
            genres,
            instruments,
            provinces
        });

        res.status(201).json({ 
            message: `New musician ${newMusician.email} registered.`,
            genres: newMusician.genres,
            instruments: newMusician.instruments,
            provinces: newMusician.provinces
        });

    } catch (error) {
        console.error("Error signing up musician:", error);
        return next(new HttpError("Something went wrong. Please try again.", 500));
    }
};
const loginMusician = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return next(new HttpError("Please provide email and password", 422));
        }

        const newEmail = email.toLowerCase();

        // Find the musician by email
        const musician = await Musician.findOne({ email: newEmail });
        if (!musician) {
            return next(new HttpError("Invalid credentials", 401));
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, musician.password);
        if (!isPasswordValid) {
            return next(new HttpError("Invalid credentials", 401));
        }

        // Create JWT token (valid for 1 hour)
        const token = jwt.sign(
            { musicianId: musician._id, email: musician.email },
            process.env.JWT_SECRET || "your_secret_key", // Replace with a real secret in .env
            { expiresIn: "1h" }
        );

        res.json({
            message: "Logged in successfully",
            musicianId: musician._id,
            token: token
        });

    } catch (error) {
        console.error("Error logging in musician:", error);
        return next(new HttpError("Something went wrong. Please try again.", 500));
    }
};

module.exports = { signupMusician, loginMusician };

