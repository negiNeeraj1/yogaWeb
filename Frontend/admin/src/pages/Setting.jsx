import React, { useState } from "react";
import {
  User,
  Settings,
  Shield,
  Bell,
  CreditCard,
  Layout,
  BarChart2,
  Globe,
  LogOut,
} from "lucide-react";

const UserDashboardSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    company: "Tech Innovations Inc.",
    role: "Product Manager",
    department: "Product Development",
  });

  const dashboardSections = [
    {
      id: "profile",
      icon: <User className="w-5 h-5" />,
      title: "Profile",
      description: "Personal Information",
    },
    {
      id: "dashboard",
      icon: <Layout className="w-5 h-5" />,
      title: "Dashboard",
      description: "Customize Dashboard",
    },
    {
      id: "security",
      icon: <Shield className="w-5 h-5" />,
      title: "Security",
      description: "Account Protection",
    },
    {
      id: "notifications",
      icon: <Bell className="w-5 h-5" />,
      title: "Notifications",
      description: "Alert Preferences",
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Profile Details
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  value={profileData.company}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
          </div>
        );
      case "dashboard":
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Dashboard Customization
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Show Analytics Overview</span>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" />
                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className="dot absolute -left-1 -top-1 bg-white w-6 h-6 rounded-full shadow"></div>
                  </div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>Quick Action Widgets</span>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" />
                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className="dot absolute -left-1 -top-1 bg-white w-6 h-6 rounded-full shadow"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Account Security
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Enable
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Password Reset</h3>
                  <p className="text-sm text-gray-500">
                    Manage your account password
                  </p>
                </div>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" />
                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className="dot absolute -left-1 -top-1 bg-white w-6 h-6 rounded-full shadow"></div>
                  </div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>System Updates</span>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" />
                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className="dot absolute -left-1 -top-1 bg-white w-6 h-6 rounded-full shadow"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      <div className="w-64 bg-white shadow-md p-6">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-sm text-gray-500">Product Manager</p>
          </div>
        </div>

        <nav className="space-y-2">
          {dashboardSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                activeSection === section.id
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              {section.icon}
              <div className="text-left">
                <h3 className="font-semibold">{section.title}</h3>
                <p className="text-xs text-gray-400">{section.description}</p>
              </div>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t">
          <button className="w-full flex items-center justify-center space-x-2 p-3 text-red-600 hover:bg-red-50 rounded-lg transition">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserDashboardSettings;