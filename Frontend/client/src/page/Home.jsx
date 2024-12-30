import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "../Components/Hero";
import Testimonials from "../Components/Testimonial";
import YogaPoses from "../Components/YogaPoses";
import Footer from "../Components/Footer";
import RecommendedBatches from "../Components/RecommendedBatches";
import DarkModeClasses from "../Components/DarkMode";

const Home = () => {
  useEffect(() => {
    AOS.init({
      offset: 150,
      duration: 1000,
    });
  }, []);

  return (
    <main
      className={`w-full bgcAll m-0 p-0 ${DarkModeClasses.container} overflow-x-hidden`}
    >
      <Hero />
      <YogaPoses />
      <RecommendedBatches />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Home;
