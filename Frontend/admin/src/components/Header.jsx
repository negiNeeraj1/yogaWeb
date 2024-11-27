import React from 'react';

const Header = () => {
  return (
    <header className="bg-purple-600 text-white py-4 px-6 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Yoga Admin Dashboard</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/overview" className="hover:underline">Overview</a></li>
            <li><a href="/bookings" className="hover:underline">Bookings</a></li>
            <li><a href="/clients" className="hover:underline">Clients</a></li>
            <li><a href="/blogs" className="hover:underline">Blogs</a></li>
            <li><a href="/analytics" className="hover:underline">Analytics</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
