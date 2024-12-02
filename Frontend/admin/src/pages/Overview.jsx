import React, { useState } from "react";
import {
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  TrendingUpIcon,
  ChartBarIcon,
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

// Dummy data for charts
const bookingData = [
  { name: "Jan", bookings: 40 },
  { name: "Feb", bookings: 30 },
  { name: "Mar", bookings: 50 },
  { name: "Apr", bookings: 75 },
  { name: "May", bookings: 60 },
  { name: "Jun", bookings: 85 },
];

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 7500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 8500 },
];

const clientData = [
  { name: "Yoga Basics", value: 400 },
  { name: "Advanced Yoga", value: 300 },
  { name: "Meditation", value: 200 },
  { name: "Pilates", value: 150 },
];

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
  const [timePeriod, setTimePeriod] = useState("monthly");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Dashboard Overview
          </h2>
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-lg p-1 flex items-center space-x-1">
              <button
                onClick={() => setTimePeriod("monthly")}
                className={`
                  px-3 py-1 rounded-md text-sm 
                  ${
                    timePeriod === "monthly"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600"
                  }
                `}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimePeriod("yearly")}
                className={`
                  px-3 py-1 rounded-md text-sm 
                  ${
                    timePeriod === "yearly"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600"
                  }
                `}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Bookings"
            value="345"
            icon={<CalendarIcon className="h-6 w-6 text-blue-500" />}
            change="+12.5% from last month"
            backgroundColor="bg-white"
            iconBackground="bg-blue-100"
          />
          <StatsCard
            title="Total Clients"
            value="123"
            icon={<UserGroupIcon className="h-6 w-6 text-green-500" />}
            change="+8.2% from last month"
            backgroundColor="bg-white"
            iconBackground="bg-green-100"
          />
          <StatsCard
            title="Blog Views"
            value="12,345"
            icon={<DocumentTextIcon className="h-6 w-6 text-purple-500" />}
            change="+22.3% from last week"
            backgroundColor="bg-white"
            iconBackground="bg-purple-100"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bookings Line Chart */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Bookings Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Bar Chart */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Revenue Analysis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Client Distribution Pie Chart */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Client Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={clientData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {clientData.map((entry, index) => (
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
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Quick Insights
              </h3>
              <TrendingUpIcon className="h-6 w-6 text-green-500" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Revenue</span>
                <span className="font-bold text-gray-800">$45,678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Booking Value</span>
                <span className="font-bold text-gray-800">$132</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Activity
              </h3>
              <ChartBarIcon className="h-6 w-6 text-orange-500" />
            </div>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">New Client Registration</span>
                <span className="text-sm text-gray-500">2 mins ago</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Booking Confirmed</span>
                <span className="text-sm text-gray-500">15 mins ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
