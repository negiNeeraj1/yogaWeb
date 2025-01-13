import React from "react";
import { Sparkles, Users, BookOpen, Award } from "lucide-react";

const YogaHeader = ({ selectedLevel, setSelectedLevel }) => {
  const stats = [
    {
      icon: <Users className="w-5 h-5" />,
      value: "5000+",
      label: "Active Students",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      value: "25+",
      label: "Unique Courses",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Award className="w-5 h-5" />,
      value: "4.9/5",
      label: "Student Rating",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <div className="relative mb-24">
      {/* Curved Container */}
      <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 rounded-3xl mt-2 ">
        <div className="max-w-7xl mx-auto px-4 py-5 pb-16 relative z-10">
          {/* Header Content */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-200 dark:bg-blue-900/50 text-yellow-700 dark:text-blue-300 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Transform Your Life Through Yoga
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Discover Your Perfect{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Yoga Journey
              </span>
            </h1>

            <p className="text-lg sm:text-xl mb-12 text-gray-700 dark:text-gray-200">
              Join our expert-led classes and experience the perfect blend of
              traditional wisdom and modern practice
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl dark:shadow-gray-900/30 transform hover:scale-105 transition-all duration-300"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4 shadow-lg`}
                >
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="font-bold text-3xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Buttons - Positioned at bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center transform translate-y-1/2">
          <div className="inline-flex p-1.5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/30">
            {["all", "beginner", "intermediate", "advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`
                  px-6 py-3 mx-1.5 rounded-xl text-sm font-semibold transition-all duration-300
                  ${
                    selectedLevel === level
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }
                `}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-2xl"></div>
    </div>
  );
};

export default YogaHeader;
