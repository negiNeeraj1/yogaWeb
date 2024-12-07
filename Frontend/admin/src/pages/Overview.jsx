import React, { useState } from "react";
import {
  Calendar,
  Users,
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MetricCard = ({
  title,
  value,
  icon,
  change,
  backgroundColor,
  iconBackground,
}) => (
  <div
    className={`${backgroundColor} shadow-md rounded-xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg`}
  >
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {change && (
          <p
            className={`text-sm ${
              change.startsWith("+") ? "text-green-600" : "text-red-600"
            }`}
          >
            {change}
          </p>
        )}
      </div>
      <div
        className={`${iconBackground} p-3 rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
    </div>
  </div>
);

const ClassBookingModal = ({ isOpen, onClose, classDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-96 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {classDetails.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Clock className="h-5 w-5 text-blue-500" />
            <span>
              {classDetails.time} | {classDetails.duration}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Users className="h-5 w-5 text-green-500" />
            <span>Instructor: {classDetails.instructor}</span>
          </div>
          <div className="flex items-center space-x-4">
            <BookOpen className="h-5 w-5 text-purple-500" />
            <span>Difficulty: {classDetails.difficulty}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Star className="h-5 w-5 text-yellow-500" />
            <span>Spots Available: {classDetails.spotsAvailable}</span>
          </div>
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
            Book Class
          </button>
        </div>
      </div>
    </div>
  );
};

const EnhancedUpcomingClasses = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [filter, setFilter] = useState("All");

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
    },
  ];

  const filteredClasses =
    filter === "All"
      ? upcomingClasses
      : upcomingClasses.filter((cls) => cls.type === filter);

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Upcoming Classes
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="All">All Types</option>
            <option value="Vinyasa">Vinyasa</option>
            <option value="Power">Power</option>
            <option value="Restorative">Restorative</option>
          </select>
          <button className="bg-blue-50 p-2 rounded-full hover:bg-blue-100">
            <Plus className="h-5 w-5 text-blue-500" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredClasses.map((cls) => (
          <div
            key={cls.id}
            className="flex justify-between items-center border-b pb-2 group"
          >
            <div>
              <p className="font-semibold group-hover:text-blue-600 transition">
                {cls.name}
              </p>
              <p className="text-gray-500 text-sm">{cls.instructor}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{cls.time}</span>
              <button
                onClick={() => setSelectedClass(cls)}
                className="ml-2 text-blue-500 hover:bg-blue-50 p-1 rounded-full"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <ClassBookingModal
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        classDetails={selectedClass || {}}
      />
    </div>
  );
};


const EnhancedInstructors = () => {
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const instructors = [
    {
      id: 1,
      name: "Sarah Lee",
      specialty: "Vinyasa Flow",
      rating: 4.8,
      classesTeaching: 12,
      image: "/api/placeholder/100/100",
      bio: "Passionate Vinyasa instructor with 10 years of experience.",
      certifications: ["Yoga Alliance RYT-500", "Meditation Specialist"],
    },
    {
      id: 2,
      name: "Mike Chen",
      specialty: "Power Yoga",
      rating: 4.6,
      classesTeaching: 8,
      image: "/api/placeholder/100/100",
      bio: "Former athlete turned yoga instructor, focusing on strength and flexibility.",
      certifications: ["Yoga Alliance RYT-200", "Personal Training"],
    },
    {
      id: 3,
      name: "Anna Roberts",
      specialty: "Restorative Yoga",
      rating: 4.9,
      classesTeaching: 6,
      image: "/api/placeholder/100/100",
      bio: "Dedicated to healing and mindfulness through gentle yoga practices.",
      certifications: ["Yoga Alliance RYT-300", "Therapeutic Yoga"],
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="space-y-4">
        {instructors.map((instructor) => (
          <div
            key={instructor.id}
            className="flex items-center space-x-4 border-b pb-3 group"
          >
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-grow">
              <p className="font-semibold group-hover:text-purple-600 transition">
                {instructor.name}
              </p>
              <p className="text-sm text-gray-500">{instructor.specialty}</p>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm">{instructor.rating}</span>
              <button
                onClick={() => setSelectedInstructor(instructor)}
                className="ml-2 text-purple-500 hover:bg-purple-50 p-1 rounded-full"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 w-96 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
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
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600">{selectedInstructor.specialty}</p>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Bio</h3>
                <p className="text-gray-600">{selectedInstructor.bio}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Certifications</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedInstructor.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
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
    { level: "Advanced", members: 50, color: "#F43F5E" }
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Member Skill Progression
        </h3>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">Total Members: {memberProgress.reduce((a, b) => a + b.members, 0)}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={memberProgress}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="level" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [value, 'Members']}
            contentStyle={{ backgroundColor: 'white', border: '1px solid #E2E8F0' }}
          />
          <Bar 
            dataKey="members" 
            fill="#8884d8"
            barSize={60}
            radius={[10, 10, 0, 0]}
          >
            {memberProgress.map((entry, index) => (
              <Bar 
                key={`bar-${index}`} 
                dataKey="members" 
                stackId="a" 
                fill={entry.color} 
                radius={[10, 10, 0, 0]}
              />
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Yoga Dashboard
          </h2>
        </div>

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
            change="+12.5% this month"
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
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Class Participation Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={classTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="classes"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Class Time Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="classes" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 mt-8">
          <EnhancedUpcomingClasses />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Top Instructors
              </h3>
                <Users className="h-6 w-6 text-purple-500" />
            </div>
            <div className="space-y-4">
              <EnhancedInstructors />
            </div>
          </div>

          {/* Member Progress Section */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Member Skill Levels
              </h3>
              <Headphones className="h-6 w-6 text-green-500" />
            </div>
            <EnhancedMemberProgress />
          </div>

          {/* Recent Achievements Section */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Achievements
              </h3>
              <Award className="h-6 w-6 text-orange-500" />
            </div>
            <div className="space-y-4">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-4 border-b pb-2"
                >
                  {achievement.icon}
                  <div>
                    <p className="font-semibold">{achievement.title}</p>
                    <p className="text-sm text-gray-500">
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

export default 
YogaDashboard;
