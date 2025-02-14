import React from 'react';  

const MHome = () => {  
  const restaurants = [  
    {  
      name: 'Classic Restaurant',  
      location: 'New York City',  
      budget: '$500',  
      eventTime: 'Evening',  
      image: 'https://via.placeholder.com/150', // Replace with real image URLs  
    },  
    {  
      name: 'Jazz Cafe',  
      location: 'Los Angeles',  
      budget: '$700',  
      eventTime: 'Night',  
      image: 'https://via.placeholder.com/150', // Replace with real image URLs  
    },  
    {  
      name: 'Elegant Restaurant',  
      location: 'Chicago',  
      budget: '$300',  
      eventTime: 'Afternoon',  
      image: 'https://via.placeholder.com/150', // Replace with real image URLs  
    },  
  ];  

  return (  
    <div className="flex flex-col min-h-screen bg-gray-100 p-8">  
      {/* Welcome Section */}  
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to NearbyMusic</h1>  
      <p className="text-lg text-gray-700 mb-8">  
        Explore job opportunities and collaborate with restaurants for your next performance.  
      </p>  

      {/* Restaurant List */}  
      <div className="space-y-6">  
        {restaurants.map((restaurant, index) => (  
          <div  
            key={index}  
            className="flex items-center bg-white shadow hover:shadow-lg rounded p-4"  
          >  
            {/* Restaurant Details */}  
            <div className="flex-1">  
              <h2 className="text-xl font-semibold text-gray-800">{restaurant.name}</h2>  
              <p className="text-gray-600 mt-2">Location: {restaurant.location}</p>  
              <p className="text-gray-600">Budget: {restaurant.budget}</p>  
              <p className="text-gray-600">Event Time: {restaurant.eventTime}</p>  
            </div>  

            {/* Restaurant Image */}  
            <div className="ml-4">  
              <img  
                src={restaurant.image}  
                alt={restaurant.name}  
                className="w-32 h-32 object-cover rounded"  
              />  
            </div>  
          </div>  
        ))}  
      </div>  
    </div>  
  );  
};  

export default MHome;  