import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <nav className="space-y-4">
        <a href="/overview" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Overview</a>
        <a href="/bookings" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Bookings</a>
        <a href="/clients" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Clients</a>
        <a href="/blogs" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Blogs</a>
        <a href="/analytics" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Analytics</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
