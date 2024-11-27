import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "../Components/Hero";
import Testimonials from "../Components/Testimonial";
import YogaPoses from "../Components/YogaPoses";
import Footer from "../Components/Footer";

const Home = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 1000,
    });
  }, []);

  return (
    <main className="w-full">
      <Hero />
      <YogaPoses />
      <Testimonials />
      <Footer/>

    </main>
  );
};

export default Home;
