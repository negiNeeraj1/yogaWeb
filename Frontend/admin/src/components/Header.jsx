import React, { useState } from "react";
import { BellIcon } from "@heroicons/react/outline"; // Heroicons v1 syntax

const Header = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "User John Doe has successfully registered for Yoga Basics.", read: false },
    { id: 2, message: "Payment received for Advanced Yoga course.", read: false },
    { id: 3, message: "Session with Sam Wilson is scheduled for Dec 2.", read: true },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <header className=" text-black py-4 px-6 shadow-md" style={{backgroundColor:"#edeff7"}}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Yoga Admin Dashboard</h1>
        
        

        <div className="relative">
          <button
            onClick={handleToggleDropdown}
            className="relative focus:outline-none"
          >
            <BellIcon className="h-6 w-6 text-black" />
            {notifications.some((n) => !n.read) && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-10">
              <div className="px-4 py-2 border-b flex justify-between items-center">
                <h2 className="text-gray-800 font-bold text-lg">Notifications</h2>
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Mark All as Read
                </button>
              </div>
              <ul className="max-h-60 overflow-auto">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`px-4 py-2 text-sm ${
                      notification.read ? "text-gray-600" : "text-gray-800 font-semibold"
                    } border-b last:border-none hover:bg-gray-100`}
                  >
                    <span>{notification.message}</span>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="ml-2 text-xs text-blue-500 hover:underline"
                      >
                        Mark as Read
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {notifications.length === 0 && (
                <div className="p-4 text-gray-600 text-sm text-center">
                  No notifications available.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
