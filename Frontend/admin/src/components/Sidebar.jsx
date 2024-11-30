import React, { useState, useEffect } from "react";

const Sidebar = () => {
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to load the theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Effect to apply the theme based on state
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Toggle function to switch between dark and light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <aside
      className={`w-64 min-h-screen shadow-md transition-all duration-500 ease-in-out ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-[#edeff7] text-gray-800"
      } relative`}
    >
      {/* Dark/Light Mode Toggle */}
      <div className="absolute top-4 right-4 flex items-center space-x-3 z-10">
        {/* Dark Mode Icon */}
        <label
          htmlFor="theme-toggle"
          className="cursor-pointer flex items-center justify-center w-10 h-6 bg-gray-200 rounded-full relative transition-all duration-300 ease-in-out"
        >
          <input
            type="checkbox"
            id="theme-toggle"
            className="hidden"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
              isDarkMode ? "translate-x-2 bg-grey-400" : ""
            }`}
          ></div>
        </label>
      </div>

      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-300">
        <h1 className="text-xl font-bold">Yoga Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your sessions with ease</p>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-3">
        {[
          { href: "/overview", text: "Overview" },
          { href: "/bookings", text: "Bookings" },
          { href: "/clients", text: "Clients" },
          { href: "/blogs", text: "Blogs" },
          { href: "/analytics", text: "Analytics" },
          { href: "/manage-courses", text: "Manage Fitness Programs" },
        ].map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`block w-full px-4 py-2 text-left border border-gray-300 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              isDarkMode
                ? "bg-gray-700 text-white hover:bg-gray-600 hover:border-gray-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:border-gray-400"
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-6 p-4 border-t border-gray-300 text-center text-sm text-gray-500">
        <p>© 2024 Yoga Dashboard</p>
        <p>All rights reserved</p>
      </div>
    </aside>
  );
};

export default Sidebar;
