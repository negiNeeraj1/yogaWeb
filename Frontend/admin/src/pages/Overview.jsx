import React, { useState, useEffect } from "react";
import {
  CalendarIcon,
  UserGroupIcon,
  UserAddIcon,
  ChartBarIcon,
  ClockIcon,
  DatabaseIcon,
  TrendingUpIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import LoadingSpinner from "../components/LoadingEffect";

const UserAnalyticsService = {
  async getUserMetrics() {
    try {
      const response = await axios.get("http://localhost:4000/api/admin/dashboard-analytics", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user metrics", error);
      throw error;
    }
  },
   extractRegistrationTrends(metrics) {
    return metrics.registrationTrends || [];
  },

  extractActivityDistribution(metrics) {
    return metrics.activityDistribution || [];
  },

  extractLoginActivity(metrics) {
    return metrics.loginActivity || [];
  },
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatsCard = ({
  title,
  value,
  icon,
  change,
  backgroundColor,
  iconBackground,
}) => {
  return (
    <div
      className={`
      ${backgroundColor || "bg-white"} 
      shadow-md 
      rounded-xl 
      p-6 
      transform 
      transition-all 
      duration-300 
      hover:-translate-y-2 
      hover:shadow-lg
    `}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {change && (
            <p
              className={`
              text-sm 
              ${change.startsWith("+") ? "text-green-600" : "text-red-600"}
            `}
            >
              {change}
            </p>
          )}
        </div>
        <div
          className={`
            ${iconBackground || "bg-blue-100"} 
            p-3 
            rounded-full 
            flex 
            items-center 
            justify-center
          `}
        >
          {typeof icon === "string" ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            icon
          )}
        </div>
      </div>
    </div>
  );
};

const Overview = () => {
  const [userMetrics, setUserMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    loginsToday: 0,
    uniqueVisitors: 0,
    subscribers: 0,
    averageSessionDuration: "0 mins",
  });

  const [registrationTrends, setRegistrationTrends] = useState([]);
  const [activityDistribution, setActivityDistribution] = useState([]);
  const [loginActivity, setLoginActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserMetrics = async () => {
      try {
        const metrics = await UserAnalyticsService.getUserMetrics();

        console.log("Full Metrics:", metrics);
        console.log("Registration Trends:", metrics.registrationTrends);

        setUserMetrics({
          totalUsers: metrics.totalUsers,
          activeUsers: metrics.activeUsers,
          newUsersToday: metrics.newUsersToday,
          loginsToday: metrics.loginsToday,
          uniqueVisitors: metrics.uniqueVisitors,
          subscribers: metrics.subscribers,
          averageSessionDuration: metrics.averageSessionDuration,
        });

        setRegistrationTrends(
          UserAnalyticsService.extractRegistrationTrends(metrics)
        );

        setActivityDistribution(
          UserAnalyticsService.extractActivityDistribution(metrics)
        );

        setLoginActivity(UserAnalyticsService.extractLoginActivity(metrics));

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user metrics", error);
        setLoading(false);
      }
    };

    fetchUserMetrics();
  }, []);

  if (loading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            User Analytics Dashboard
          </h2>
        </div>

        {/* User Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={userMetrics.totalUsers}
            icon={<UserGroupIcon className="h-6 w-6 text-blue-500" />}
            change="+5.2% this month"
            backgroundColor="bg-white"
            iconBackground="bg-blue-100"
          />
          <StatsCard
            title="Active Users"
            value={userMetrics.activeUsers}
            icon={<UsersIcon className="h-6 w-6 text-green-500" />}
            change="+3.8% from last week"
            backgroundColor="bg-white"
            iconBackground="bg-green-100"
          />
          <StatsCard
            title="New Users Today"
            value={userMetrics.newUsersToday}
            icon={<UserAddIcon className="h-6 w-6 text-purple-500" />}
            change="+12.5% from yesterday"
            backgroundColor="bg-white"
            iconBackground="bg-purple-100"
          />
        </div>

        {/* Secondary Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Logins Today"
            value={userMetrics.loginsToday}
            icon={<ClockIcon className="h-6 w-6 text-orange-500" />}
            change="+7.2% from last week"
            backgroundColor="bg-white"
            iconBackground="bg-orange-100"
          />
          <StatsCard
            title="Unique Visitors"
            value={userMetrics.uniqueVisitors}
            icon={<DatabaseIcon className="h-6 w-6 text-teal-500" />}
            change="+6.5% this month"
            backgroundColor="bg-white"
            iconBackground="bg-teal-100"
          />
          <StatsCard
            title="Subscribers"
            value={userMetrics.subscribers}
            icon={<TrendingUpIcon className="h-6 w-6 text-red-500" />}
            change="+4.1% from last month"
            backgroundColor="bg-white"
            iconBackground="bg-red-100"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Registration Trend */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              User Registration Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={registrationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="registrations"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* User Activity Distribution */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              User Activity Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={activityDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {activityDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Login Activity */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Login Time Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={loginActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="logins" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                User Engagement Metrics
              </h3>
              <ChartBarIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Session Duration</span>
                <span className="font-bold text-gray-800">
                  {userMetrics.averageSessionDuration}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Most Active Time</span>
                <span className="font-bold text-gray-800">Evening</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent User Activities
              </h3>
              <UsersIcon className="h-6 w-6 text-green-500" />
            </div>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">New User Registration</span>
                <span className="text-sm text-gray-500">5 mins ago</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">User Login</span>
                <span className="text-sm text-gray-500">15 mins ago</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Profile Updated</span>
                <span className="text-sm text-gray-500">30 mins ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
