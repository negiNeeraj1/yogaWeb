import React from "react";

// About Page Component
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* About Hero Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Our Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming lives through the ancient practice of yoga in a modern
            context
          </p>
        </div>

        {/* Philosophy and Journey */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6" data-aos="fade-right">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Philosophy
              </h2>
              <p className="text-gray-600">
                At our studio, we believe in the transformative power of yoga to
                heal both body and mind. Our approach combines traditional yoga
                principles with modern wellness practices, creating a
                comprehensive system for physical and mental well-being.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Journey
              </h2>
              <p className="text-gray-600">
                Founded in 2015, our studio has grown from a small community
                space to a leading yoga center. We've helped thousands of
                students discover the benefits of regular yoga practice,
                mindfulness, and holistic wellness.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6" data-aos="fade-left">
            {[
              { number: "8+", label: "Years of Experience" },
              { number: "5000+", label: "Happy Students" },
              { number: "20+", label: "Certified Teachers" },
              { number: "100+", label: "Weekly Classes" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-3xl font-bold text-indigo-600 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage