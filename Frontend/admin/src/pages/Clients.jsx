import React, { useState, useEffect } from "react";
import { Users, Search, Edit, Trash2, UserPlus, X } from "lucide-react";
import { getAdminProfile } from "../api/api";

const UserManagement = () => {
  // State Management
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membershipType: "Basic",
    status: "active",
    preferredClass: "Morning Yoga",
    healthConditions: "",
    emergencyContact: "",
  });

  const [editForm, setEditForm] = useState({
    Fname: "",
    Lname: "",
    email: "",
    phone_Number: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString();
    } catch (error) {
      return "N/A";
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleString();
    } catch (error) {
      return "N/A";
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setError(null);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.id) {
        const response = await getAdminProfile(storedUser.id);

        if (response.success && response.user) {
          const transformedUser = {
            id: response.user._id,
            name: `${response.user.Fname || ""} ${
              response.user.Lname || ""
            }`.trim(),
            Fname: response.user.Fname || "",
            Lname: response.user.Lname || "",
            email: response.user.email,
            phone: response.user.phone_Number || "N/A",
            membershipType: response.user.membershipType || "N/A",
            joinDate: formatDate(response.user.createdAt),
            totalClasses: response.user.sessionDurations?.length || 0,
            status: response.user.accountStatus || "inactive",
            paymentStatus: response.user.subscriptionStatus || "N/A",
            preferredClass: response.user.preferredStyle || "N/A",
            healthConditions:
              response.user.medicalConditions?.join(", ") || "None",
            emergencyContact: response.user.phone_Number || "N/A",
            experienceLevel: response.user.experienceLevel || "N/A",
            fitnessGoals: response.user.fitnessGoals?.join(", ") || "None",
            lastLogin: formatDateTime(response.user.lastLogin),
          };
          setUsers([transformedUser]);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to load user profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      Fname: user.Fname,
      Lname: user.Lname,
      email: user.email,
      phone_Number: user.phone,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await updateUser(editingUser.id, editForm);

      // For now, just update the local state
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              name: `${editForm.Fname} ${editForm.Lname}`,
              Fname: editForm.Fname,
              Lname: editForm.Lname,
              email: editForm.email,
              phone: editForm.phone_Number,
              emergencyContact: editForm.phone_Number,
            }
          : user
      );

      setUsers(updatedUsers);
      setIsEditModalOpen(false);
      // Add a success message here
    } catch (error) {
      console.error("Error updating user:", error);
      // Add error handling here
    }
  };

  // Filter users
  const filteredUsers = users.filter((user) => {

    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 text-gray-700 dark:text-white">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="mr-2" />
            User Profile
          </h1>
        </div>

        {/* Loading and Error States */}
        {loading && <div className="text-center py-8">Loading profile...</div>}

        {error && (
          <div className="text-center py-8 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Users Table */}
        {!loading && !error && (
          <div className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <table className="w-full">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Membership
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Health & Goals
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                            {user.Fname}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            Joined: {user.joinDate}
                          </div>
                          <div className="text-sm text-gray-500">
                            Last login: {user.lastLogin}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{user.phone}</div>
                      <div className="text-sm text-gray-500">
                        Experience: {user.experienceLevel}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{user.membershipType}</div>
                      <div className="text-sm text-gray-500">
                        Preferred: {user.preferredClass}
                      </div>
                      <div className="text-sm text-gray-500">
                        Classes: {user.totalClasses}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        Health: {user.healthConditions}
                      </div>
                      <div className="text-sm text-gray-500">
                        Goals: {user.fitnessGoals}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isEditModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Edit User Profile
                    </h2>
                    <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={editForm.Fname}
                        onChange={(e) =>
                          setEditForm({ ...editForm, Fname: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={editForm.Lname}
                        onChange={(e) =>
                          setEditForm({ ...editForm, Lname: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={editForm.phone_Number}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            phone_Number: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
