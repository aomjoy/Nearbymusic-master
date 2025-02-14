import React from 'react';  
import { Link, useNavigate } from 'react-router-dom';  

const Sidebar = () => {  
  const navigate = useNavigate();  

  // Handle Logout Action  
  const handleLogout = () => {  
    const confirmed = window.confirm("Are you sure you want to log out?"); // Confirm user action  
    if (confirmed) {  
      // Clear Authentication Data  
      localStorage.removeItem('authToken'); // Remove token (if saved)  
      localStorage.removeItem('user'); // Remove user info (if saved)  

      // Navigate to Main Page  
      navigate('/'); // Redirect to Main.jsx  
    }  
  };  

  return (  
    <div className="bg-gray-800 text-white w-60 h-screen p-4 fixed">  
      <h2 className="text-xl font-bold mb-4">NearbyMusic</h2> {/* Sidebar Header */}  
      <ul className="space-y-4">  
        <li>  
          <Link to="/MHome" className="block p-3 hover:bg-gray-700 rounded">  
            Home  
          </Link>  
        </li>  
        <li>  
          <Link to="/MProfile" className="block p-3 hover:bg-gray-700 rounded">  
            Profile  
          </Link>  
        </li>  
        <li>  
          <Link to="/MActivities" className="block p-3 hover:bg-gray-700 rounded">  
            My Activities  
          </Link>  
        </li>  
        <li>  
          <Link to="/MChat" className="block p-3 hover:bg-gray-700 rounded">  
            Chat  
          </Link>  
        </li>  
        <li>  
          {/* Logout Button */}  
          <button  
            onClick={handleLogout}  
            className="block w-full text-left p-3 hover:bg-red-600 rounded"  
          >  
            Log Out  
          </button>  
        </li>  
      </ul>  
    </div>  
  );  
};  

export default Sidebar;