import React, { useState } from "react";
import { useTheme } from "../../context/ThemeProvider";
import {
  User,
  Lock,
  Bell,
  Moon,
  Sun,
  Mail,
  Shield,
  CreditCard,
  Globe,
  LogOut,
  Phone,
  Calendar,
  MapPin,
  UserCircle,
  AtSign,
  ChevronDown,
} from "lucide-react";

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  icon: Icon,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <div className="relative rounded-lg shadow-sm">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`${
          Icon ? "pl-10" : "pl-4"
        } block w-full rounded-lg border border-gray-300 dark:border-gray-600 
        bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2.5
        focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
        focus:border-transparent transition-all duration-200
        placeholder-gray-400 dark:placeholder-gray-500`}
      />
    </div>
  </div>
);

const Toggle = ({ checked, onChange, label, icon: Icon }) => (
  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
    <div className="flex items-center space-x-3">
      {Icon && <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
    </div>
    <button
      onClick={onChange}
      className="relative inline-flex items-center rounded-full w-11 h-6"
      type="button"
      role="switch"
      aria-checked={checked}
    >
      <span className="sr-only">Toggle {label}</span>
      <div
        className={`
          absolute w-11 h-6 rounded-full transition-colors duration-200 ease-in-out
          ${
            checked
              ? "bg-indigo-600 dark:bg-indigo-500"
              : "bg-gray-200 dark:bg-gray-700"
          }
        `}
      />
      <div
        className={`
          absolute left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out
          ${checked ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  </div>
);

const StyledSelect = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className="appearance-none w-32 px-3 py-2 bg-white dark:bg-gray-800 
        border border-gray-300 dark:border-gray-600 rounded-lg 
        text-gray-700 dark:text-gray-300 pr-10
        focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
        focus:border-transparent cursor-pointer
        transition-all duration-200"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="py-2">
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown
      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 
      text-gray-400 dark:text-gray-500 pointer-events-none"
    />
  </div>
);

// Usage in your ProfilePage component:
const LanguageSelect = () => {
  const [language, setLanguage] = useState("english");

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
  ];

  return (
    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
      <div className="flex items-center space-x-3">
        <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <span className="text-gray-700 dark:text-gray-300">Language</span>
      </div>
      <StyledSelect
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        options={languageOptions}
      />
    </div>
  );
};

const ProfilePage = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState("profile");
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

  const handleProfileUpdate = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThemeToggle = () => {
    toggleDarkMode();
  };

  const renderSettingsContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Profile Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="First Name"
                name="firstName"
                value={profileData.firstName}
                onChange={handleProfileUpdate}
                icon={UserCircle}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={profileData.lastName}
                onChange={handleProfileUpdate}
                icon={UserCircle}
              />
              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleProfileUpdate}
                icon={AtSign}
              />
              <InputField
                label="Phone Number"
                name="phone"
                type="tel"
                value={profileData.phone}
                onChange={handleProfileUpdate}
                icon={Phone}
              />
              <InputField
                label="Birth Date"
                name="birthDate"
                type="date"
                value={profileData.birthDate}
                onChange={handleProfileUpdate}
                icon={Calendar}
              />
              <InputField
                label="Address"
                name="address"
                value={profileData.address}
                onChange={handleProfileUpdate}
                icon={MapPin}
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 
                hover:from-indigo-600 hover:to-purple-600 text-white transition-all duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Security Settings
            </h2>
            <div className="space-y-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
              <Toggle
                checked={security.twoFactorAuth}
                onChange={() =>
                  setSecurity((prev) => ({
                    ...prev,
                    twoFactorAuth: !prev.twoFactorAuth,
                  }))
                }
                label="Two-Factor Authentication"
                icon={Shield}
              />
              <Toggle
                checked={security.loginAlerts}
                onChange={() =>
                  setSecurity((prev) => ({
                    ...prev,
                    loginAlerts: !prev.loginAlerts,
                  }))
                }
                label="Login Alerts"
                icon={Bell}
              />
              <InputField
                label="Current Password"
                name="currentPassword"
                type="password"
                value=""
                onChange={() => {}}
                icon={Lock}
              />
              <InputField
                label="New Password"
                name="newPassword"
                type="password"
                value=""
                onChange={() => {}}
                icon={Lock}
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value=""
                onChange={() => {}}
                icon={Lock}
              />
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Notification Preferences
            </h2>
            <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
              <Toggle
                checked={notifications.email}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    email: !prev.email,
                  }))
                }
                label="Email Notifications"
                icon={Mail}
              />
              <Toggle
                checked={notifications.sms}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    sms: !prev.sms,
                  }))
                }
                label="SMS Notifications"
                icon={Phone}
              />
              <Toggle
                checked={notifications.pushNotifications}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    pushNotifications: !prev.pushNotifications,
                  }))
                }
                label="Push Notifications"
                icon={Bell}
              />
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Payment & Billing
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">
                No payment methods added yet.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 
                hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200"
              >
                Add Payment Method
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col lg:flex-row transition-colors duration-200">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg lg:border-r border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              User Settings
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Manage Your Account
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center p-4 rounded-lg transition-all duration-200 ${
                activeSection === section.id
                  ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
              }`}
            >
              {section.icon}
              <div className="text-left ml-3">
                <h3 className="font-semibold">{section.title}</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {section.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <LanguageSelect/>

          <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
            <div className="flex items-center space-x-3">
              {isDarkMode ? (
                <Moon className="w-5 h-5 text-indigo-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
              <span className="text-gray-700 dark:text-gray-300">Theme</span>
            </div>
            <button
              onClick={handleThemeToggle}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 
                hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-200"
            >
              {isDarkMode ? "Light" : "Dark"}
            </button>
          </div>
        </div>

        <button
          className="w-full flex items-center justify-center space-x-2 p-4 rounded-lg bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 
          text-red-600 dark:text-red-400 hover:from-red-100 hover:to-rose-100 dark:hover:from-red-900/30 dark:hover:to-rose-900/30 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:overflow-y-auto bg-white dark:bg-gray-800 transition-colors duration-200">
        {activeSection ? (
          <div className="max-w-4xl mx-auto p-6 space-y-8">
            {renderSettingsContent()}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-center p-6">
            <p>Select a section to manage your settings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
