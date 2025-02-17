import React from 'react'
import MSidebar from '../../components/MSidebar';

const MChat = () => {
  return (
    <div className="flex">
      <MSidebar />
      <div className="flex-1 ml-60"> {/* Added margin to account for sidebar width */}
        <div className="min-h-screen bg-gray-900 p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 text-white">Welcome to NearbyMusic</h1>
            <p className="text-2xl text-gray-300">
              Explore job opportunities and collaborate with restaurants for your next performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MChat