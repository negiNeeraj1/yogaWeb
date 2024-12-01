import React, { useState } from "react";

const ManageCoursesPage = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Yoga Basics", level: "Beginner", price: 1500 },
    { id: 2, name: "Power Yoga", level: "Intermediate", price: 3000 },
    { id: 3, name: "Advanced Yoga Techniques", level: "Advanced", price: 5000 },
  ]);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseLevel, setNewCourseLevel] = useState("Beginner");
  const [newCoursePrice, setNewCoursePrice] = useState("");

  // Add a new course
  const addCourse = () => {
    if (newCourseName.trim() === "" || newCoursePrice.trim() === "") {
      alert("Course name and price cannot be empty.");
      return;
    }

    if (isNaN(newCoursePrice) || newCoursePrice <= 0) {
      alert("Price must be a positive number.");
      return;
    }

    const newCourse = {
      id: Date.now(),
      name: newCourseName,
      level: newCourseLevel,
      price: parseFloat(newCoursePrice),
    };

    setCourses([...courses, newCourse]);
    setNewCourseName("");
    setNewCourseLevel("Beginner");
    setNewCoursePrice("");
  };

  // Delete a course
  const deleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Manage Fitness Programs</h1>

      {/* Create New Course Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Create New Course</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Course Name Input */}
          <input
            type="text"
            className="border rounded-lg p-3"
            placeholder="Course Name"
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
          />

          {/* Course Level Dropdown */}
          <select
            className="border rounded-lg p-3"
            value={newCourseLevel}
            onChange={(e) => setNewCourseLevel(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Course Price Input */}
          <input
            type="number"
            className="border rounded-lg p-3"
            placeholder="Price (in ₹)"
            value={newCoursePrice}
            onChange={(e) => setNewCoursePrice(e.target.value)}
          />

          {/* Add Course Button */}
          <button
            onClick={addCourse}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Add Course
          </button>
        </div>
      </div>

      {/* View Courses Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Courses</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Course Name</th>
              <th className="border border-gray-300 px-4 py-2">Level</th>
              <th className="border border-gray-300 px-4 py-2">Price (₹)</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="border border-gray-300 px-4 py-2">{course.name}</td>
                <td className="border border-gray-300 px-4 py-2">{course.level}</td>
                <td className="border border-gray-300 px-4 py-2">₹{course.price.toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {courses.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageCoursesPage;
