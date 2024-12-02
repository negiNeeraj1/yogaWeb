import React, { useState } from "react";
import {
  BellIcon,
  UserCircleIcon,
  SearchIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const Header = ({ onSearchChange }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New client registration for Yoga Basics.",
      read: false,
      time: "2 mins ago",
    },
    {
      id: 2,
      message: "Payment received for Advanced Yoga course.",
      read: false,
      time: "10 mins ago",
    },
    {
      id: 3,
      message: "Upcoming session with Sam Wilson.",
      read: true,
      time: "Yesterday",
    },
  ]);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className="
        bg-white 
        shadow-sm 
        border-b 
        border-gray-100 
        px-6 
        py-4 
        flex 
        items-center 
        justify-between
      "
    >
      {/* Search Bar */}
      <div className="relative flex-grow max-w-md mr-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search dashboard..."
          className="
            pl-10 
            pr-4 
            py-2 
            w-full 
            border 
            border-gray-200 
            rounded-lg 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500
            text-sm
          "
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        />
      </div>

      {/* Action Icons */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              setIsProfileOpen(false);
            }}
            className="relative hover:bg-gray-100 p-2 rounded-full"
          >
            <BellIcon className="h-6 w-6 text-gray-600" />
            {unreadCount > 0 && (
              <span
                className="
                  absolute 
                  -top-1 
                  -right-1 
                  bg-red-500 
                  text-white 
                  rounded-full 
                  h-4 
                  w-4 
                  flex 
                  items-center 
                  justify-center 
                  text-xs
                "
              >
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationOpen && (
            <div
              className="
                absolute 
                right-0 
                mt-2 
                w-80 
                bg-white 
                border 
                border-gray-200 
                rounded-lg 
                shadow-lg 
                z-20
              "
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Notifications
                </h3>
                <button
                  className="text-sm text-blue-500 hover:underline"
                  onClick={() =>
                    setNotifications((prev) =>
                      prev.map((n) => ({ ...n, read: true }))
                    )
                  }
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`
                      px-4 
                      py-3 
                      border-b 
                      last:border-b-0 
                      hover:bg-gray-50 
                      ${notification.read ? "opacity-60" : "font-medium"}
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-800">
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <button
                          onClick={() =>
                            markNotificationAsRead(notification.id)
                          }
                          className="text-xs text-blue-500 ml-2"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {notification.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationOpen(false);
            }}
            className="hover:bg-gray-100 p-2 rounded-full"
          >
            <UserCircleIcon className="h-7 w-7 text-gray-600" />
          </button>

          {isProfileOpen && (
            <div
              className="
                absolute 
                right-0 
                mt-2 
                w-64 
                bg-white 
                border 
                border-gray-200 
                rounded-lg 
                shadow-lg 
                z-20
              "
            >
              <div className="p-4 border-b text-center">
                <h4 className="font-semibold text-gray-800">John Doe</h4>
                <p className="text-sm text-gray-500">Yoga Studio Admin</p>
              </div>
              <div className="py-1">
                <Link
                  to="/profile"
                  className="
                    block 
                    px-4 
                    py-2 
                    text-sm 
                    text-gray-700 
                    hover:bg-gray-100
                  "
                >
                  Profile Settings
                </Link>
                <button
                  onClick={() => {
                    /* Logout logic */
                  }}
                  className="
                    w-full 
                    text-left 
                    px-4 
                    py-2 
                    text-sm 
                    text-red-500 
                    hover:bg-gray-100
                    flex 
                    items-center
                  "
                >
                  <LogoutIcon className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
