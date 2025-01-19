import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Clock,
  Users,
  Star,
  Award,
  BookOpen,
  Sparkles,
  Filter,
  Search,
  ChevronDown,
} from "lucide-react";
import Foundation from "../assets/Pose1.png";
import DarkModeClasses from "../Components/DarkMode";
import YogaHeader from "../Components/YogaHeader";
import yoga00 from "../assets/yoga00.png";


const YogaClasses = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [favorites, setFavorites] = useState(new Set());

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const classes = [
    {
      id: 1,
      title: "Foundational Poses (Asanas)",
      description:
        "Begin your yoga journey with essential poses and breathing techniques.",
      fullDescription:
        "Perfect for beginners looking to build a strong foundation in yoga practice.",
      level: "beginner",
      duration: "8 weeks",
      nextBatch: "Starts June 1, 2024",
      studentsEnrolled: 1500,
      rating: 4.8,
      totalReviews: 450,
      price: {
        original: 2000,
        discounted: 1499,
      },
      image: Foundation,
      instructor: {
        name: "Sarah Johnson",
        image:
          "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-in-box-1593184776.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=980:*",
        certification: "RYT-500",
      },
      features: [
        "Live online sessions",
        "Personalized feedback",
        "Community support",
        "Practice videos",
      ],
    },
    {
      id: 2,
      title: "Vinyasa Flow Mastery",
      description: "Dynamic sequences synchronizing breath with movement.",
      fullDescription:
        "Advance your practice with fluid movements and challenging sequences.",
      level: "intermediate",
      duration: "10 weeks",
      nextBatch: "Starts May 15, 2024",
      studentsEnrolled: 1200,
      rating: 4.9,
      totalReviews: 380,
      price: {
        original: 2500,
        discounted: 1799,
      },
      image: Foundation,
      instructor: {
        name: "David Chen",
        image:
          "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-in-box-1593184776.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=980:*",
        certification: "E-RYT 500",
      },
      features: [
        "Advanced pose workshops",
        "Meditation sessions",
        "Weekly Q&A",
        "Digital resources",
      ],
    },
    {
      id: 3,
      title: "Hatha Yoga for Flexibility",
      description: "Increase flexibility through gentle and steady poses.",
      fullDescription:
        "Perfect for those looking to improve flexibility and mindfulness.",
      level: "beginner",
      duration: "6 weeks",
      nextBatch: "Starts April 10, 2024",
      studentsEnrolled: 900,
      rating: 4.7,
      totalReviews: 320,
      price: {
        original: 1800,
        discounted: 1299,
      },
      image: Foundation,
      instructor: {
        name: "Emily Brooks",
        image:
          "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-in-box-1593184776.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=980:*",
        certification: "RYT-200",
      },
      features: [
        "Gentle asana sequences",
        "Breathing techniques",
        "Mindfulness exercises",
        "Weekly group discussions",
      ],
    },
    {
      id: 4,
      title: "Power Yoga for Strength",
      description:
        "Build muscle strength through energetic and challenging poses.",
      fullDescription:
        "A high-energy class designed for those who want to build strength and endurance.",
      level: "intermediate",
      duration: "12 weeks",
      nextBatch: "Starts March 20, 2024",
      studentsEnrolled: 1100,
      rating: 4.6,
      totalReviews: 290,
      price: {
        original: 2200,
        discounted: 1699,
      },
      image: Foundation,
      instructor: {
        name: "John Carter",
        image:
          "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-in-box-1593184776.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=980:*",
        certification: "E-RYT 200",
      },
      features: [
        "High-intensity workouts",
        "Core strengthening routines",
        "Breath control exercises",
        "Motivational coaching",
      ],
    },
    {
      id: 5,
      title: "Restorative Yoga & Deep Relaxation",
      description: "Slow-paced class focused on healing and relaxation.",
      fullDescription:
        "Perfect for stress relief, improving sleep, and relaxing the body and mind.",
      level: "beginner",
      duration: "4 weeks",
      nextBatch: "Starts February 5, 2024",
      studentsEnrolled: 800,
      rating: 5.0,
      totalReviews: 215,
      price: {
        original: 1500,
        discounted: 1199,
      },
      image: Foundation,
      instructor: {
        name: "Laura Evans",
        image:
          "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-in-box-1593184776.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=980:*",
        certification: "Restorative Yoga Teacher",
      },
      features: [
        "Slow-paced poses",
        "Gentle stretches",
        "Guided meditation",
        "Breathing exercises",
      ],
    },
    {
      id: 6,
      title: "Yoga for Mental Clarity",
      description: "Calming practices to enhance focus and mental well-being.",
      fullDescription:
        "A meditative and mindful approach to yoga, focused on boosting clarity and mental focus.",
      level: "beginner",
      duration: "5 weeks",
      nextBatch: "Starts February 20, 2024",
      studentsEnrolled: 700,
      rating: 4.9,
      totalReviews: 190,
      price: {
        original: 1700,
        discounted: 1399,
      },
      image: Foundation,
      instructor: {
        name: "Sophie Lee",
        image:
          "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-in-box-1593184776.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=980:*",
        certification: "Meditative Yoga Teacher",
      },
      features: [
        "Mindfulness meditation",
        "Guided relaxation",
        "Breathing techniques",
        "Focus-enhancing practices",
      ],
    },
    {
      id: 7,
      title: "Ashtanga Yoga Fundamentals",
      description: "Learn the foundational sequence of Ashtanga yoga.",
      fullDescription:
        "A structured and challenging practice designed for those who want to deepen their yoga practice.",
      level: "intermediate",
      duration: "8 weeks",
      nextBatch: "Starts March 10, 2024",
      studentsEnrolled: 1300,
      rating: 4.8,
      totalReviews: 420,
      price: {
        original: 2100,
        discounted: 1599,
      },
      image: Foundation,
      instructor: {
        name: "Michael Reese",
        image:
          "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-in-box-1593184776.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=980:*",
        certification: "Ashtanga Certified",
      },
      features: [
        "Ashtanga sequence breakdown",
        "Breath and movement synchronization",
        "Pranayama (breathwork)",
        "Weekly progress assessments",
      ],
    },
  ];

  const handleEnrollNow = (classId) => {
    navigate("/login", { state: { redirectTo: `/class/${classId}` } });
  };

  const handleExplore = (classId) => {
    navigate(`/class/${classId}`);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const filterClasses = () => {
    let filtered = classes;

    // Filter by level
    if (selectedLevel !== "all") {
      filtered = filtered.filter((c) => c.level === selectedLevel);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case "price":
        filtered = [...filtered].sort(
          (a, b) => a.price.discounted - b.price.discounted
        );
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        filtered = [...filtered].sort(
          (a, b) => b.studentsEnrolled - a.studentsEnrolled
        );
        break;
      default:
        break;
    }

    return filtered;
  };

  return (
    <motion.main
      initial="hidden"
      animate="show"
      className={`w-full ${DarkModeClasses.container} overflow-x-hidden`}
    >
      <div className="min-h-screen dark:bg-gray-900">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-6 pt-16">
          <YogaHeader
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto mb-8 flex flex-wrap gap-4 items-center"
          >
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border dark:border-gray-700 
                          dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 
                          focus:ring-blue-500"
              />
            </div>

            <motion.select
              whileTap={{ scale: 0.98 }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-xl border dark:border-gray-700 dark:bg-gray-800 
                        dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price">Lowest Price</option>
            </motion.select>
          </motion.div>

          {/* Classes Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 max-w-6xl mx-auto"
          >
            <AnimatePresence mode="wait">
              {filterClasses().map((yogaClass) => (
                <motion.div
                  key={yogaClass.id}
                  variants={cardVariants}
                  whileHover="hover"
                  layout
                  className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 
                            shadow-xl shadow-blue-200 dark:shadow-none"
                >
                  <div className="relative">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={yoga00}
                      alt={yogaClass.title}
                      className="w-full h-52 object-cover"
                    />

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(yogaClass.id)}
                      className="absolute top-4 right-4"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          favorites.has(yogaClass.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      />
                    </motion.button>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 
                                to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium"
                    >
                      {yogaClass.level.charAt(0).toUpperCase() +
                        yogaClass.level.slice(1)}
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={yogaClass.instructor.image}
                        alt={yogaClass.instructor.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {yogaClass.instructor.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {yogaClass.instructor.certification}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {yogaClass.title}
                    </h3>

                    <p className="mb-4 text-gray-500 dark:text-gray-300 text-sm">
                      {yogaClass.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-800 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {yogaClass.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {yogaClass.studentsEnrolled.toLocaleString()} students
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {yogaClass.rating} ({yogaClass.totalReviews} reviews)
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Next batch
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {yogaClass.nextBatch}
                        </p>
                      </div>
                      <div className="text-right">
                        <motion.p
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          className="text-2xl font-bold text-gray-900 dark:text-white"
                        >
                          ₹{yogaClass.price.discounted}
                        </motion.p>
                        <p className="text-sm line-through text-gray-500 dark:text-gray-400">
                          ₹{yogaClass.price.original}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => handleExplore(yogaClass.id)}
                        className={`flex-1 py-2 rounded-lg font-semibold ${DarkModeClasses.button.primary}`}
                      >
                        Explore
                      </motion.button>
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => handleEnrollNow(yogaClass.id)}
                        className={`flex-1 py-2 rounded-lg font-semibold ${DarkModeClasses.button.outline}`}
                      >
                        Enroll Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default YogaClasses;
