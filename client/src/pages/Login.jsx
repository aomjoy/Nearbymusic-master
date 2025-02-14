import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, try to authenticate as a musician
      const musicianResponse = await fetch('http://localhost:5000/api/musicians/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (musicianResponse.ok) {
        const musicianData = await musicianResponse.json();
        localStorage.setItem('musicianData', JSON.stringify(musicianData.user));
        navigate('/MHome');
        return;
      }

      // If musician login fails, try restaurant login
      const restaurantResponse = await fetch('http://localhost:5000/api/restaurants/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (restaurantResponse.ok) {
        const restaurantData = await restaurantResponse.json();
        localStorage.setItem('restaurantData', JSON.stringify(restaurantData.user));
        navigate('/RHome');
        return;
      }

      // If both fail, show error
      setError('Invalid email or password');

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Login</h1>

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
              placeholder="Enter your password"
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

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;