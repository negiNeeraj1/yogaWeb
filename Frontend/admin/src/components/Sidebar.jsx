import React from "react";
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import { BookAIcon } from "lucide-react";

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const location = useLocation();

  const menuItems = [
    {
      icon: HomeIcon,
      text: "Dashboard",
      path: "/",
    },
    {
      icon: CalendarIcon,
      text: "Bookings",
      path: "/bookings",
    },
    {
      icon: UserGroupIcon,
      text: "Clients",
      path: "/clients",
    },
    {
      icon: DocumentTextIcon,
      text: "Blogs",
      path: "/blogs",
    },
    {
      icon: ChartBarIcon,
      text: "Analytics",
      path: "/analytics",
    },
    {
      icon: BookAIcon,
      text: "Course",
      path: "/manage-courses",
    },

    {
      icon: CogIcon,
      text: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div
      className={`
        bg-white 
        border-r 
        border-gray-200 
        h-screen 
        fixed 
        left-0 
        top-0 
        transition-all 
        duration-300 
        ease-in-out 
        ${isCollapsed ? "w-20" : "w-64"}
        shadow-md 
        flex 
        flex-col
      `}
    >
      {/* Collapse/Expand Button */}
      <button
        onClick={onToggleCollapse}
        className="
          absolute 
          top-4 
          -right-4 
          bg-white 
          border 
          border-gray-200 
          rounded-full 
          w-8 
          h-8 
          flex 
          items-center 
          justify-center 
          shadow-md 
          z-10
          hover:bg-gray-50 
          transition-all
        "
      >
        {isCollapsed ? (
          <ChevronRightIcon className="h-5 w-5 text-gray-600" />
        ) : (
          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
        )}
      </button>

      {/* Logo */}
      <div
        className="
          h-16 
          flex 
          items-center 
          justify-center 
          border-b 
          border-gray-200 
          relative
        "
      >
        {!isCollapsed ? (
          <h1 className="text-xl font-bold text-gray-800">Yoga Studio</h1>
        ) : (
          <h1 className="text-2xl font-bold text-gray-800">Y</h1>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow py-4 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex 
              items-center 
              px-6 
              py-3 
              transition-all 
              duration-200 
              ease-in-out 
              ${
                location.pathname === item.path ||
                (item.path === "/" && location.pathname === "/")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            <item.icon
              className={`
                h-6 
                w-6 
                ${
                  location.pathname === item.path ||
                  (item.path === "/" && location.pathname === "/")
                    ? "text-blue-600"
                    : "text-gray-400"
                }
                ${!isCollapsed ? "mr-4" : ""}
              `}
            />
            {!isCollapsed && (
              <span
                className={`
                  text-lg 
                  font-medium 
                  ${
                    location.pathname === item.path ||
                    (item.path === "/" && location.pathname === "/")
                      ? "text-blue-600"
                      : "text-gray-700"
                  }
                `}
              >
                {item.text}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
