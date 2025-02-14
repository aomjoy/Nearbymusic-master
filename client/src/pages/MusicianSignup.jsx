import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaMusic, FaGuitar, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';

const MusicianSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    genres: [],
    instruments: [],
    provincesSelected: []
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const genres = ['Pop', 'Rock', 'Jazz', 'Classical'];
  const instruments = ['Guitar', 'Piano', 'Drums', 'Violin'];
  const provinces = ['California', 'New York', 'Texas', 'Florida'];

  const validateForm = () => {
    if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      setError('Fill in all fields');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password should be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return false;
    }

    if (formData.genres.length === 0) {
      setError('Please select at least one genre');
      return false;
    }

    if (formData.instruments.length === 0) {
      setError('Please select at least one instrument');
      return false;
    }

    if (formData.provincesSelected.length === 0) {
      setError('Please select at least one location');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Check if the email is already registered as a musician or restaurant
      const emailCheckResponse = await fetch(`http://localhost:5000/api/check-email?email=${formData.email}`);
      const emailCheckData = await emailCheckResponse.json();

      if (emailCheckData.exists) {
        setError('This email is already registered as either a musician or a restaurant.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/musicians/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          genres: formData.genres,
          instruments: formData.instruments,
          provinces: formData.provincesSelected
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Store musician data (except password) in localStorage
      const musicianData = {
        username: formData.username,
        email: formData.email,
        genres: formData.genres,
        instruments: formData.instruments,
        provinces: formData.provincesSelected
      };
      localStorage.setItem('musicianData', JSON.stringify(musicianData));

      // Navigate to MHome on success
      navigate('/MHome');

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const handleGenreChange = (genre) => {
    setFormData((prevState) => {
      const genres = prevState.genres.includes(genre)
        ? prevState.genres.filter((g) => g !== genre)
        : [...prevState.genres, genre];
      return { ...prevState, genres };
    });
  };

  const handleInstrumentChange = (instrument) => {
    setFormData((prevState) => {
      const instruments = prevState.instruments.includes(instrument)
        ? prevState.instruments.filter((i) => i !== instrument)
        : [...prevState.instruments, instrument];
      return { ...prevState, instruments };
    });
  };

  const handleProvinceToggle = (province) => {
    setFormData((prevState) => {
      const provincesSelected = prevState.provincesSelected.includes(province)
        ? prevState.provincesSelected.filter((p) => p !== province)
        : [...prevState.provincesSelected, province];
      return { ...prevState, provincesSelected };
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold mb-8 text-center">Musician Sign Up</h1>

          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-xl py-2 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-xl py-2 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Section */}
        <div className="space-y-6">
          {/* Music Genres Section */}
          <div>
            <label className="flex items-center text-xl font-semibold mb-4">
              <FaMusic className="mr-2 text-blue-400" />
              Music Genres
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {genres.map(genre => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreChange(genre)}
                  className={`p-3 rounded-xl text-sm transition-all ${formData.genres.includes(genre) ? 'bg-blue-500 text-white' : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300'}`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Instruments Section */}
          <div>
            <label className="flex items-center text-xl font-semibold mb-4">
              <FaGuitar className="mr-2 text-blue-400" />
              Instruments
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {instruments.map(instrument => (
                <button
                  key={instrument}
                  type="button"
                  onClick={() => handleInstrumentChange(instrument)}
                  className={`p-3 rounded-xl text-sm transition-all ${formData.instruments.includes(instrument) ? 'bg-blue-500 text-white' : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300'}`}
                >
                  {instrument}
                </button>
              ))}
            </div>
          </div>

          {/* Multi-Select Provinces */}
          <div>
            <label className="flex items-center text-xl font-semibold mb-4">
              <FaMapMarkerAlt className="mr-2 text-blue-400" />
              Preferred Locations
            </label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-3 rounded-xl bg-gray-700/50 text-white border-2 border-gray-600 focus:border-blue-500 focus:outline-none text-left"
            >
              {formData.provincesSelected?.length
                ? `${formData.provincesSelected.length} province${formData.provincesSelected.length > 1 ? 's' : ''} selected`
                : 'Select provinces'}
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-64 mt-2 bg-gray-700 rounded-xl shadow-lg max-h-96 overflow-y-auto">
                {provinces.map(province => (
                  <div
                    key={province}
                    onClick={() => handleProvinceToggle(province)}
                    className="province-item flex items-center p-3 hover:bg-gray-600 cursor-pointer"
                  >
                    <div className="w-5 h-5 border-2 border-blue-400 rounded mr-3 flex items-center justify-center">
                      {formData.provincesSelected?.includes(province) && (
                        <FaCheck className="text-blue-400" size={12} />
                      )}
                    </div>
                    {province}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="col-span-1 lg:col-span-2">
            <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded-xl text-center">
              {error}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="col-span-1 lg:col-span-2 w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default MusicianSignup;