import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  Activity,
  Clock,
  Target,
  Award,
  Info,
  BookOpen,
  UserPlus,
  Star,
  Zap,
  Heart,
  Headphones,
  Filter,
  Plus,
  MoreVertical,
  HomeIcon,
  Shield,
  Book,
  Users,
  Calendar,
  ChevronRight,
  Timer,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import DashboardComp from "../components/DashboardCom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MetricCard = ({
  title,
  value,
  icon,
  change,
  backgroundColor = "bg-white dark:bg-gray-800",
  iconBackground,
}) => {
  const isPositiveChange = change?.startsWith("+");

  return (
    <div
      className={`
      ${backgroundColor} 
      shadow-lg dark:shadow-gray-900/30
      dark:bg-gray-900/30
      rounded-xl 
      p-6 
      transform 
      transition-all 
      duration-300 
      hover:-translate-y-2 
      hover:shadow-xl
      dark:hover:shadow-gray-900/40
      border border-gray-100 dark:border-gray-700
    `}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-200">
            {title}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-200">
            {value}
          </p>
          {change && (
            <div className="flex items-center space-x-1">
              {isPositiveChange ? (
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              )}
              <p
                className={`
                text-sm font-medium
                ${
                  isPositiveChange
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              `}
              >
                {change}
              </p>
            </div>
          )}
        </div>
        <div
          className={`
          ${iconBackground} dark:bg-opacity-20
          p-3 
          rounded-full 
          flex 
          items-center 
          justify-center
          transition-colors
          duration-200
        `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

const DifficultyBadge = ({ level }) => {
  const badges = {
    Beginner:
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-400 dark:border-green-800",
    Intermediate:
      "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-400 dark:border-yellow-800",
    Advanced:
      "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-400 dark:border-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${badges[level]}`}
    >
      {level}
    </span>
  );
};

const ClassCard = ({ cls, onClick }) => (
  <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-all duration-300 space-y-4">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
          {cls.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
          <Users className="h-4 w-4" />
          {cls.instructor}
        </p>
      </div>
      <DifficultyBadge level={cls.difficulty} />
    </div>

    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        <Clock className="h-4 w-4" />
        {cls.time}
        <span className="text-gray-300 dark:text-gray-600">|</span>
        <Timer className="h-4 w-4" />
        {cls.duration}
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`text-sm ${
            cls.spotsAvailable < 6
              ? "text-orange-500 dark:text-orange-400"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {cls.spotsAvailable} spots left
        </span>
        <button
          onClick={onClick}
          className="text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 p-2 rounded-full transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

const ClassBookingModal = ({ isOpen, onClose, classDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 w-96 max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {classDetails.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-2"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <DifficultyBadge level={classDetails.difficulty} />
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {classDetails.spotsAvailable} spots available
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Users className="h-5 w-5" />
              <div>
                <p className="font-medium">Instructor</p>
                <p className="text-sm">{classDetails.instructor}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Clock className="h-5 w-5" />
              <div>
                <p className="font-medium">Time</p>
                <p className="text-sm">
                  {classDetails.time} ({classDetails.duration})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Activity className="h-5 w-5" />
              <div>
                <p className="font-medium">Class Type</p>
                <p className="text-sm">{classDetails.type} Yoga</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium">
              Book Class
            </button>
            <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium">
              Add to Waitlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EnhancedUpcomingClasses = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("today");

  const upcomingClasses = [
    {
      id: 1,
      name: "Vinyasa Flow",
      instructor: "Sarah Lee",
      time: "7:00 AM",
      duration: "60 min",
      difficulty: "Intermediate",
      spotsAvailable: 8,
      type: "Vinyasa",
      date: "2024-12-31",
    },
    {
      id: 2,
      name: "Power Yoga",
      instructor: "Mike Chen",
      time: "6:00 PM",
      duration: "75 min",
      difficulty: "Advanced",
      spotsAvailable: 5,
      type: "Power",
      date: "2024-12-31",
    },
    {
      id: 3,
      name: "Restorative Yoga",
      instructor: "Anna Roberts",
      time: "8:00 PM",
      duration: "45 min",
      difficulty: "Beginner",
      spotsAvailable: 12,
      type: "Restorative",
      date: "2024-12-31",
    },
    {
      id: 4,
      name: "Morning Flow",
      instructor: "Sarah Lee",
      time: "8:00 AM",
      duration: "60 min",
      difficulty: "Beginner",
      spotsAvailable: 3,
      type: "Vinyasa",
      date: "2024-12-31",
    },
  ];

  const filteredClasses = upcomingClasses.filter(
    (cls) => filter === "All" || cls.type === filter
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Upcoming Classes
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Book your next yoga session
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border dark:border-gray-700 rounded-xl px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white hover:border-blue-500 dark:hover:border-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="All">All Types</option>
              <option value="Vinyasa">Vinyasa</option>
              <option value="Power">Power</option>
              <option value="Restorative">Restorative</option>
            </select>
            <button className="bg-blue-600 dark:bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
          {["today", "week", "month"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                view === v
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {filteredClasses.map((cls) => (
            <ClassCard
              key={cls.id}
              cls={cls}
              onClick={() => setSelectedClass(cls)}
            />
          ))}
        </div>
      </div>

      <ClassBookingModal
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        classDetails={selectedClass || {}}
      />
    </div>
  );
};

const user = localStorage.getItem("user");
const parsedUserData = user ? JSON.parse(user) : null;

const userName = parsedUserData ? parsedUserData.firstName : "Guest";


const EnhancedInstructors = () => {
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  // Enhanced instructors data with certification types and colors
  const instructors = [
    {
      id: 1,
      name: "Sarah Lee",
      specialty: "Vinyasa Flow",
      rating: 4.8,
      classesTeaching: 12,
      image:
        "https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Passionate Vinyasa instructor with 10 years of experience.",
      certifications: [
        {
          name: "Yoga Alliance RYT-500",
          type: "advanced",
          icon: "Award",
          color: "bg-purple-100 text-purple-800 border-purple-200",
          description: "Advanced 500-hour certification",
        },
        {
          name: "Meditation Specialist",
          type: "specialist",
          icon: "Book",
          color: "bg-blue-100 text-blue-800 border-blue-200",
          description: "Specialized meditation training",
        },
      ],
    },
    {
      id: 2,
      name: "Mike Chen",
      specialty: "Power Yoga",
      rating: 4.6,
      classesTeaching: 8,
      image:
        "https://img.freepik.com/free-photo/portrait-adorable-domestic-cat_23-2149167145.jpg?semt=ais_hybrid",
      bio: "Former athlete turned yoga instructor, focusing on strength and flexibility.",
      certifications: [
        {
          name: "Yoga Alliance RYT-200",
          type: "standard",
          icon: "Shield",
          color: "bg-green-100 text-green-800 border-green-200",
          description: "Foundation 200-hour certification",
        },
        {
          name: "Personal Training",
          type: "specialist",
          icon: "Award",
          color: "bg-orange-100 text-orange-800 border-orange-200",
          description: "Certified personal trainer",
        },
      ],
    },
    {
      id: 3,
      name: "Anna Roberts",
      specialty: "Restorative Yoga",
      rating: 4.9,
      classesTeaching: 6,
      image:
        "https://img.freepik.com/free-photo/adorable-cat-lifestyle_23-2151593335.jpg?semt=ais_hybrid",
      bio: "Dedicated to healing and mindfulness through gentle yoga practices.",
      certifications: [
        {
          name: "Yoga Alliance RYT-300",
          type: "intermediate",
          icon: "Shield",
          color: "bg-teal-100 text-teal-800 border-teal-200",
          description: "Intermediate 300-hour certification",
        },
        {
          name: "Therapeutic Yoga",
          type: "specialist",
          icon: "Book",
          color: "bg-rose-100 text-rose-800 border-rose-200",
          description: "Specialized therapeutic training",
        },
      ],
    },
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Award":
        return <Award className="w-4 h-4" />;
      case "Shield":
        return <Shield className="w-4 h-4" />;
      case "Book":
        return <Book className="w-4 h-4" />;
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  const CertificationBadge = ({ certification }) => (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${certification.color} transition-all duration-300 hover:scale-105`}
    >
      {getIcon(certification.icon)}
      <span className="text-sm font-medium">{certification.name}</span>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
      <div className="space-y-4">
        {instructors.map((instructor) => (
          <div
            key={instructor.id}
            className="flex flex-col space-y-3 border-b pb-3 group"
          >
            <div className="flex items-center space-x-4">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-12 h-12 rounded-full dark:text-white object-cover"
              />
              <div className="flex-grow">
                <p className="font-semibold group-hover:text-rose-600 dark:text-white transition">
                  {instructor.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {instructor.specialty}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm dark:text-gray-400">
                  {instructor.rating}
                </span>
                <button
                  onClick={() => setSelectedInstructor(instructor)}
                  className="ml-2 text-purple-500 hover:bg-purple-50 p-1 rounded-full transition-all ease-in-out"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 ml-16">
              {instructor.certifications.map((cert, index) => (
                <CertificationBadge key={index} certification={cert} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 w-96 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-300">
                {selectedInstructor.name}
              </h2>
              <button
                onClick={() => setSelectedInstructor(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="text-center mb-6">
              <img
                src={selectedInstructor.image}
                alt={selectedInstructor.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 dark:text-gray-200 object-cover"
              />
              <p className="text-gray-600 dark:text-white">
                {selectedInstructor.specialty}
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-slate-300">
                  Bio
                </h3>
                <p className="text-gray-600 dark:text-slate-300">
                  {selectedInstructor.bio}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  Certifications & Achievements
                </h3>
                <div className="space-y-3">
                  {selectedInstructor.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${cert.color}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {getIcon(cert.icon)}
                        <span className="font-medium">{cert.name}</span>
                      </div>
                      <p className="text-sm ml-6">{cert.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EnhancedMemberProgress = () => {
  const memberProgress = [
    { level: "Beginner", members: 120, color: "#3B82F6" },
    { level: "Intermediate", members: 180, color: "#10B981" },
    { level: "Advanced", members: 50, color: "#F43F5E" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Member Skill Progression
        </h3>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Total Members: {memberProgress.reduce((a, b) => a + b.members, 0)}
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={memberProgress}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="level"
            stroke="#9CA3AF"
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "6px",
              color: "#fff",
            }}
          />
          <Bar dataKey="members" barSize={60} radius={[10, 10, 0, 0]}>
            {memberProgress.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const YogaDashboard = () => {
  const [userMetrics, setUserMetrics] = useState({
    totalClasses: 120,
    activeClasses: 45,
    completedClasses: 75,
    upcomingClasses: 15,
    averageAttendance: 82,
    totalSubscribers: 350,
  });

  const [classTrends, setClassTrends] = useState([
    { month: "Jan", classes: 30 },
    { month: "Feb", classes: 45 },
    { month: "Mar", classes: 55 },
    { month: "Apr", classes: 70 },
    { month: "May", classes: 85 },
    { month: "Jun", classes: 95 },
  ]);

  const [styleDistribution, setStyleDistribution] = useState([
    { name: "Vinyasa", value: 40 },
    { name: "Hatha", value: 25 },
    { name: "Power Yoga", value: 20 },
    { name: "Restorative", value: 15 },
  ]);

  const [timeDistribution, setTimeDistribution] = useState([
    { time: "Morning", classes: 45 },
    { time: "Afternoon", classes: 25 },
    { time: "Evening", classes: 50 },
  ]);

  const [recentAchievements, setRecentAchievements] = useState([
    {
      id: 1,
      title: "30-Day Yoga Challenge",
      description: "Completed consecutive daily yoga practice",
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
    },
    {
      id: 2,
      title: "Mind-Body Connection",
      description: "Achieved 50 hours of mindful practice",
      icon: <Heart className="h-5 w-5 text-red-500" />,
    },
    {
      id: 3,
      title: "Advanced Flexibility",
      description: "Mastered advanced pose sequence",
      icon: <Star className="h-5 w-5 text-blue-500" />,
    },
  ]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-3">
      <div className="container mx-auto">
        
        {/* <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Yoga Dashboard
          </h2>
        </div>  */}

        <DashboardComp
          UserName={userName}
          subHead={"Here's to a wonderful day ahead filled with possibilities!"}
          icon={HomeIcon}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Classes"
            value={userMetrics.totalClasses}
            icon={<Activity className="h-6 w-6 text-blue-500" />}
            change="+5.2% this month"
            backgroundColor="bg-white"
            iconBackground="bg-blue-100"
          />
          <MetricCard
            title="Active Classes"
            value={userMetrics.activeClasses}
            icon={<Target className="h-6 w-6 text-green-500" />}
            change="+3.8% from last week"
            backgroundColor="bg-white"
            iconBackground="bg-green-100"
          />
          <MetricCard
            title="Subscribers"
            value={userMetrics.totalSubscribers}
            icon={<Users className="h-6 w-6 text-purple-500" />}
            change="-12.5% this month"
            backgroundColor="bg-white"
            iconBackground="bg-purple-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Completed Classes"
            value={userMetrics.completedClasses}
            icon={<Award className="h-6 w-6 text-orange-500" />}
            change="+7.2% from last week"
            backgroundColor="bg-white"
            iconBackground="bg-orange-100"
          />
          <MetricCard
            title="Upcoming Classes"
            value={userMetrics.upcomingClasses}
            icon={<Calendar className="h-6 w-6 text-teal-500" />}
            change="+6.5% this month"
            backgroundColor="bg-white"
            iconBackground="bg-teal-100"
          />
          <MetricCard
            title="Avg. Attendance"
            value={`${userMetrics.averageAttendance}%`}
            icon={<Clock className="h-6 w-6 text-red-500" />}
            change="+4.1% from last month"
            backgroundColor="bg-white"
            iconBackground="bg-red-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl dark:bg-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4">
              Class Participation Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={classTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="month"
                  stroke="#9CA3AF"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "6px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="classes"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow-md dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white">
              Yoga Style Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={styleDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {styleDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #374151",
                    borderRadius: "6px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Class Time Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="time"
                  stroke="#9CA3AF"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "6px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="classes" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-2 dark:bg-gray-800 mt-8">
          <EnhancedUpcomingClasses />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Top Instructors
              </h3>
              <Users className="h-6 w-6 text-purple-500" />
            </div>
            <EnhancedInstructors />
          </div>

          {/* Member Progress Section */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Member Skill Levels
              </h3>
              <Headphones className="h-6 w-6 text-green-500" />
            </div>
            <EnhancedMemberProgress />
          </div>

          {/* Recent Achievements Section */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Recent Achievements
              </h3>
              <Award className="h-6 w-6 text-orange-500" />
            </div>
            <div className="space-y-4">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-4 border-b border-gray-200 dark:border-gray-700 pb-2"
                >
                  {achievement.icon}
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {achievement.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YogaDashboard;
