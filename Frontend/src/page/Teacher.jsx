import React from "react";

const teachers = [
  {
    name: "Sushma",
    specialties: "Yin yoga, meditation, hatha vinayasa flow",
    image: "img/customer1.jpg",
  },
  // Add other teachers
];

const Teachers = () => {
  return (
    <section className="py-20 bg-gray-50" id="Teachers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900">Our Teachers</h2>
          <p className="mt-4 text-xl text-gray-600">
            Each teacher brings a wealth of knowledge, compassion, and
            personalized guidance to help you grow in your practice.
          </p>
          <button className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition">
            Try 14 days for free
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              data-aos="fade-right"
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {teacher.name}
              </h3>
              <p className="text-gray-600">{teacher.specialties}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-900">
            Make yoga part of your life
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Sharing the love of yoga to create positive change in the world
          </p>
        </div>
      </div>
    </section>
  );
};


export default Teachers