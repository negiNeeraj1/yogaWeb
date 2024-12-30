import React from "react";
import Footer from "../Components/Footer";

const teachers = [
  {
    name: "Sushma",
    specialties: "Yin yoga, meditation, hatha vinayasa flow",
    image:
      "https://media.istockphoto.com/id/1450919161/photo/portrait-of-a-scottish-fold-cat.jpg?s=612x612&w=0&k=20&c=ABNW7KDuLdG69-AStth6ES0bj1E4QXL8OT6RF3B-5cU=",
  },
];

const Teachers = () => {
  return (
    <section
      className="py-20 bg-white dark:bg-[#0F172A] transition-colors duration-300"
      id="Teachers"
    >
     
      <div className="max-w-7xl py-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16" >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
            Our Teachers
          </h2>
          <p className="mt-4 text-md text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Each teacher brings a wealth of knowledge, compassion, and
            personalized guidance to help you grow in your practice.
          </p>
          <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
            Try 14 days for free
          </button>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1E293B] p-6 rounded-lg shadow-md dark:shadow-[#0F172A]/20 border border-gray-100 dark:border-[#2D3D53] hover:shadow-lg dark:hover:shadow-[#0F172A]/50 transition-all duration-300"
              
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-4 ring-gray-100 dark:ring-[#2D3D53] transition-colors duration-300"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">
                {teacher.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                {teacher.specialties}
              </p>
            </div>
          ))}
        </div>

        
        {/* <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
            Make yoga part of your life
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Sharing the love of yoga to create positive change in the world
          </p>
        </div> */}
        
      </div>

      <Footer/>
    </section>
  );
};

export default Teachers;
