const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Assuming you have a Post model

// Create a new post
router.post('/posts', async (req, res) => {
  const { restaurantName, selectedGenres, selectedInstruments, numberOfPeople } = req.body;
  const newPost = new Post({
    restaurantName,
    selectedGenres,
    selectedInstruments,
    numberOfPeople,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;