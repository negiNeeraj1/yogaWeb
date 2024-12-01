import React, { useState, useEffect } from "react";

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
      photo: "https://images.unsplash.com/photo-1603791440634-d4f15b48b1f0"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@example.com", 
      sessions: 8, 
      active: true, 
      course: "Advanced Yoga", 
      level: "Advanced", 
      photo: "https://images.unsplash.com/photo-1601474539439-d2047faff5f1"
    },
    { 
      id: 3, 
      name: "Sam Wilson", 
      email: "sam@example.com", 
      sessions: 3, 
      active: false, 
      course: "Yoga for Beginners", 
      level: "Intermediate", 
      photo: "https://images.unsplash.com/photo-1596495577884-bfef0330c41d"
    },
    { 
      id: 4, 
      name: "Emma Brown", 
      email: "emma@example.com", 
      sessions: 0, 
      active: false, 
      course: "Basic Yoga", 
      level: "Beginner", 
      photo: "https://images.unsplash.com/photo-1512950675312-e6899880ab87"
    },
    { 
      id: 5, 
      name: "Chris Lee", 
      email: "chris@example.com", 
      sessions: 10, 
      active: true, 
      course: "Advanced Yoga", 
      level: "Advanced", 
      photo: "https://images.unsplash.com/photo-1560807707-8cc7777c7f7f"
    },
    { 
      id: 6, 
      name: "Anna Taylor", 
      email: "anna@example.com", 
      sessions: 0, 
      active: false, 
      course: "Yoga Basics", 
      level: "Beginner", 
      photo: "https://images.unsplash.com/photo-1541479788290-df498e9cd9fc"
    },
  ];

  const [selectedClient, setSelectedClient] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState(null);

  // Filter clients by search query and other filters (active/inactive)
  const filteredClients = clients.filter((client) => {
    const isMatchingSearchQuery = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const isActiveFilter = filter === "active" ? client.active : filter === "inactive" ? !client.active : true;
    
    return isMatchingSearchQuery && isActiveFilter;
  });

  // Handle click outside to close modal
  const handleClickOutside = (event) => {
    if (event.target.id === "modal-overlay") {
      setSelectedClient(null); // Close modal when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside); // Cleanup
  }, []);

  // Handle edit form input change
  const handleInputChange = (e) => {
    setEditedClient({
      ...editedClient,
      [e.target.name]: e.target.value
    });
  };

  // Handle submit form for saving changes
  const handleSaveChanges = () => {
    const updatedClients = clients.map((client) =>
      client.id === editedClient.id ? editedClient : client
    );
    setEditedClient(null);
    setIsEditing(false);
    setSelectedClient(updatedClients.find(client => client.id === editedClient.id)); // Update selected client
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-purple-600 ">Clients</h2>

      {/* Search Bar */}
      <div className="mb-6 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search Clients..."
          className="p-2 border border-gray-300 rounded-lg w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Section */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg text-white font-medium ${filter === "all" ? "bg-purple-600" : "bg-purple-300"}`}
          onClick={() => setFilter("all")}
        >
          Total Users: {clients.length}
        </button>
        <button
          className={`px-6 py-2 rounded-lg text-white font-medium ${filter === "active" ? "bg-purple-600" : "bg-purple-300"}`}
          onClick={() => setFilter("active")}
        >
          Active Users: {clients.filter((client) => client.active).length}
        </button>
        <button
          className={`px-6 py-2 rounded-lg text-white font-medium ${filter === "inactive" ? "bg-purple-600" : "bg-purple-300"}`}
          onClick={() => setFilter("inactive")}
        >
          Non-Purchasing Users: {clients.filter((client) => !client.active).length}
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Sessions Attended</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelectedClient(client)}
              >
                <td className="px-4 py-2 border text-gray-600">{client.id}</td>
                <td className="px-4 py-2 border text-gray-600">{client.name}</td>
                <td className="px-4 py-2 border text-gray-600">{client.email}</td>
                <td className="px-4 py-2 border text-gray-600">{client.sessions}</td>
                <td className="px-4 py-2 border text-gray-600">
                  {client.active ? (
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-sm">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-sm">
                      Inactive
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Section */}
      {selectedClient && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center mb-4">
              <img
                src={selectedClient.photo}
                alt="Client"
                className="w-20 h-20 rounded-full object-cover mr-6"
              />
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {selectedClient.name}
                  {/* Edit Button */}
                  <button
                    className="ml-2 text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      setIsEditing(true);
                      setEditedClient({ ...selectedClient });
                    }}
                  >
                    Edit
                  </button>
                </h3>
                <p className="text-gray-600">{selectedClient.email}</p>
                <p className="text-gray-500">{selectedClient.sessions} sessions attended</p>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800">Course Details:</h4>
              <p className="text-gray-600">Course: {selectedClient.course}</p>
              <p className="text-gray-600">Level: {selectedClient.level}</p>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editedClient.name}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg w-full mb-2"
                />
                <input
                  type="email"
                  name="email"
                  value={editedClient.email}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg w-full mb-2"
                />
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={handleSaveChanges}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedClient(null)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
