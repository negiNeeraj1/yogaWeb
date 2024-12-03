import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const mockTrafficData = [
  { name: "Jan", visitors: 400, newVisitors: 240 },
  { name: "Feb", visitors: 300, newVisitors: 139 },
  { name: "Mar", visitors: 200, newVisitors: 980 },
  { name: "Apr", visitors: 278, newVisitors: 390 },
  { name: "May", visitors: 189, newVisitors: 480 },
  { name: "Jun", visitors: 239, newVisitors: 380 },
];

const mockRevenueData = [
  { name: "Jan", revenue: 4000, classes: 2400 },
  { name: "Feb", revenue: 3000, classes: 1398 },
  { name: "Mar", revenue: 2000, classes: 9800 },
  { name: "Apr", revenue: 2780, classes: 3908 },
  { name: "May", revenue: 1890, classes: 4800 },
  { name: "Jun", revenue: 2390, classes: 3800 },
];

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("traffic");

  const renderMetricCard = (title, value, Icon, trend) => (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <p className={`text-xs ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
        {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
      </p>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">
        Yoga Studio Analytics
      </h2>

      <div className="flex mb-6 space-x-2">
        {["traffic", "revenue", "engagement", "bookings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {renderMetricCard(
          "Total Visitors",
          "2,450",
          ({ className }) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={className}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          ),
          12
        )}
        {renderMetricCard(
          "Monthly Revenue",
          "$18,456",
          ({ className }) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={className}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          8
        )}
        {renderMetricCard(
          "Classes Booked",
          "320",
          ({ className }) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={className}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          ),
          15
        )}
        {renderMetricCard(
          "Growth Rate",
          "12.5%",
          ({ className }) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={className}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          ),
          20
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "traffic" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Website Traffic Overview
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={mockTrafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="newVisitors" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === "revenue" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Revenue and Class Performance
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="classes" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === "engagement" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">User Engagement</h3>
            <p className="text-gray-500">Engagement metrics coming soon...</p>
          </div>
        )}

        {activeTab === "bookings" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Bookings Overview</h3>
            <p className="text-gray-500">
              Detailed booking insights coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
