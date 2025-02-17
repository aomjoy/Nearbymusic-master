import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ onCreatePost, onClose }) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [numberOfPeople, setNumberOfPeople] = useState('');

  const musicGenres = ['Jazz', 'Rock', 'Classical', 'Blues', 'Pop', 'Hip-Hop'];
  const instruments = ['Guitar', 'Piano', 'Drums', 'Violin', 'Saxophone', 'Bass'];

  const handleGenreChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedGenres(value);
  };

  const handleInstrumentChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedInstruments(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      restaurantName,
      selectedGenres,
      selectedInstruments,
      numberOfPeople,
    };
    try {
      const response = await axios.post('/api/posts', newPost);
      onCreatePost(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-lg text-white w-full max-w-2xl">
        <h2 className="text-3xl font-semibold mb-6 text-center">Create a New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2 text-lg">Restaurant Name</label>
            <input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-lg">Music Genre</label>
            <select
              multiple
              value={selectedGenres}
              onChange={handleGenreChange}
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              required
            >
              {musicGenres.map((genre) => (
                <option key={genre} value={genre} className="p-2 hover:bg-gray-600">{genre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-lg">Instruments</label>
            <select
              multiple
              value={selectedInstruments}
              onChange={handleInstrumentChange}
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              required
            >
              {instruments.map((instrument) => (
                <option key={instrument} value={instrument} className="p-2 hover:bg-gray-600">{instrument}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-lg">Number of People</label>
            <input
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold py-4 rounded-xl transition-all transform hover:scale-105"
            >
              Post
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-xl transition-all transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;