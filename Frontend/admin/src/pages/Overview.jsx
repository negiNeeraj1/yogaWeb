import React from 'react';
import StatsCard from '../components/StatsCard';

const Overview = () => {
  return (
    <div className="p-6 space-y-4" style={{backgroundColor:"#f9fafb"}}>
      <h2 className="text-2xl font-bold text-purple-600">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Bookings" value="345" icon="📅" />
        <StatsCard title="Total Clients" value="123" icon="👥" />
        <StatsCard title="Total Blog Views" value="12,345" icon="📖" />
      </div>
    </div>
  );
};

export default Overview;
