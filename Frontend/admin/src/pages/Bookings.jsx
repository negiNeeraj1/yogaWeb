import React, { useState } from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  PlusCircle,
  MoreVertical,
  Calendar,
  User,
  MessageCircle,
} from "lucide-react";

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const bookings = [
    {
      id: 1,
      name: "John Doe",
      date: "2024-11-25",
      status: "Confirmed",
      service: "Spa Treatment",
      time: "10:00 AM",
      staff: "Emma Johnson",
      notes: "Prefer lavender oil",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2024-11-26",
      status: "Pending",
      service: "Massage Therapy",
      time: "2:30 PM",
      staff: "Mike Rodriguez",
      notes: "First-time client",
    },
    {
      id: 3,
      name: "Sam Wilson",
      date: "2024-11-27",
      status: "Cancelled",
      service: "Hair Styling",
      time: "11:45 AM",
      staff: "Sarah Lee",
      notes: "Rescheduled",
    },
    {
      id: 4,
      name: "Emily Chen",
      date: "2024-11-28",
      status: "Confirmed",
      service: "Facial Treatment",
      time: "4:15 PM",
      staff: "David Kim",
      notes: "Sensitive skin",
    },
  ];

  // Status icon and color mapping
  const statusConfig = {
    Confirmed: {
      icon: CheckCircle,
      color: "text-green-600 bg-green-50",
      bgColor: "bg-green-100",
    },
    Pending: {
      icon: Clock,
      color: "text-yellow-600 bg-yellow-50",
      bgColor: "bg-yellow-100",
    },
    Cancelled: {
      icon: XCircle,
      color: "text-red-600 bg-red-50",
      bgColor: "bg-red-100",
    },
  };

  // Filtered and searched bookings
  const filteredBookings = bookings.filter(
    (booking) =>
      (filter === "All" || booking.status === filter) &&
      (booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800 flex items-center">
            <Calendar className="mr-3 text-indigo-600" size={32} />
            Bookings Management
          </h2>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <PlusCircle className="mr-2" size={20} />
            Create New Booking
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex space-x-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search bookings by name or service"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none w-full pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <Filter
              className="absolute right-3 top-3 text-gray-400"
              size={20}
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              {[
                "Booking ID",
                "Client",
                "Service",
                "Date & Time",
                "Staff",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBookings.map((booking) => {
              const status = statusConfig[booking.status];
              return (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    #{booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="mr-2 text-gray-400" size={20} />
                      <span className="font-medium text-gray-900">
                        {booking.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {booking.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="mr-2 text-gray-400" size={16} />
                      {booking.date} | {booking.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {booking.staff}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.color} ${status.bgColor}`}
                    >
                      <span className="mr-2">
                        <status.icon size={16} />
                      </span>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                        <MessageCircle size={20} />
                      </button>
                      <button className="text-gray-500 hover:text-blue-600 transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-10 bg-gray-50">
            <p className="text-gray-500 mb-4">No bookings found</p>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Create Your First Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
