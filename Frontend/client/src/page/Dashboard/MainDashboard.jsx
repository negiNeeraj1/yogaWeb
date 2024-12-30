import React, { useState, useEffect } from "react";
import {
  Zap,
  Trophy,
  Flame,
  Calendar,
  CheckCircle,
  Activity,
  Star,
  Headphones,
  Gift,
  Target,
  Rocket,
  Medal,
  Check,
  ArrowRight,
  Sparkles,
  XCircle,
  CircleCheck,
  UserCheck,
  TrendingUp,
  Book,
  Lock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import DarkModeClasses from "../../Components/DarkMode";
import { BlurText } from "../../Components/Themes/BlurText";

const MainDashboard = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [dailyStreak, setDailyStreak] = useState(12);
  const [animatedQuote, setAnimatedQuote] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [userLevel, setUserLevel] = useState(3);
  const [totalXP, setTotalXP] = useState(1250);

  const learningPaths = [
    {
      id: 1,
      title: "Mindfulness Mastery",
      icon: <Book className="text-blue-500" />,
      progress: 65,
      modules: [
        { name: "Meditation Basics", completed: true },
        { name: "Advanced Breathing Techniques", completed: true },
        { name: "Stress Management", completed: false },
        { name: "Emotional Intelligence", completed: false },
      ],
      xpReward: 500,
      difficulty: "Intermediate",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Yoga Transformation",
      icon: <UserCheck className="text-green-500" />,
      progress: 40,
      modules: [
        { name: "Yoga Foundations", completed: true },
        { name: "Flexibility Workshop", completed: true },
        { name: "Power Yoga", completed: false },
        { name: "Yoga Philosophy", completed: false },
      ],
      xpReward: 750,
      difficulty: "Advanced",
      status: "Locked",
    },
  ];

  // Enhanced progress data with more detailed tracking
  const progressData = [
    { month: "Jan", progress: 60, xp: 250, color: "#FF6B6B" },
    { month: "Feb", progress: 75, xp: 350, color: "#4ECDC4" },
    { month: "Mar", progress: 85, xp: 450, color: "#45B7D1" },
    { month: "Apr", progress: 90, xp: 500, color: "#FDCB6E" },
    { month: "May", progress: 95, xp: 550, color: "#6C5CE7" },
  ];

  const handleLearningPathInteraction = (path) => {
    if (path.status === "Locked") {
      // Show a modal or notification about unlocking the path
      alert("Complete previous paths to unlock this learning journey!");
      return;
    }

    // Open detailed view of learning path
    setSelectedClass(path);
  };

  // Expanded and more exciting upcoming classes
  const upcomingClasses = [
    {
      id: 1,
      name: "Morning Zen Flow",
      instructor: "Sarah Johnson",
      time: "7:00 AM",
      date: "Tomorrow",
      difficulty: "Beginner",
      description: "Awaken your inner peace with a gentle morning practice",
      duration: "60 mins",
      intensity: "Low",
      xpReward: 50,
      bgColor: "bg-gradient-to-r from-green-400 to-blue-500",
    },
    {
      id: 2,
      name: "Power Yoga Fusion",
      instructor: "Mike Rodriguez",
      time: "6:00 PM",
      date: "Wednesday",
      difficulty: "Advanced",
      description: "Transform your body and mind with intense yoga warriors",
      duration: "75 mins",
      intensity: "High",
      xpReward: 100,
      bgColor: "bg-gradient-to-r from-red-500 to-orange-500",
    },
    {
      id: 3,
      name: "Mindfulness Meditation",
      instructor: "Emma Lee",
      time: "8:00 PM",
      date: "Friday",
      difficulty: "All Levels",
      description: "Dive deep into your inner world of calm and clarity",
      duration: "45 mins",
      intensity: "Medium",
      xpReward: 75,
      bgColor: "bg-gradient-to-r from-purple-500 to-indigo-600",
    },
  ];

  // More engaging achievements system
  const achievements = [
    {
      id: 1,
      icon: <Flame className="text-orange-500" />,
      title: "Consistency Champion",
      description: "10-Day Unbreakable Streak",
      progress: 75,
      level: 2,
      nextMilestone: "15-Day Master Streak",
      xpReward: 200,
      secretReward: "Exclusive Meditation Playlist",
      difficultyColor: "bg-orange-100 text-orange-600",
    },
    {
      id: 2,
      icon: <Trophy className="text-green-500" />,
      title: "Flexibility Wizard",
      description: "Mastered Advanced Flexibility",
      progress: 60,
      level: 3,
      nextMilestone: "Ultimate Flexibility Challenge",
      xpReward: 350,
      secretReward: "VIP Coaching Session",
      difficultyColor: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      icon: <Star className="text-yellow-500" />,
      title: "Zen Master",
      description: "5 Deep Meditation Sessions",
      progress: 90,
      level: 4,
      nextMilestone: "Inner Peace Mastery",
      xpReward: 500,
      secretReward: "Wellness Retreat Access",
      difficultyColor: "bg-yellow-100 text-yellow-600",
    },
  ];

  // Motivational quotes with more energy
  const motivationalQuotes = [
    "Your journey transforms you, one breath at a time!",
    "Unlock your potential with every mindful moment.",
    "Champions are built in the quiet hours of practice.",
    "Your wellness is a superpower waiting to be unleashed!",
  ];

  // Playful quote generation with typing effect
  const generateMotivationalQuote = () => {
    const quote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    let currentText = "";
    let index = 0;

    const typeWriter = () => {
      if (index < quote.length) {
        currentText += quote.charAt(index);
        setAnimatedQuote(currentText);
        index++;
        setTimeout(typeWriter, 50);
      }
    };

    typeWriter();
  };

  // Trigger confetti animation
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Lifecycle effects
  useEffect(() => {
    generateMotivationalQuote();
  }, []);

  useEffect(() => {
    // Level calculation logic
    const calculateLevel = (xp) => {
      // Simple XP to level calculation
      return Math.floor(Math.sqrt(xp / 100)) + 1;
    };

    const currentLevel = calculateLevel(totalXP);
    setUserLevel(currentLevel);
  }, [totalXP]);

  return (
    <div
      className={`min-h-screen ${DarkModeClasses.backgroundGradient.primary} bg-gradient-to-br from-purple-50 to-blue-50 p-6 space-y-6 relative overflow-hidden`}
    >
      {/* Welcome Section */}

      <div
        className={`${DarkModeClasses.card.gradient} bg-gradient-to-r from-purple-600 to-indigo-700  p-6 rounded-3xl relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 opacity-20">
          <Sparkles className={`w-48 h-48 ${DarkModeClasses.text.primary}`} />
        </div>

        <div className="relative z-10">
          <h2
            className={`text-3xl font-bold mb-2 flex items-center ${DarkModeClasses.gradients.text}`}
          >
            Welcome, {user?.name || "Wellness Warrior"}
            <Rocket className="ml-3 w-8 h-8 text-yellow-300 animate-bounce" />
          </h2>
          <p
            className={`italic font-light h-12 ${DarkModeClasses.text.secondary}`}
          >
            <BlurText
              text={animatedQuote}
              className="text-gray-600 dark:text-gray-300"
              delay={100}
            />
            
          </p>
          <div className="mt-4 flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 ${DarkModeClasses.glass.panel} px-4 py-2 rounded-full`}
            >
              <Activity className="w-6 h-6 dark:text-yellow-300 text-rose-500" />
              <span className={`font-bold ${DarkModeClasses.text.primary}`}>
                Current Streak: {dailyStreak} Days
              </span>
            </div>
            <button
              onClick={triggerConfetti}
              className={`${DarkModeClasses.button.gradient} transition-all px-4 py-2 rounded-full flex items-center`}
            >
              Boost Motivation <Zap className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Class Preview Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {upcomingClasses.map((cls, index) => (
          <div
            key={cls.id}
            className={`${
              index % 3 === 0
                ? DarkModeClasses.card.glassBlue
                : index % 3 === 1
                ? DarkModeClasses.card.glassPurple
                : DarkModeClasses.card.glassBlue
            } p-6 rounded-3xl transform transition-all hover:scale-105 ${
              DarkModeClasses.hover.card
            }`}
          >
            <div className="absolute inset-0 opacity-10">
              <div
                className={`${DarkModeClasses.gradients.glass} w-full h-full rounded-3xl`}
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <h3
                className={`text-xl font-bold ${DarkModeClasses.text.primary}`}
              >
                {cls.name}
              </h3>
              <span
                className={`${DarkModeClasses.gradients.primary.text} px-3 py-1 rounded-full text-sm`}
              >
                {cls.difficulty}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className={DarkModeClasses.text.secondary}>
                  {cls.instructor}
                </p>
                <p className={DarkModeClasses.text.accent}>
                  {cls.time} | {cls.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedClass(cls)}
                className={`${DarkModeClasses.button.primary} p-2 rounded-full ${DarkModeClasses.hover.button}`}
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-300" />
                <span className={DarkModeClasses.text.secondary}>
                  XP: {cls.xpReward}
                </span>
              </div>
              <div className={DarkModeClasses.text.muted}>{cls.duration}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements Section */}
      <div className={`${DarkModeClasses.card.ocean} rounded-3xl p-6`}>
        <h3
          className={`text-2xl font-bold mb-6 flex items-center ${DarkModeClasses.gradients.text}`}
        >
          <Trophy className="mr-3 text-purple-600 dark:text-purple-400" />
          Your Achievement Journey
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className={`${
                DarkModeClasses.gradients.card[
                  index % 4 === 0
                    ? "purple"
                    : index % 4 === 1
                    ? "blue"
                    : index % 4 === 2
                    ? "green"
                    : "orange"
                ]
              } p-6 rounded-3xl relative overflow-hidden`}
            >
              <div
                className={`absolute top-2 right-2 ${DarkModeClasses.gradients.primary.text} px-2 py-1 rounded-full text-xs font-bold`}
              >
                Level {achievement.level}
              </div>
              <div className="flex items-center mb-4">
                {achievement.icon}
                <div className="ml-4">
                  <h4 className={`font-bold ${DarkModeClasses.text.primary}`}>
                    {achievement.title}
                  </h4>
                  <p className={DarkModeClasses.text.accent}>
                    {achievement.description}
                  </p>
                </div>
              </div>
              <div
                className={`w-full ${DarkModeClasses.background.tertiary} rounded-full h-2.5 mt-2`}
              >
                <div
                  className="bg-purple-600 dark:bg-purple-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Rocket
                    className={`w-5 h-5 mr-2 ${DarkModeClasses.accent.primary}`}
                  />
                  <span className={DarkModeClasses.text.secondary}>
                    XP: {achievement.xpReward}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedAchievement(achievement)}
                  className={`${DarkModeClasses.button.outline} p-2 rounded-full ${DarkModeClasses.hover.button}`}
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Chart Section */}
      <div className={`${DarkModeClasses.card.gradient} p-6 rounded-xl`}>
        <div className="absolute inset-0 opacity-10">
          <div
            className={`${DarkModeClasses.gradients.subtle} w-full h-full rounded-xl`}
          />
        </div>
        <h3
          className={`text-lg font-semibold mb-4 ${DarkModeClasses.text.primary}`}
        >
          Progress Tracking
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid
                strokeDasharray="3 3"
                className={`${DarkModeClasses.divider.default} opacity-20`}
              />
              <XAxis
                dataKey="month"
                tick={{
                  fill: `white`,
                }}
                stroke={`${DarkModeClasses.text.primary}`}
              />
              <YAxis
                tick={{
                  fill: "white",
                }}
                stroke={`${DarkModeClasses.text.primary}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ stroke: "#8884d8", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className={`${DarkModeClasses.gradients.frost} p-8 rounded-3xl max-w-md w-full relative animate-scale-up`}
          >
            <button
              onClick={() => setSelectedAchievement(null)}
              className={`absolute top-4 right-4 ${DarkModeClasses.hover.icon}`}
            >
              <XCircle className="w-8 h-8" />
            </button>

            <div className="text-center">
              {selectedAchievement.icon}
              <h2
                className={`text-2xl font-bold mt-4 ${DarkModeClasses.text.heading}`}
              >
                {selectedAchievement.title}
              </h2>
              <p className={`${DarkModeClasses.text.secondary} mb-6`}>
                {selectedAchievement.description}
              </p>

              <div
                className={`${DarkModeClasses.background.secondary} p-4 rounded-2xl mb-6`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={DarkModeClasses.text.primary}>Progress</span>
                  <span className={DarkModeClasses.text.accent}>
                    {selectedAchievement.progress}%
                  </span>
                </div>
                <div
                  className={`w-full ${DarkModeClasses.background.tertiary} rounded-full h-2.5`}
                >
                  <div
                    className="bg-purple-600 dark:bg-purple-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${selectedAchievement.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`${DarkModeClasses.card.glass} p-4 rounded-2xl`}
                >
                  <Target
                    className={`w-8 h-8 ${DarkModeClasses.accent.success} mx-auto mb-2`}
                  />
                  <h4 className={`font-bold ${DarkModeClasses.text.primary}`}>
                    Next Milestone
                  </h4>
                  <p className={DarkModeClasses.text.secondary}>
                    {selectedAchievement.nextMilestone}
                  </p>
                </div>
                <div
                  className={`${DarkModeClasses.card.glass} p-4 rounded-2xl`}
                >
                  <Gift
                    className={`w-8 h-8 ${DarkModeClasses.accent.warning} mx-auto mb-2`}
                  />
                  <h4 className={`font-bold ${DarkModeClasses.text.primary}`}>
                    Secret Reward
                  </h4>
                  <p className={DarkModeClasses.text.secondary}>
                    {selectedAchievement.secretReward}
                  </p>
                </div>
              </div>

              <button
                onClick={triggerConfetti}
                className={`mt-6 w-full ${DarkModeClasses.button.gradient} py-3 rounded-full flex items-center justify-center ${DarkModeClasses.hover.button}`}
              >
                <CircleCheck className="mr-2" /> Unlock Next Level
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-confetti ${
                i % 5 === 0
                  ? "bg-purple-200"
                  : i % 5 === 1
                  ? "bg-blue-500"
                  : i % 5 === 2
                  ? "bg-emerald-500"
                  : i % 5 === 3
                  ? "bg-amber-500"
                  : "bg-rose-500"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainDashboard;
