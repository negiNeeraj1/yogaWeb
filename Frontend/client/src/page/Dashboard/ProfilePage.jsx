import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Palette,
  Moon,
  Sun,
  Mail,
  Shield,
  CreditCard,
  Key,
  Globe,
  LogOut,
  Smile,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";

const ProfilePage = () => {
  // State management with more comprehensive settings
  const [activeSection, setActiveSection] = useState("profile");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    pushNotifications: true,
  });
  const [language, setLanguage] = useState("english");
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
  });
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    loginAlerts: false,
  });

  // Expanded settings sections
  const settingsSections = [
    {
      id: "profile",
      icon: <User className="w-6 h-6" />,
      title: "Profile Settings",
      description: "Manage personal information",
    },
    {
      id: "security",
      icon: <Lock className="w-6 h-6" />,
      title: "Privacy & Security",
      description: "Control account protection",
    },
    {
      id: "notifications",
      icon: <Bell className="w-6 h-6" />,
      title: "Notifications",
      description: "Customize alert preferences",
    },
    {
      id: "payment",
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payment & Billing",
      description: "Manage payment methods",
    },
  ];

  // Update profile data handler
  const handleProfileUpdate = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Render content for different sections
  const renderSettingsContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Profile Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileUpdate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileUpdate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileUpdate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileUpdate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Birth Date
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={profileData.birthDate}
                  onChange={handleProfileUpdate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleProfileUpdate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Privacy & Security
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <span>Two-Factor Authentication</span>
                </div>
                <div className="relative inline-flex">
                  <input
                    type="checkbox"
                    checked={security.twoFactorAuth}
                    onChange={() =>
                      setSecurity((prev) => ({
                        ...prev,
                        twoFactorAuth: !prev.twoFactorAuth,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div
                    className={`w-10 h-5 ${
                      security.twoFactorAuth ? "bg-green-500" : "bg-gray-200"
                    } rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all`}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Key className="w-5 h-5 text-gray-500" />
                  <span>Login Alerts</span>
                </div>
                <div className="relative inline-flex">
                  <input
                    type="checkbox"
                    checked={security.loginAlerts}
                    onChange={() =>
                      setSecurity((prev) => ({
                        ...prev,
                        loginAlerts: !prev.loginAlerts,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div
                    className={`w-10 h-5 ${
                      security.loginAlerts ? "bg-green-500" : "bg-gray-200"
                    } rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span>Email Notifications</span>
                </div>
                <div className="relative inline-flex">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        email: !prev.email,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div
                    className={`w-10 h-5 ${
                      notifications.email ? "bg-green-500" : "bg-gray-200"
                    } rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all`}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span>SMS Notifications</span>
                </div>
                <div className="relative inline-flex">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        sms: !prev.sms,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div
                    className={`w-10 h-5 ${
                      notifications.sms ? "bg-green-500" : "bg-gray-200"
                    } rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all`}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <span>Push Notifications</span>
                </div>
                <div className="relative inline-flex">
                  <input
                    type="checkbox"
                    checked={notifications.pushNotifications}
                    onChange={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        pushNotifications: !prev.pushNotifications,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div
                    className={`w-10 h-5 ${
                      notifications.pushNotifications
                        ? "bg-green-500"
                        : "bg-gray-200"
                    } rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );
      case "payment":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Payment & Billing
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">No payment methods added yet.</p>
                <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4 bg-white lg:border-r border-gray-200 p-6 space-y-4">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">User Settings</h2>
            <p className="text-gray-500 text-sm">Manage Your Account</p>
          </div>
        </div>

        <div className="space-y-2">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                activeSection === section.id
                  ? "bg-indigo-50 text-indigo-600"
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
        </div>

        <div className="mt-6 space-y-4 border-t pt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-500" />
              <span>Language</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="form-select border-gray-300 rounded-md"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {theme === "light" ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-500" />
              )}
              <span>Theme</span>
            </div>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </div>

        <button className="w-full flex items-center justify-center space-x-2 mt-8 p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      <div className="flex-1 lg:overflow-y-auto">
        {activeSection ? (
          renderSettingsContent()
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-center p-6">
            <p>Select a section to manage your settings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;;

