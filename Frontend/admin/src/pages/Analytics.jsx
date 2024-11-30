import React from 'react';

const Analytics = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Website Traffic</h3>
          <p className="text-gray-600">Coming Soon...</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold">User Engagement</h3>
          <p className="text-gray-600">Coming Soon...</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Revenue</h3>
          <p className="text-gray-600">Coming Soon...</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Bookings Overview</h3>
          <p className="text-gray-600">Coming Soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
