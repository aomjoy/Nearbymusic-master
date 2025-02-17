const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  selectedGenres: { type: [String], required: true },
  selectedInstruments: { type: [String], required: true },
  numberOfPeople: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);