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

const Alert = ({ children, className }) => (
  <div className={`p-4 rounded-lg ${className}`}>{children}</div>
);

const AlertDescription = ({ children }) => (
  <p className="text-sm">{children}</p>
);

const UserDashboardSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showSaveAlert, setShowSaveAlert] = useState(false);
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
      color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300",
      hoverColor: "hover:bg-pink-50 dark:hover:bg-pink-900/20",
    },
    {
      id: "dashboard",
      icon: <Layout className="w-5 h-5" />,
      title: "Dashboard",
      description: "Customize Dashboard",
      color:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300",
      hoverColor: "hover:bg-purple-50 dark:hover:bg-purple-900/20",
    },
    {
      id: "security",
      icon: <Shield className="w-5 h-5" />,
      title: "Security",
      description: "Account Protection",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300",
      hoverColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
    {
      id: "notifications",
      icon: <Bell className="w-5 h-5" />,
      title: "Notifications",
      description: "Alert Preferences",
      color:
        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300",
      hoverColor: "hover:bg-green-50 dark:hover:bg-green-900/20",
    },
  ];

  const handleSave = () => {
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <User className="w-6 h-6 text-pink-500 dark:text-pink-400" />
              Profile Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-3 transition-colors focus:border-pink-500 dark:focus:border-pink-400 focus:ring-1 focus:ring-pink-500 dark:focus:ring-pink-400"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-3 transition-colors focus:border-pink-500 dark:focus:border-pink-400 focus:ring-1 focus:ring-pink-500 dark:focus:ring-pink-400"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-3 transition-colors focus:border-pink-500 dark:focus:border-pink-400 focus:ring-1 focus:ring-pink-500 dark:focus:ring-pink-400"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company
                </label>
                <input
                  type="text"
                  value={profileData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-3 transition-colors focus:border-pink-500 dark:focus:border-pink-400 focus:ring-1 focus:ring-pink-500 dark:focus:ring-pink-400"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-pink-500 dark:bg-pink-600 text-white rounded-xl hover:bg-pink-600 dark:hover:bg-pink-700 transition-colors duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        );
      case "dashboard":
        return (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Layout className="w-6 h-6 text-purple-500 dark:text-purple-400" />
              Dashboard Customization
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Show Analytics Overview
                </span>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-purple-500 dark:peer-checked:bg-purple-400 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                  </div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Quick Action Widgets
                </span>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-purple-500 dark:peer-checked:bg-purple-400 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              Account Security
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Add an extra layer of security
                    </p>
                  </div>
                  <button className="px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300">
                    Enable
                  </button>
                </div>
              </div>
              <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                      Password Reset
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage your account password
                    </p>
                  </div>
                  <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300">
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Bell className="w-6 h-6 text-green-500 dark:text-green-400" />
              Notification Preferences
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Email Notifications
                </span>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-green-500 dark:peer-checked:bg-green-400 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                  </div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  System Updates
                </span>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-green-500 dark:peer-checked:bg-green-400 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-72 bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col">
        <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
          <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {profileData.role}
            </p>
          </div>
        </div>

        <nav className="space-y-3">
          {dashboardSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                activeSection === section.id
                  ? section.color
                  : `text-gray-600 dark:text-gray-400 ${section.hoverColor}`
              }`}
            >
              {section.icon}
              <div className="text-left">
                <h3 className="font-semibold">{section.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {section.description}
                </p>
              </div>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full flex items-center justify-center space-x-2 p-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {showSaveAlert && (
            <Alert className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900 text-green-800 dark:text-green-200 mb-4">
              <AlertDescription>
                Changes saved successfully! ✨
              </AlertDescription>
            </Alert>
          )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardSettings;