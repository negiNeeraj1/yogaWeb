// src/components/dashboard/Sidebar.jsx
import React from "react";
import { Home, Calendar, Activity, User, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const sidebarNavItems = [
    {
      icon: <Home className="w-5 h-5" />,
      name: "Dashboard",
      path: "/yogadashboard",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      name: "Classes",
      path: "/yogadashboard/classes",
    },
    {
      icon: <Activity className="w-5 h-5" />,
      name: "Progress",
      path: "/yogadashboard/progress",
    },
    {
      icon: <User className="w-5 h-5" />,
      name: "Profile",
      path: "/yogadashboard/profile",
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-purple-600 flex items-center">
          <BookOpen className="mr-2" /> YogaFlow
        </h1>
      </div>
      <nav className="p-4 flex-grow">
        {sidebarNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              w-full flex items-center p-3 rounded-lg mb-2 transition-all
              ${
                location.pathname === item.path
                  ? "bg-purple-100 text-purple-700"
                  : "hover:bg-gray-100 text-gray-700"
              }
            `}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
