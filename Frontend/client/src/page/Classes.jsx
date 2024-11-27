import React from "react";

const ClassesPage = () => {
  const classes = [
    {
      id: 1, // Add a unique identifier
      title: "Beginner Yoga",
      description: "Perfect for those just starting their yoga journey",
      duration: "60 minutes",
      level: "Beginner",
      schedule: "Mon, Wed, Fri 9:00 AM",
    },
    {
      id: 2,
      title: "Vinyasa Flow",
      description: "Dynamic flowing sequences synchronized with breath",
      duration: "75 minutes",
      level: "Intermediate",
      schedule: "Tue, Thu 10:30 AM",
    },
    {
      id: 3,
      title: "Meditation & Mindfulness",
      description: "Guided meditation sessions for mental clarity",
      duration: "45 minutes",
      level: "All Levels",
      schedule: "Daily 8:00 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      {/* Page Container */}
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Classes
          </h1>
          <p className="text-xl text-gray-600">
            Find the perfect class for your yoga journey
          </p>
        </div>

        {/* Classes Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {classes.map((yogaClass) => (
            <div
              key={yogaClass.id} // Use unique identifier as the key
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Placeholder for Images */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Image Placeholder</span>
              </div>

              {/* Class Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {yogaClass.title}
                </h3>
                <p className="text-gray-600 mb-4">{yogaClass.description}</p>
                <ul className="space-y-2 mb-6">
                  <li className="text-gray-600">
                    <strong>Duration:</strong> {yogaClass.duration}
                  </li>
                  <li className="text-gray-600">
                    <strong>Level:</strong> {yogaClass.level}
                  </li>
                  <li className="text-gray-600">
                    <strong>Schedule:</strong> {yogaClass.schedule}
                  </li>
                </ul>
                <button
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
                  aria-label={`Book ${yogaClass.title}`}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
