import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle,
  Award,
  Play,
  Pause,
  ChevronRight,
  Star,
  Users,
  MapPin,
  Heart,
  BookOpen,
} from "lucide-react";
import DarkModeClasses from "../../Components/DarkMode";
import PaymentButton from "../../Components/PaymentGateway/PaymentButton";
import {
  EnrolledClasses,
  GetClasses,
  getClassAttendanceStats,
} from "../../api/api";

const Card = ({
  children,
  classId,
  setAttendanceStats,
  className = "",
  onClick,
}) => {
  useEffect(() => {
    const fetchAttendanceStats = async () => {
      try {
        const user = localStorage.getItem("user");
        const parsedUserData = user ? JSON.parse(user) : null;
        const attendanceData = { classId, userId: parsedUserData?.id };
        const statsResponse = await getClassAttendanceStats(attendanceData);
        if (statsResponse.data && Array.isArray(statsResponse.data)) {
          const stats = statsResponse.data.reduce((acc, stat) => {
            acc[stat._id] = stat.count;
            return acc;
          }, {});
          setAttendanceStats((prevStats) => ({
            ...prevStats,
            [classId]: {
              attended: stats.attended || 0,
              totalSessions: stats.totalSessions || 0,
              attendancePercentage: stats["attendancePercentage"] || 0,
              progress: stats["progress"] || 0,
            },
          }));
        }
      } catch (error) {
        console.error(`Error fetching stats for classId ${classId}:`, error);
      }
    };

    if (classId && setAttendanceStats) {
      fetchAttendanceStats();
    }
  }, [classId, setAttendanceStats]);

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

const ClassesPage = () => {
  const [activeClass, setActiveClass] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [parsedUser, setParsedUser] = useState(null);
  const [attendanceStats, setAttendanceStats] = useState({});

  const navigate = useNavigate();

  const handlePaymentSuccess = (response) => {
    console.log("Payment Successful:", response);
    alert("Payment successful! You are now enrolled in the class.");
    retrieveEnrolledClasses();
  };

  const handlePaymentFailure = (response) => {
    console.log("Payment Failed:", response);
    alert("Payment failed. Please try again.");
  };

  const retrieveClasses = async () => {
    try {
      const response = await GetClasses();
      setAvailableClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const retrieveEnrolledClasses = async () => {
    try {
      const user = localStorage.getItem("user");
      const parsedUserData = user ? JSON.parse(user) : null;

      if (parsedUserData) {
        setParsedUser(parsedUserData);
        const userId = parsedUserData.id;
        const response = await EnrolledClasses(userId);
        const enrolledClassesData = response.data;
        setEnrolledClasses(enrolledClassesData);
      }
    } catch (error) {
      console.error("Error fetching enrolled classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClassClick = (id) => {
    setActiveClass(activeClass === id ? null : id);
    setIsPlaying(false);
  };

  const handlePlayClick = (e, id) => {
    e.stopPropagation();
    navigate(`/yogadashboard/yoga-class/${id}`);
  };

  useEffect(() => {
    retrieveClasses();
    retrieveEnrolledClasses();
  }, []);

  return (
    <div className={`min-h-screen p-6 ${DarkModeClasses.background.primary}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header section remains the same */}
        <div className={`${DarkModeClasses.card.gradient} p-8 rounded-2xl`}>
          <h1
            className={`text-4xl font-bold mb-3 ${DarkModeClasses.text.heading}`}
          >
            Your Yoga Journey
          </h1>
          <p className={`text-lg opacity-90 ${DarkModeClasses.text.secondary}`}>
            Transform your practice, one pose at a time
          </p>
        </div>

        {/* Enhanced Enrolled Classes Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Your Active Journey
          </h2>
          {enrolledClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledClasses.map((class_) => (
                <div key={class_._id} className="group relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-100 rounded-full animate-pulse dark:bg-pink-900/30" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-100 rounded-full animate-pulse dark:bg-purple-900/30" />

                  <div className="relative bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800/50 dark:to-gray-700/50 p-1 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div
                      onClick={() => handleClassClick(class_._id)}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer"
                    >
                      {/* Header Section */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Heart
                              className="w-4 h-4 text-pink-500"
                              fill="currentColor"
                            />
                            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                              {class_.yogaClass.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-purple-400" />
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              with {class_.yogaClass.instructor.firstName}{" "}
                              {class_.yogaClass.instructor.lastName}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => handlePlayClick(e, class_._id)}
                          className="p-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                          {activeClass === class_._id && isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-pink-50 dark:bg-gray-700/50 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-pink-500" />
                            <span className="text-sm text-gray-700 dark:text-gray-200">
                              {class_.yogaClass.duration} mins
                            </span>
                          </div>
                        </div>
                        <div className="bg-purple-50 dark:bg-gray-700/50 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-700 dark:text-gray-200">
                              {class_.yogaClass.classType}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Class Details */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-pink-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {new Date(
                              class_.yogaClass.startTime
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              class_.yogaClass.endTime
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {class_.yogaClass.style} •{" "}
                            {class_.yogaClass.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-pink-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {class_.yogaClass.location}
                          </span>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {activeClass === class_._id && (
                        <div className="mt-6 space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {class_.yogaClass.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {class_.yogaClass.instructor.certifications?.map(
                              (certification, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-gray-700 dark:text-gray-200"
                                >
                                  {certification}
                                </span>
                              )
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span>
                              {class_.yogaClass.currentParticipants}/
                              {class_.yogaClass.maxParticipants} participants
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <Award className="w-4 h-4 text-pink-400" />
                            <span>
                              Attendance: {class_.attendancePercentage}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              You don't have any active classes. Please enroll in a course to
              begin your yoga journey.
            </p>
          )}
        </div>

        {/* available classes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Discover New Classes
          </h2>

          {isLoading ? (
            <p className="text-gray-600 dark:text-gray-400">
              Loading classes...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availableClasses.length > 0 ? (
                availableClasses.map((class_) => (
                  <Card
                    key={class_._id}
                    className="group p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {class_.title}
                      </h3>
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-r ${class_.color}`}
                      >
                        <Layout className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{class_.duration} minutes</span>{" "}
                      </div>

                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(class_.startTime).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4 mr-2" />
                        <span>
                          {class_.currentParticipants} /{" "}
                          {class_.maxParticipants} students
                        </span>{" "}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        <span>{class_.difficulty} difficulty</span>{" "}
                      </div>
                    </div>

                    <PaymentButton
                      amount={class_.price}
                      onSuccess={handlePaymentSuccess}
                      onFailure={handlePaymentFailure}
                      text={"Pay & Join Class"}
                      userId={parsedUser.id}
                      classId={class_._id}
                      updateEnrolledClassess={setEnrolledClasses}
                    />
                  </Card>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  No available classes found. Please try again later.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
