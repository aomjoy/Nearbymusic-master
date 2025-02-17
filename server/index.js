const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const restaurantRoutes = require('./routes/restaurantRoutes');
const musicianRoutes = require('./routes/musicianRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes)
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/musicians', musicianRoutes);
app.use('/api/login', authRoutes);
app.use('/api', postRoutes);

app.use(notFound)
app.use(errorHandler)

console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.get('/', (req, res) => {
  res.send('NearbyMusic API is running');
});
