import React, { useState, useEffect } from "react";
import {
  Edit3,
  Trash2,
  Filter,
  PlusCircle,
  Calendar,
  MapPin,
  Clock,
  Search,
  X,
  Info,
} from "lucide-react";

const ManageCoursesPage = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Yoga Basics",
      level: "Beginner",
      price: 1500,
      description: "Introductory yoga class for complete beginners",
      instructor: "Sarah Johnson",
      venue: "Downtown Yoga Studio",
      date: "2024-07-15",
      time: "06:00 AM",
      duration: "60 minutes",
      maxParticipants: 20,
    },
    {
      id: 2,
      name: "Power Yoga",
      level: "Intermediate",
      price: 3000,
      description: "High-intensity yoga flow for fitness enthusiasts",
      instructor: "Mike Rodriguez",
      venue: "Fitness Center Yoga Hall",
      date: "2024-07-20",
      time: "07:00 AM",
      duration: "75 minutes",
      maxParticipants: 15,
    },
    {
      id: 3,
      name: "Advanced Yoga Techniques",
      level: "Advanced",
      price: 5000,
      description: "Advanced asanas and meditation techniques",
      instructor: "Elena Petrova",
      venue: "Zen Yoga Retreat",
      date: "2024-07-25",
      time: "05:30 AM",
      duration: "90 minutes",
      maxParticipants: 10,
    },
  ]);

  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [filterLevel, setFilterLevel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ... [Previous CourseModal and CourseDetailsModal components remain the same]

  // Add a new course
  const addCourse = (newCourse) => {
    const courseToAdd = {
      ...newCourse,
      id: Date.now(),
    };
    const updatedCourses = [...courses, courseToAdd];
    setCourses(updatedCourses);
    setFilteredCourses(updatedCourses);
  };

  // Edit an existing course
  const editCourse = (updatedCourse) => {
    const updatedCourses = courses.map((course) =>
      course.id === updatedCourse.id ? updatedCourse : course
    );
    setCourses(updatedCourses);
    setFilteredCourses(updatedCourses);
  };

  // Delete a course
  const deleteCourse = (id) => {
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
    setFilteredCourses(updatedCourses);
  };

  // Filter courses
  useEffect(() => {
    let result = courses;

    if (filterLevel) {
      result = result.filter((course) => course.level === filterLevel);
    }

    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(result);
  }, [filterLevel, searchTerm, courses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Yoga Course Management
          </h1>
          <button
            onClick={() => {
              setCurrentCourse(null);
              setIsModalOpen(true);
            }}
            className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <PlusCircle className="mr-2" size={20} />
            Add Course
          </button>
        </div>

        {/* Filtering Section */}
        <div className="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-3.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search courses or instructors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
            />
          </div>

          <div className="relative">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <Filter
              className="absolute right-3 top-3.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 relative"
            >
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => {
                    setCurrentCourse(course);
                    setIsDetailsModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Info size={20} />
                </button>
                <button
                  onClick={() => {
                    setCurrentCourse(course);
                    setIsModalOpen(true);
                  }}
                  className="text-green-600 hover:text-green-800 transition-colors"
                >
                  <Edit3 size={20} />
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this course?"
                      )
                    ) {
                      deleteCourse(course.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-indigo-600">
                {course.name}
              </h2>
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 text-green-600" size={16} />
                <p className="text-sm text-gray-600">
                  {course.date} at {course.time}
                </p>
              </div>
              <div className="flex items-center mb-2">
                <MapPin className="mr-2 text-red-600" size={16} />
                <p className="text-sm text-gray-600">{course.venue}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs">
                  {course.level}
                </span>
                <span className="font-semibold text-gray-700">
                  ₹{course.price.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* No Courses Found */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <p className="text-xl text-gray-500">No courses found</p>
            <p className="text-sm text-gray-400 mt-2">
              Try adjusting your search or filter
            </p>
          </div>
        )}

        {/* Modals */}
        {isModalOpen && (
          <CourseModal
            course={currentCourse}
            onClose={() => setIsModalOpen(false)}
            onSave={currentCourse ? editCourse : addCourse}
          />
        )}

        {isDetailsModalOpen && currentCourse && (
          <CourseDetailsModal
            course={currentCourse}
            onClose={() => setIsDetailsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ManageCoursesPage;
