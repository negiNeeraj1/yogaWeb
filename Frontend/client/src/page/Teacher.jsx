import React from "react";
import { Star, Heart, Calendar, Users, Medal, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";

const Teachers = () => {
  const teachers = [
    {
      name: "Sushma",
      specialties: "Yin yoga, meditation, hatha vinayasa flow",
      image:
        "https://media.istockphoto.com/id/1450919161/photo/portrait-of-a-scottish-fold-cat.jpg?s=612x612&w=0&k=20&c=ABNW7KDuLdG69-AStth6ES0bj1E4QXL8OT6RF3B-5cU=",
      stats: {
        experience: "8+ years",
        students: "1000+",
        rating: "4.9",
      },
    },
  ];

  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Expert Guidance",
      description:
        "Learn from certified professionals with years of experience",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personalized Care",
      description: "Get individual attention and support in your practice",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Flexible Schedule",
      description: "Choose from multiple class times that fit your lifestyle",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      id="Teachers"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full mb-6"
            >
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                Meet Our Experts
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Learn from the Best
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block text-purple-600 dark:text-purple-400"
              >
                Yoga Teachers
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-8"
            >
              Each teacher brings a wealth of knowledge, compassion, and
              personalized guidance to help you grow in your practice and
              achieve your wellness goals.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white px-8 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Try 14 days for free
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 px-8 py-3 rounded-lg transition-all duration-300 hover:bg-purple-50 dark:hover:bg-gray-600"
              >
                View Schedule
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-50 dark:from-purple-900/10 to-transparent"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-50 dark:from-purple-900/10 to-transparent"
        ></motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4"
              >
                <div className="text-purple-600 dark:text-purple-400">
                  {feature.icon}
                </div>
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Teachers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {teachers.map((teacher, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden group"
            >
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {teacher.name}
                  </h3>
                  <p className="text-gray-200 text-sm">{teacher.specialties}</p>
                </motion.div>
              </div>
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-3 gap-4"
                >
                  {Object.entries(teacher.stats).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-purple-600 dark:text-purple-400 font-semibold flex items-center justify-center gap-1">
                        {value}
                        {key === "rating" && (
                          <Star className="w-4 h-4 fill-current" />
                        )}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  View Profile
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </section>
  );
};

export default Teachers;
