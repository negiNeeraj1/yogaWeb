import React, { useEffect, useRef, useState } from "react";
import {
  Users,
  Calendar,
  Search,
  Filter,
  PlusCircle,
  MoreVertical,
  BookOpen,
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  X,
  Edit,
  Trash2,
  Medal,
  List,
  Info,
  Star,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";
import { createClass, getClass } from "../api/api";

const TableSection = ({
  title,
  children,
  Icon,
  searchTerm,
  onSearchChange,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
          {Icon && <Icon className="mr-2 text-indigo-600" size={20} />}
          {title}
        </h3>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>
      </div>
    </div>
    <div className="p-4">{children}</div>
  </div>
);


const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-[50rem] p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const ClassManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);
  const [mainSearchTerm, setMainSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [classes, setClasses] = useState([]);

  const [equipment, setEquipment] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);

  const [newClass, setNewClass] = useState({
    className: "",
    category: "",
    instructor: "676fe9ff5e7aadf22aced5fe",
    description: "",
    schedule: {
      startDate: "",
      endDate: "",
      daysOfWeek: [],
      startTime: "",
      endTime: "",
      timeZone: "UTC+5:30",
    },
    type: "Online",
    totalClasses: 12,
    capacity: 30,
    difficulty: "beginner",
    
    status: "Upcoming",
    equipmentNeeded: [],
    remainingClasses: 12,
    price: 0,
    renewal: false,
    feedback: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await getClass();
      if (response.success) {
        setClasses(response.data);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const formatInstructorName = (instructor) => {
    if (!instructor) return "N/A";
    if (typeof instructor === "string") return instructor;
    return instructor.email || "N/A";
  };
  const handleEquipmentAdd = () => {
    if (equipment.trim()) {
      setNewClass((prev) => ({
        ...prev,
        equipmentNeeded: [...prev.equipmentNeeded, equipment.trim()],
      }));
      setEquipment("");
    }
  };

  const handleDayToggle = (day) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedDays);
    setNewClass((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        daysOfWeek: updatedDays,
      },
    }));
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter((cls) => cls.id !== id));
    setIsDeleteModalOpen(false);
    setSelectedClass(null);
  };

  const handleEditClick = (classData) => {
    setSelectedClass(classData);
    setNewClass({
      ...classData,
      students: String(classData.students),
    });
    setIsAddModalOpen(true);
    setOpenDropdownId(null);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleAddClass = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (selectedClass) {
        
        
      } else {
        response = await createClass(newClass);

        if (response.success) {
          await fetchClasses();
          setClasses([...classes, response.data]);
          setIsAddModalOpen(false);
          setNewClass({
            className: "",
            category: "",
            instructor: "676fe9ff5e7aadf22aced5fe",
            description: "",
            schedule: {
              startDate: "",
              endDate: "",
              daysOfWeek: [],
              startTime: "",
              endTime: "",
              timeZone: "UTC+5:30",
            },
            totalClasses: 12,
            Difficulty: "",
            capacity: 30,
            
            status: "Upcoming",
            equipmentNeeded: [],
            remainingClasses: 12,
            price: 0,
            renewal: false,
            feedback: "",
          });
          setSelectedDays([]);
        }
      }
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  const formatClassData = (classData) => {
    const formatDaysOfWeek = (days) => {
      const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      return days?.map((day) => dayNames[day - 1]).join(", ") || "N/A";
    };

    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    return {
      ...classData,
      schedule: `${classData.schedule?.startTime || ""} - ${
        classData.schedule?.endTime || ""
      }`,
      duration: calculateDuration(
        classData.schedule?.startTime,
        classData.schedule?.endTime
      ),
      resources: classData.equipmentNeeded || [],
      formattedInstructor: formatInstructorName(classData.instructor),
      scheduleDetails: {
        startDate: formatDate(classData.schedule?.startDate),
        endDate: formatDate(classData.schedule?.endDate),
        days: formatDaysOfWeek(classData.schedule?.daysOfWeek),
        startTime: classData.schedule?.startTime || "N/A",
        endTime: classData.schedule?.endTime || "N/A",
        timeZone: classData.schedule?.timeZone || "UTC+5:30",
      },
    };
  };

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`2000/01/01 ${startTime}`);
    const end = new Date(`2000/01/01 ${endTime}`);
    const diff = (end - start) / (1000 * 60);
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
  };

  const statusConfig = {
    "In Progress": {
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/50",
    },
    Upcoming: {
      icon: Calendar,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
    },
    Completed: {
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/50",
    },
    Cancelled: {
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/50",
    },
  };

  const getFilteredClasses = () => {
    let filtered = classes.map(formatClassData);

    if (mainSearchTerm) {
      filtered = filtered.filter((cls) =>
        Object.values(cls).some((value) =>
          String(value).toLowerCase().includes(mainSearchTerm.toLowerCase())
        )
      );
    }
    if (statusFilter !== "All") {
      filtered = filtered.filter((cls) => cls.status === statusFilter);
    }

    return filtered;
  };

  const filteredClasses = getFilteredClasses();

  return (
    <div className="min-h-screen dark:bg-gray-900 p-4">
      <div className="max-w-[85rem] mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
              <GraduationCap className="mr-3 text-indigo-600" size={32} />
              Yoga Class Management
            </h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle className="mr-2" size={20} />
              Add New Class
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {[
              { label: "Total Classes", value: "12", icon: BookOpen },
              { label: "Total Students", value: "345", icon: Users },
              { label: "Active Classes", value: "8", icon: Clock },
              { label: "Average Attendance", value: "91%", icon: CheckCircle },
              { label: "Yoga Categories", value: "12", icon: List },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className="text-indigo-600" size={24} />
                </div>
              </div>
            ))}
          </div>

          {/* Search and Filter Section */}
          <div className="flex gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search all classes..."
                value={mainSearchTerm}
                onChange={(e) => setMainSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="All">All Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* edit */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setSelectedClass(null);
            setNewClass({
              className: "",
              category: "",
              instructor: "",
              description: "",
              schedule: {
                startDate: "",
                endDate: "",
                daysOfWeek: [],
                startTime: "",
                endTime: "",
                timeZone: "UTC+5:30",
              },
              totalClasses: 12,
              capacity: 30,
              difficulty: "",
              room: "",
              status: "Upcoming",
              equipmentNeeded: [],
              remainingClasses: 12,
              price: 0,
              renewal: false,
              feedback: "",
            });
            setSelectedDays([]);
          }}
          title={selectedClass ? "Edit Class" : "Add New Class"}
        >
          <form onSubmit={handleAddClass} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Class Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newClass.className}
                    onChange={(e) =>
                      setNewClass({ ...newClass, className: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={newClass.category}
                    onChange={(e) =>
                      setNewClass({ ...newClass, category: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newClass.description}
                    onChange={(e) =>
                      setNewClass({ ...newClass, description: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Equipment Needed
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={equipment}
                      onChange={(e) => setEquipment(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Add equipment..."
                    />
                    <button
                      type="button"
                      onClick={handleEquipmentAdd}
                      className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {newClass.equipmentNeeded.map((item, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() =>
                            setNewClass((prev) => ({
                              ...prev,
                              equipmentNeeded: prev.equipmentNeeded.filter(
                                (_, i) => i !== index
                              ),
                            }))
                          }
                          className="ml-2 text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Capacity
                    </label>
                    <input
                      type="number"
                      required
                      value={newClass.capacity}
                      onChange={(e) =>
                        setNewClass({
                          ...newClass,
                          capacity: parseInt(e.target.value),
                        })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Price
                    </label>
                    <input
                      type="number"
                      required
                      value={newClass.price}
                      onChange={(e) =>
                        setNewClass({
                          ...newClass,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newClass.schedule.startDate}
                      onChange={(e) =>
                        setNewClass({
                          ...newClass,
                          schedule: {
                            ...newClass.schedule,
                            startDate: e.target.value,
                          },
                        })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newClass.schedule.endDate}
                      onChange={(e) =>
                        setNewClass({
                          ...newClass,
                          schedule: {
                            ...newClass.schedule,
                            endDate: e.target.value,
                          },
                        })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Time
                    </label>
                    <input
                      type="time"
                      required
                      value={newClass.schedule.startTime}
                      onChange={(e) =>
                        setNewClass({
                          ...newClass,
                          schedule: {
                            ...newClass.schedule,
                            startTime: e.target.value,
                          },
                        })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Time
                    </label>
                    <input
                      type="time"
                      required
                      value={newClass.schedule.endTime}
                      onChange={(e) =>
                        setNewClass({
                          ...newClass,
                          schedule: {
                            ...newClass.schedule,
                            endTime: e.target.value,
                          },
                        })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Days of Week
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day, index) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleDayToggle(index + 1)}
                          className={`px-3 py-1 rounded ${
                            selectedDays.includes(index + 1)
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {day}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Difficulty Level
                  </label>
                  <select
                    value={newClass.difficulty}
                    onChange={(e) =>
                      setNewClass({ ...newClass, difficulty: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type
                  </label>
                  <select
                    value={newClass.type}
                    onChange={(e) =>
                      setNewClass({ ...newClass, type: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="Beginner">Online</option>
                    <option value="Intermediate">Offline</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newClass.renewal}
                      onChange={(e) =>
                        setNewClass({ ...newClass, renewal: e.target.checked })
                      }
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Allow Renewal
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setSelectedClass(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                {selectedClass ? "Update Class" : "Add Class"}
              </button>
            </div>
          </form>
        </Modal>

        {/* delete */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedClass(null);
          }}
          title="Delete Class"
        >
          <div className="mt-2">
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this class? This action cannot be
              undone.
            </p>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedClass(null);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteClass(selectedClass.id)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </Modal>

        <TableSection
          title="Active Classes"
          icon={BookOpen}
          searchTerm={mainSearchTerm}
          onSearchChange={setMainSearchTerm}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Class Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Start Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    End Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Capacity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Lessions
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredClasses.map((cls) => (
                  <tr
                    key={cls._id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-600 ${
                      cls.id % 2 === 0
                        ? "dark:bg-gray-700"
                        : "dark:bg-slate-800"
                    }`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {cls.className}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {cls.category}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {cls.scheduleDetails.startDate}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {cls.scheduleDetails.endDate}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {cls.capacity}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            cls.status === "In Progress"
                              ? "bg-green-100 text-green-800"
                              : cls.status === "Upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : cls.status === "Completed"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                          }`}
                      >
                        {cls.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <Link
                        to={`/video/${cls._id}`}
                        state={{ classData: cls }}
                        className="text-indigo-600 hover:text-indigo-700 flex items-center"
                      >
                        <Video className="mr-1" size={16} />
                        View Lessons
                      </Link>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(cls)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedClass(cls);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TableSection>

        {/* Classes Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Class Information */}
          <TableSection
            title="Class Schedule"
            icon={Calendar}
            searchTerm={mainSearchTerm}
            onSearchChange={setMainSearchTerm}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Duration
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Days
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Instructor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredClasses.map((cls) => (
                    <tr
                      key={cls._id }
                      className={`hover:bg-gray-50 dark:hover:bg-gray-600 ${
                        cls.id % 2 === 0
                          ? "dark:bg-gray-700"
                          : "dark:bg-slate-800"
                      }`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {cls.schedule}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {cls.duration}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {cls.scheduleDetails.days}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {cls.formattedInstructor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TableSection>

          {/* Enrollment Details */}
          <TableSection
            title="Enrollment Overview"
            icon={Users}
            searchTerm={mainSearchTerm}
            onSearchChange={setMainSearchTerm}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Class
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Enrolled
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Attendance
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Difficulty
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredClasses.map((cls) => (
                    <tr
                      key={cls._id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-600 ${
                        cls.id % 2 === 0
                          ? "dark:bg-gray-700"
                          : "dark:bg-slate-800"
                      }`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {cls.className}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {cls.students} students
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {cls.attendance || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {cls.difficulty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TableSection>

          {/* Equipment and Resources */}
          <TableSection
            title="Room and Equipment"
            icon={Info}
            searchTerm={mainSearchTerm}
            onSearchChange={setMainSearchTerm}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Room
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Capacity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Equipment Required
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredClasses.map((cls) => (
                    <tr
                      key={cls._id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-600 ${
                        cls.id % 2 === 0
                          ? "dark:bg-gray-700"
                          : "dark:bg-slate-800"
                      }`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {cls.room}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {cls.capacity} people
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {cls.type}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {cls.resources.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TableSection>
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;
