import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMusic, FaUtensils, FaComments, FaUserAlt, FaHome } from "react-icons/fa";

const RProfile = () => {
  const navigate = useNavigate();
  
  // State to handle editable fields
  const [username, setUsername] = useState("John Doe");
  const [bio, setBio] = useState("A passionate musician.");
  const [profilePicture, setProfilePicture] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  // Function to handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle saving the profile changes
  const handleSaveChanges = () => {
    // Simulate saving changes
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000); // Hide the message after 3 seconds
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-20 bg-gray-800 p-4 flex flex-col justify-between h-full shadow-lg rounded-r-xl">
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">NearbyMusic</h1>
          <ul className="space-y-6">
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

      {/* Profile Content */}
      <div className="flex-grow p-8">
        <h2 className="text-3xl font-bold text-blue-400 mb-6">My Profile</h2>

        <div className="flex flex-col items-center space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <img
              src={profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="mt-2 text-blue-400 cursor-pointer"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col items-center">
            <label htmlFor="username" className="text-lg font-semibold">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg mt-2"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col items-center">
            <label htmlFor="bio" className="text-lg font-semibold">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg mt-2"
              rows="4"
              cols="40"
            />
          </div>

          {/* Save Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-2 px-8 rounded-xl mt-6"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>

          {/* Success Message */}
          {successMessage && (
            <div className="text-green-500 mt-4 font-semibold">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RProfile;
