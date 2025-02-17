import React, { useState, useEffect } from 'react';
import RSidebar from '../../components/RSidebar';
import CreatePost from '../../components/CreatePost';
import axios from 'axios';

const RHome = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = (newPost) => {
    setPosts([...posts, newPost]);
    setShowCreatePost(false);
  };

  return (
    <div className="flex">
      <RSidebar />
      <div className="flex-1 ml-60">
        <div className="min-h-screen bg-gray-900 p-8">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 text-white">Welcome to NearbyMusic</h1>
            <p className="text-2xl text-gray-300">
              Explore job opportunities and collaborate with restaurants for your next performance.
            </p>
          </div>
          <button
            onClick={() => setShowCreatePost(true)}
            className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold py-4 px-8 rounded-xl transition-all"
          >
            Add Post
          </button>
          {showCreatePost && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <CreatePost onCreatePost={handleCreatePost} onClose={() => setShowCreatePost(false)} />
            </div>
          )}
          <div className="mt-8">
            {posts.map((post, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-3xl shadow-lg text-white mb-6">
                <h2 className="text-3xl font-semibold mb-4">{post.restaurantName}</h2>
                <p className="text-gray-400 text-xl mb-2">Genres: {post.selectedGenres.join(', ')}</p>
                <p className="text-gray-400 text-xl mb-2">Instruments: {post.selectedInstruments.join(', ')}</p>
                <p className="text-gray-400 text-xl">Number of People: {post.numberOfPeople}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RHome;