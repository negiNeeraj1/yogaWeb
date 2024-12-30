import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  markAttendance,
  EnrolledClasses,
  getClassAttendanceStats,
} from "../../api/api";
import {
  Calendar,
  Clock,
  PlayCircle,
  CheckCircle,
  Award,
  Users,
  ArrowLeft,
  Timer,
  Star,
} from "lucide-react";

const VideoPlayer = ({ videoUrl, title }) => (
  <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <PlayCircle className="w-16 h-16 text-white opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
    </div>
    <img
      src="/api/placeholder/1280/720"
      alt={title}
      className="w-full h-full object-cover opacity-50"
    />
  </div>
);

const ProgressCard = ({ attendanceStats }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
      Your Progress
    </h3>
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-300">
            Course Progress
          </span>
          <span className="text-gray-900 dark:text-white font-medium">
            {attendanceStats.progress}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
            style={{ width: `${attendanceStats.progress}%` }}
          />
        </div>
      </div>
      <div className="text-gray-500 dark:text-gray-400">
        {attendanceStats.attended} of {attendanceStats.totalSessions} sessions
        completed
      </div>
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
          Attendance Statistics
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Sessions Attended:
            </span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {attendanceStats.attended}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Total Sessions:
            </span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {attendanceStats.totalSessions}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Attendance Rate:
            </span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {attendanceStats.attendancePercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const YogaClassPage = () => {
  const { classId } = useParams();
  const params = useParams();
  const navigate = useNavigate();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [parsedUser, setParsedUser] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [attendanceStats, setAttendanceStats] = useState({
    attended: 0,
    totalSessions: 0,
    attendancePercentage: 0,
    progress: 0,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUserData = user ? JSON.parse(user) : null;
    if (parsedUserData) {
      setParsedUser(parsedUserData);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!parsedUser?.id || !classId) return;

      try {
        const classesResponse = await EnrolledClasses(parsedUser.id);
        setEnrolledClasses(classesResponse.data);

        const attendanceData = {
          userId: parsedUser.id,
          classId,
        };
        const statsResponse = await getClassAttendanceStats(attendanceData);

        if (statsResponse.data) {
          const { attendanceStats, yogaClassTitle, username } =
            statsResponse.data;

          // Convert the array of stats to an object
          const statsObject = attendanceStats.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
          }, {});

          setAttendanceStats({
            attended: statsObject.attended || 0,
            totalSessions: statsObject.totalSessions || 0,
            attendancePercentage: statsObject.attendancePercentage || 0,
            progress: statsObject.progress || 0,
            yogaClassTitle: yogaClassTitle,
            usernames: username,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [parsedUser, classId]);


  const handleMarkAsCompleted = async () => {
    try {
      console.log("yogaClass data", yogaClass);

      // Log the ID being sent
      console.log("Marking attendance for record:", params.classId);

      const response = await markAttendance(params.classId);

      console.log(response);

      if (response.success) {
        setAttendanceStats((prev) => {
          const newAttended = response.data.completedSessions;
          const newProgress = response.data.progress;
          return {
            ...prev,
            attended: newAttended,
            totalSessions: response.data.totalSessions,
            progress: newProgress,
            attendancePercentage: Math.round(
              (newAttended / response.data.totalSessions) * 100
            ),
          };
        });

        // Log the updated attendance stats after the state update
        setTimeout(() => {
          console.log("Updated attendance stats:", attendanceStats);
        }, 0);

        const updatedClasses = await EnrolledClasses(parsedUser.id);
        setEnrolledClasses(updatedClasses.data);

        alert("Session marked as completed!");
      } else {
        alert(response.message || "Failed to mark session as completed.");
      }
    } catch (error) {
      console.error("Error marking session as completed:", error);
      alert(error.message || "Error marking session as completed.");
    }
  };


  const yogaClass = enrolledClasses.find((class_) => class_._id === classId);

  if (!yogaClass) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const videos = [
    { title: "Introduction to the Course", duration: "5:30" },
    { title: "Warm-up Exercises", duration: "15:00" },
    { title: "Basic Poses", duration: "25:00" },
    { title: "Advanced Techniques", duration: "20:00" },
    { title: "Cool Down and Meditation", duration: "10:00" },
  ];

  const schedule = [
    { day: "Monday", time: "7:00 AM - 8:30 AM" },
    { day: "Wednesday", time: "7:00 AM - 8:30 AM" },
    { day: "Friday", time: "7:00 AM - 8:30 AM" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/yogadashboard/classes")}
          className="flex items-center mb-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Classes
        </button>

        {/* Header Section */}
        <div className="rounded-2xl shadow-lg p-6 md:p-8 mb-8 bg-white dark:bg-gray-800">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {yogaClass?.yogaClass.title}
              </h1>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Clock className="w-5 h-5 mr-2" />
                  {yogaClass?.yogaClass.duration} minutes
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Users className="w-5 h-5 mr-2" />
                  with {yogaClass?.yogaClass.instructor.firstName}{" "}
                  {yogaClass?.yogaClass.instructor.lastName}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  {yogaClass?.yogaClass.difficulty || "Beginner"}
                </div>
              </div>
            </div>
            <button
              onClick={handleMarkAsCompleted}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg flex items-center hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg self-start"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Mark as Completed
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <VideoPlayer videoUrl="#" title={videos[selectedVideo].title} />
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {videos[selectedVideo].title}
                </h3>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Timer className="w-4 h-4 mr-2" />
                  {videos[selectedVideo].duration}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Course Content
              </h3>
              <div className="space-y-3">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedVideo(index)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedVideo === index
                        ? "bg-blue-50 dark:bg-blue-900/50 ring-1 ring-blue-500/20"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <PlayCircle
                          className={`w-5 h-5 mr-3 ${
                            selectedVideo === index
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        />
                        <span
                          className={`${
                            selectedVideo === index
                              ? "text-blue-600 dark:text-blue-400 font-medium"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {video.title}
                        </span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">
                        {video.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Schedule Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Class Schedule
              </h3>
              <div className="space-y-3">
                {schedule.map((slot, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {slot.day}
                      </span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {slot.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Card */}
            <ProgressCard
              attendanceStats={{
                ...attendanceStats,
                yogaClassTitle: attendanceStats.yogaClassTitle,
                username: attendanceStats.username,
              }}
            />

            {/* Achievements Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Achievements
              </h3>
              <div className="space-y-3">
                {(
                  yogaClass?.achievements || [
                    "First Class Completed",
                    "Week 1 Finished",
                  ]
                ).map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Award className="w-5 h-5 mr-3 text-yellow-500" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YogaClassPage;