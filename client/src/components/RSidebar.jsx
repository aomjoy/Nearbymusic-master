import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 w-64 h-screen p-6 fixed shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          NearbyMusic
        </h2>
      </div>
      
      <nav>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/RHome" 
              className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-700/50 hover:translate-x-1"
            >
              <span className="text-blue-400">•</span>
              <span>Home</span>
            </Link>
          </li>
          
          <li>
            <Link 
              to="/RActivities" 
              className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-700/50 hover:translate-x-1"
            >
              <span className="text-green-400">•</span>
              <span>My Activities</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/RChat" 
              className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-700/50 hover:translate-x-1"
            >
              <span className="text-yellow-400">•</span>
              <span>Chat</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/RProfile" 
              className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-700/50 hover:translate-x-1"
            >
              <span className="text-purple-400">•</span>
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-8 left-0 w-full px-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 transition-all duration-200 hover:bg-red-500/10 hover:translate-x-1"
        >
          <span className="text-red-400">•</span>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default RSidebar;