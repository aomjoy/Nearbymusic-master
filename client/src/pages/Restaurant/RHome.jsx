import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMusic, FaUtensils, FaComments, FaUserAlt, FaHome } from "react-icons/fa";

const RHome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-20 bg-gray-800 p-4 flex flex-col justify-between h-full shadow-lg rounded-r-xl">
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">NearbyMusic</h1>
          <ul className="space-y-6">
            {/* Home Icon */}
            <li
              className="flex flex-col items-center gap-2 cursor-pointer text-xl transition-all hover:bg-blue-600 p-4 rounded-xl"
              onClick={() => navigate("/RHome")}
            >
              <FaHome className="text-blue-400 text-3xl" />
              <span className="text-sm">Home</span>
            </li>
            <li 
              className="flex flex-col items-center gap-2 cursor-pointer text-xl transition-all hover:bg-blue-600 p-4 rounded-xl"
              onClick={() => navigate("/RActivities")}
            >
              <FaMusic className="text-blue-400 text-3xl" />
              <span className="text-sm">Activities</span>
            </li>
            <li 
              className="flex flex-col items-center gap-2 cursor-pointer text-xl transition-all hover:bg-blue-600 p-4 rounded-xl"
              onClick={() => navigate("/RChat")}
            >
              <FaComments className="text-blue-400 text-3xl" />
              <span className="text-sm">Chat</span>
            </li>
            <li 
              className="flex flex-col items-center gap-2 cursor-pointer text-xl transition-all hover:bg-blue-600 p-4 rounded-xl"
              onClick={() => navigate("/RProfile")}
            >
              <FaUserAlt className="text-blue-400 text-3xl" />
              <span className="text-sm">Profile</span>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-4 rounded-xl mt-8 transition-all"
            onClick={() => navigate("/login")}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default RHome;
