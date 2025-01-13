import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "../Components/Hero";
import Testimonials from "../Components/Testimonial";
import YogaPoses from "../Components/YogaPoses";
import Footer from "../Components/Footer";
import RecommendedBatches from "../Components/RecommendedBatches";
import DarkModeClasses from "../Components/DarkMode";

// Animation Variants for FadeInUp
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

// Staggered container for smoother transitions
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Home = () => {
  // AOS (Animate On Scroll) initialization for additional scroll animations
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full bgcAll m-0 p-0 ${DarkModeClasses.container} overflow-x-hidden`}
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Hero Section */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }} // Trigger only once when it enters the viewport
          >
            <Hero />
          </motion.div>

          {/* Yoga Poses Section */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }} // Trigger only once when it enters the viewport
          >
            <YogaPoses />
          </motion.div>

          {/* Recommended Batches Section */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }} // Trigger only once when it enters the viewport
          >
            <RecommendedBatches />
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }} // Trigger only once when it enters the viewport
          >
            <Testimonials />
          </motion.div>

          {/* Footer Section */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }} // Trigger only once when it enters the viewport
          >
            <Footer />
          </motion.div>
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
};

export default Home;
