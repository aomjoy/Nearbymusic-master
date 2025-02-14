const mongoose = require('mongoose');
const Restaurant = require("../models/restaurantModel"); 
const Musician = require("../models/musicianModel");

const musicianSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    genres: { type: [String], required: true },
    instruments: { type: [String], required: true },
    provinces: { type: [String], required: true }
});

const checkEmail = async (req, res, next) => {
    const { email } = req.query; // Get the email from the query string

    try {
        const musicianExists = await Musician.findOne({ email: email.toLowerCase() });
        const restaurantExists = await Restaurant.findOne({ email: email.toLowerCase() });

        if (musicianExists || restaurantExists) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        return next(new HttpError('Failed to check email', 500));
    }
};
module.exports = mongoose.model('Musician', musicianSchema);