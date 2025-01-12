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
  Info,
} from "lucide-react";
import DarkModeClasses from "../../Components/DarkMode";
import PaymentButton from "../../Components/PaymentGateway/PaymentButton";
import {
  EnrolledClasses,
  GetClasses,
  getClassAttendanceStats,
} from "../../api/api";

const FormattedDays = ({ days }) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      {days.map((day, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium
            bg-purple-50 text-purple-700 border border-purple-100
            dark:bg-purple-900/20 dark:text-purple-200 dark:border-purple-800/50
            transition-colors duration-200"
        >
          {day}
        </span>
      ))}
    </div>
  );
};

const ClassCard = ({
  class_,
  parsedUser,
  handlePaymentSuccess,
  handlePaymentFailure,
  PaymentButton,
  getFormattedDays,
}) => {
  const daysArray = getFormattedDays(class_.schedule.daysOfWeek).split(", ");

  return (
    <div className="group relative overflow-hidden rounded-2xl border-black">
      <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg hover:shadow-xl hover:translate-x-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-6 space-y-6">
          {/* Header section */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-300 dark:from-purple-100 dark:to-pink-200 bg-clip-text text-transparent">
                  {class_.className}
                </h3>
              </div>
              <span
                className="inline-flex px-3 py-1 rounded-full text-sm font-medium 
                bg-purple-50 text-purple-700 border border-purple-100
                dark:bg-purple-900/20 dark:text-purple-200 dark:border-purple-800/50"
              >
                {class_.category}
              </span>
            </div>
            <div
              className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100
              dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-800/50"
            >
              <Layout className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>

          {/* Info cards grid with enhanced days display */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="col-span-2 flex items-start p-3 
              bg-white dark:bg-gray-800/50 rounded-xl 
              group-hover:shadow-sm transition-all 
              border border-gray-100 dark:border-gray-700"
            >
              <Calendar className="w-5 h-5 text-purple-500 dark:text-purple-300 mt-1" />
              <div className="ml-3">
                <FormattedDays days={daysArray} />
              </div>
            </div>

            <div
              className="flex items-center p-3 
              bg-white dark:bg-gray-800/50 rounded-xl 
              group-hover:shadow-sm transition-all 
              border border-gray-100 dark:border-gray-700"
            >
              <Clock className="w-5 h-5 text-purple-500 dark:text-purple-300" />
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                {class_.schedule.startTime} - {class_.schedule.endTime}
              </span>
            </div>

            <div
              className="flex items-center p-3 
              bg-white dark:bg-gray-800/50 rounded-xl 
              group-hover:shadow-sm transition-all 
              border border-gray-100 dark:border-gray-700"
            >
              <Users className="w-5 h-5 text-purple-500 dark:text-purple-300" />
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                {class_.capacity - class_.remainingClasses} / {class_.capacity}
              </span>
            </div>

            <div
              className="flex items-center p-3 
              bg-white dark:bg-gray-800/50 rounded-xl 
              group-hover:shadow-sm transition-all 
              border border-gray-100 dark:border-gray-700"
            >
              <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                {class_.difficulty}
              </span>
            </div>
          </div>

          {/* Total classes info */}
          <div
            className="flex items-center p-3 
            bg-white dark:bg-gray-800/50 rounded-xl 
            border border-gray-100 dark:border-gray-700"
          >
            <Info className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="ml-3 text-gray-600 dark:text-gray-300">
              {class_.totalClasses} total classes
            </span>
          </div>

          {/* Price and CTA section */}
          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-md text-gray-500 dark:text-gray-400">
                Course Price
              </span>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                ₹{class_.price}
              </span>
            </div>

            {parsedUser && (
              <PaymentButton
                amount={class_.price}
                onSuccess={handlePaymentSuccess}
                onFailure={handlePaymentFailure}
                text="Enroll Now"
                userId={parsedUser.id}
                classId={class_._id}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white px-6 py-3 rounded-xl font-medium transform transition-all hover:scale-[1.02] focus:scale-[0.98] shadow-lg hover:shadow-xl"
              />
            )}
          </div>
        </div>
      </div>
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
        const response = await EnrolledClasses(parsedUserData.id);
        setEnrolledClasses(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching enrolled classes:", error);
    }
  };

  useEffect(() => {
    retrieveClasses();
    retrieveEnrolledClasses();
  }, []);

  const getFormattedDays = (daysArray) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysArray.map((day) => days[day - 1]).join(", ");
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
    <div className={`min-h-screen p-6 `}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header section remains the same */}
        <div
          className={` bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700`}
        >
          <h1
            className={`text-4xl font-bold mb-3 ${DarkModeClasses.text.heading} `}
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
              {enrolledClasses.map((enrollment) => (
                <div key={enrollment._id} className="group relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-200 rounded-full animate-pulse dark:bg-pink-900/30" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-100 rounded-full animate-pulse dark:bg-purple-900/30" />

                  <div className="relative bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800/50 dark:to-gray-700/50 p-1 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div
                      onClick={() => handleClassClick(enrollment._id)}
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
                              {enrollment.yogaClass.description}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-purple-400" />
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              with {enrollment.yogaClass.instructor.firstName}{" "}
                              {enrollment.yogaClass.instructor.lastName}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) =>
                            handlePlayClick(e, enrollment.yogaClass._id)
                          }
                          className="p-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                          {activeClass === enrollment._id && isPlaying ? (
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
                              Price: ${enrollment.yogaClass.price}
                            </span>
                          </div>
                        </div>
                        <div className="bg-purple-50 dark:bg-gray-700/50 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-700 dark:text-gray-200">
                              Status: {enrollment.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Class Details */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-pink-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Enrolled:{" "}
                            {new Date(
                              enrollment.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Attendance: {enrollment.attendancePercentage}%
                          </span>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {activeClass === enrollment._id && (
                        <div className="mt-6 space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Instructor Bio:{" "}
                            {enrollment.yogaClass.instructor.bio}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {enrollment.yogaClass.instructor.certifications?.map(
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
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 font-extrabold border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableClasses.map((class_) => (
                <ClassCard
                  key={class_._id}
                  class_={class_}
                  parsedUser={parsedUser}
                  handlePaymentSuccess={handlePaymentSuccess}
                  handlePaymentFailure={handlePaymentFailure}
                  PaymentButton={PaymentButton}
                  getFormattedDays={getFormattedDays}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
