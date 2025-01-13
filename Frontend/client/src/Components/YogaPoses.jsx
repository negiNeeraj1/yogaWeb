import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const poses = [
  {
    number: "01",
    title: "Sukhasana",
    description:
      "Sukhasana, or Easy Pose, is a simple seated posture that promotes relaxation and mindfulness. It helps in improving posture, reducing stress, and calming the mind.",
    image:
      "https://media.gettyimages.com/id/1320177756/photo/young-adult-woman-is-practicing-yoga-in-a-modern-loft.jpg?s=2048x2048&w=gi&k=20&c=b752gReApIgGY6Rq7o1-jPmsrbCw02XOfKrxb3HoSgU=",
  },
  {
    number: "02",
    title: "Downward Dog",
    description:
      "Adho Mukha Svanasana, or Downward-Facing Dog, is a foundational pose in yoga that stretches the hamstrings, calves, and spine. It also helps to strengthen the arms and legs while calming the mind.",
    image:
      "https://media.hearstapps.com/loop/downward-dog-edited-1-1617286688.mp4/poster.jpg",
  },
  {
    number: "03",
    title: "Warrior I",
    description:
      "Virabhadrasana I, or Warrior I, is a standing pose that strengthens the legs, opens the hips and chest, and improves focus and balance.",
    image:
      "https://yogajala.com/wp-content/uploads/2021/11/The-Yoga-Warrior-Pose-Explained_-The-5-Warrior-Poses.jpg",
  },
  {
    number: "04",
    title: "Tree Pose",
    description:
      "Vrksasana, or Tree Pose, is a balancing posture that strengthens the legs and core while improving focus and stability. It also opens the hips and stretches the inner thighs.",
    image:
      "https://t4.ftcdn.net/jpg/06/65/80/01/360_F_665800190_u59ww8djyzrHbyl0ptD55uHHgxo48qW7.jpg",
  },
  {
    number: "05",
    title: "Child's Pose",
    description:
      "Balasana, or Child's Pose, is a gentle resting pose that helps to stretch the back, hips, and thighs. It's often used to relax and center the mind during a yoga practice.",
    image:
      "https://media.gettyimages.com/id/960941650/photo/mature-woman-practicing-yoga-in-childs-pose-at-home.jpg?s=612x612&w=0&k=20&c=Azxy8ao7mSzr8MeMXirj193QEP68-Cx8JS-w6lAgnFE=",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const YogaPoses = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-gray-50 dark:bg-gray-900"
      id="blog"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-indigo-600 dark:text-indigo-400 font-semibold"
          >
            Some Yoga Poses
          </motion.span>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-3xl text-gray-900 dark:text-white font-bold leading-tight"
          >
            Your daily dose of health in 3 simple steps
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          {poses.slice(0, showMore ? poses.length : 4).map((pose, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/pose-detail" className="group">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <motion.div
                    className="flex-1 space-y-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {pose.number}
                    </p>
                    <h3 className="mt-2 text-xl text-gray-900 dark:text-white font-bold leading-tight">
                      {pose.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {pose.description}
                    </p>
                  </motion.div>
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={pose.image}
                      alt={pose.title}
                      className="w-full h-64 object-cover rounded-lg shadow-md 
                      dark:shadow-gray-800"
                    />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={() => setShowMore(!showMore)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 
            font-semibold hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            {showMore ? "Show Less" : "See More"}
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowRight className="ml-2" size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default YogaPoses;
