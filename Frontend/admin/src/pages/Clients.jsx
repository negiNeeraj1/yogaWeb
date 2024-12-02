import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Edit2,
  UserCheck,
  UserX,
  MoreVertical,
  PlusCircle,
} from "lucide-react";

const Clients = () => {
  const clients = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      sessions: 5,
      active: true,
      course: "Yoga 101",
      level: "Beginner",
      photo: "https://images.unsplash.com/photo-1603791440634-d4f15b48b1f0",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      sessions: 8,
      active: true,
      course: "Advanced Yoga",
      level: "Advanced",
      photo: "https://images.unsplash.com/photo-1601474539439-d2047faff5f1",
    },
    {
      id: 3,
      name: "Sam Wilson",
      email: "sam@example.com",
      sessions: 3,
      active: false,
      course: "Yoga for Beginners",
      level: "Intermediate",
      photo: "https://images.unsplash.com/photo-1596495577884-bfef0330c41d",
    },
    {
      id: 4,
      name: "Emma Brown",
      email: "emma@example.com",
      sessions: 0,
      active: false,
      course: "Basic Yoga",
      level: "Beginner",
      photo: "https://images.unsplash.com/photo-1512950675312-e6899880ab87",
    },
    {
      id: 5,
      name: "Chris Lee",
      email: "chris@example.com",
      sessions: 10,
      active: true,
      course: "Advanced Yoga",
      level: "Advanced",
      photo: "https://images.unsplash.com/photo-1560807707-8cc7777c7f7f",
    },
    {
      id: 6,
      name: "Anna Taylor",
      email: "anna@example.com",
      sessions: 0,
      active: false,
      course: "Yoga Basics",
      level: "Beginner",
      photo: "https://images.unsplash.com/photo-1541479788290-df498e9cd9fc",
    },
  ];

  const [selectedClient, setSelectedClient] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState(null);

  // Filter clients by search query and other filters (active/inactive)
  const filteredClients = clients.filter((client) => {
    const isMatchingSearchQuery = client.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isActiveFilter =
      filter === "active"
        ? client.active
        : filter === "inactive"
        ? !client.active
        : true;

    return isMatchingSearchQuery && isActiveFilter;
  });

  // Handle click outside to close modal
  const handleClickOutside = (event) => {
    if (event.target.id === "modal-overlay") {
      setSelectedClient(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle edit form input change
  const handleInputChange = (e) => {
    setEditedClient({
      ...editedClient,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit form for saving changes
  const handleSaveChanges = () => {
    const updatedClients = clients.map((client) =>
      client.id === editedClient.id ? editedClient : client
    );
    setEditedClient(null);
    setIsEditing(false);
    setSelectedClient(
      updatedClients.find((client) => client.id === editedClient.id)
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800 flex items-center">
            <Users className="mr-3 text-indigo-600" size={32} />
            Clients Management
          </h2>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <PlusCircle className="mr-2" size={20} />
            Add New Client
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex space-x-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search clients by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-lg flex items-center ${
                filter === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFilter("all")}
            >
              <Users className="mr-2" size={16} />
              All ({clients.length})
            </button>
            <button
              className={`px-4 py-2 rounded-lg flex items-center ${
                filter === "active"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFilter("active")}
            >
              <UserCheck className="mr-2" size={16} />
              Active ({clients.filter((client) => client.active).length})
            </button>
            <button
              className={`px-4 py-2 rounded-lg flex items-center ${
                filter === "inactive"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFilter("inactive")}
            >
              <UserX className="mr-2" size={16} />
              Inactive ({clients.filter((client) => !client.active).length})
            </button>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              {[
                "Client",
                "Email",
                "Course",
                "Sessions",
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
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedClient(client)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={client.photo}
                      alt={client.name}
                      className="w-10 h-10 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {client.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {client.level}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {client.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {client.course}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {client.sessions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      client.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {client.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <div className="text-center py-10 bg-gray-50">
            <p className="text-gray-500 mb-4">No clients found</p>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Add Your First Client
            </button>
          </div>
        )}
      </div>

      {/* Modal Section */}
      {selectedClient && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <MoreVertical size={24} />
            </button>

            <div className="flex items-center mb-6">
              <img
                src={selectedClient.photo}
                alt="Client"
                className="w-24 h-24 rounded-full object-cover mr-6 border-4 border-indigo-100"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  {selectedClient.name}
                  <button
                    className="ml-3 text-indigo-600 hover:text-indigo-800"
                    onClick={() => {
                      setIsEditing(true);
                      setEditedClient({ ...selectedClient });
                    }}
                  >
                    <Edit2 size={20} />
                  </button>
                </h3>
                <p className="text-gray-600">{selectedClient.email}</p>
                <p className="text-gray-500">
                  {selectedClient.sessions} sessions attended
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Course Details
              </h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>Course:</strong> {selectedClient.course}
                </p>
                <p className="text-gray-600">
                  <strong>Level:</strong> {selectedClient.level}
                </p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                    selectedClient.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedClient.active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <div className="mt-4">
                <input
                  type="text"
                  name="name"
                  value={editedClient.name}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={editedClient.email}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                  placeholder="Email"
                />
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
