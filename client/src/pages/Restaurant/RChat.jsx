import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMusic, FaUtensils, FaComments, FaUserAlt, FaHome } from "react-icons/fa";

const RChat = () => {
  const navigate = useNavigate();

  // Simulated chat rooms with messages
  const [chatRooms, setChatRooms] = useState([
    { id: 1, name: "Chat with Alice", messages: [{ sender: "Alice", text: "Hi there!" }] },
    { id: 2, name: "Chat with Bob", messages: [{ sender: "Bob", text: "Hey! How's it going?" }] },
    { id: 3, name: "Chat with Charlie", messages: [{ sender: "Charlie", text: "Good morning!" }] },
  ]);

  // State to manage selected chat room and message input
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [message, setMessage] = useState("");

  // Function to handle chat room selection
  const selectChatRoom = (chatRoom) => {
    setSelectedChatRoom(chatRoom);
  };

  // Function to send a new message
  const sendMessage = () => {
    if (message.trim() && selectedChatRoom) {
      const newMessage = { sender: "You", text: message };
      setChatRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === selectedChatRoom.id
            ? { ...room, messages: [...room.messages, newMessage] }
            : room
        )
      );
      setMessage("");
    }
  };

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

      {/* Chat Content */}
      <div className="flex-grow p-8">
        <h2 className="text-3xl font-bold text-blue-400 mb-6">Chat</h2>

        <div className="flex">
          {/* Chat Rooms List */}
          <div className="w-1/4 bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Chat Rooms</h3>
            {chatRooms.map((room) => (
              <div
                key={room.id}
                className="cursor-pointer text-blue-500 hover:bg-blue-600 p-3 rounded-lg"
                onClick={() => selectChatRoom(room)}
              >
                {room.name}
              </div>
            ))}
          </div>

          {/* Messages Display */}
          {selectedChatRoom ? (
            <div className="flex-grow bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">{selectedChatRoom.name}</h3>

              <div className="flex-grow overflow-auto space-y-4 mb-4">
                {selectedChatRoom.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs p-4 rounded-lg text-white ${
                        msg.sender === "You" ? "bg-blue-500" : "bg-gray-600"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center text-blue-400">
              <p>Select a chat room to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RChat;
