import React, { useState } from 'react';

const ClassesPage = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');

  const classes = [
    {
      id: 1,
      title: "Foundational Poses (Asanas)",
      description: "Perfect for those just starting their yoga journey. Learn the fundamental poses and breathing techniques.",
      duration: "60 minutes",
      level: "beginner",
      schedule: "Mon, Wed, Fri 9:00 AM",
      instructor: "Sarah Parker",
      price: "$15 per class",
      startDate: "January 15, 2025",
      mode: "Both Online & Offline",
      eligibility: "Open to complete beginners",
      curriculum: "Basic poses, breathing techniques, meditation basics",
      maxCapacity: "15 students",
      image: {
        src: "https://images.unsplash.com/photo-1569303586412-2f20d71a2977",
        alt: "Instructor demonstrating Sun Salutation pose"
      }
    },
    {
      id: 2,
      title: "Gentle Hatha Yoga",
      description: "A calm and relaxing approach to basic yoga postures and breathing exercises.",
      duration: "75 minutes",
      level: "beginner",
      schedule: "Tue, Thu 8:00 AM",
      instructor: "Michael Chen",
      price: "$18 per class",
      startDate: "January 20, 2025",
      mode: "Offline Only",
      eligibility: "Suitable for seniors and beginners",
      curriculum: "Joint mobility, gentle stretches, relaxation techniques",
      maxCapacity: "12 students",
      image: {
        src: "https://images.unsplash.com/photo-1591076482161-bc7f10f01c06",
        alt: "Student practicing Hatha yoga pose"
      }
    },
    {
      id: 3,
      title: "Vinyasa Flow",
      description: "Dynamic flowing sequences synchronized with breath for intermediate practitioners.",
      duration: "90 minutes",
      level: "intermediate",
      schedule: "Mon, Wed, Fri 10:30 AM",
      instructor: "Emma Williams",
      price: "$20 per class",
      startDate: "February 1, 2025",
      mode: "Both Online & Offline",
      eligibility: "6 months prior yoga experience required",
      curriculum: "Advanced flows, balance poses, inversions",
      maxCapacity: "12 students",
      image: {
        src: "https://images.unsplash.com/photo-1547045699-bdbcf82ddf50",
        alt: "Instructor demonstrating Vinyasa flow sequence"
      }
    },
    {
      id: 4,
      title: "Power Yoga",
      description: "Intense and energetic practice focusing on strength and flexibility.",
      duration: "75 minutes",
      level: "intermediate",
      schedule: "Tue, Thu 5:30 PM",
      instructor: "David Kumar",
      price: "$22 per class",
      startDate: "January 25, 2025",
      mode: "Offline Only",
      eligibility: "Intermediate level practitioners",
      curriculum: "Strength training, advanced poses, endurance building",
      maxCapacity: "10 students",
      image: {
        src: "https://images.unsplash.com/photo-1608686499116-646ba96d2077",
        alt: "Student in advanced Power yoga pose"
      }
    },
    {
      id: 5,
      title: "Ashtanga Yoga",
      description: "Traditional and rigorous practice following specific sequence of poses.",
      duration: "120 minutes",
      level: "advanced",
      schedule: "Mon, Wed, Fri 6:00 AM",
      instructor: "Lisa Martinez",
      price: "$25 per class",
      startDate: "February 5, 2025",
      mode: "Offline Only",
      eligibility: "Minimum 2 years of regular practice",
      curriculum: "Traditional Ashtanga series, advanced breathing techniques",
      maxCapacity: "8 students",
      image: {
        src: "https://images.unsplash.com/photo-1517632298124-bb2629e93b15",
        alt: "Advanced practitioner in Ashtanga pose"
      }
    }
  ];
  

  const filterClasses = (level) => {
    if (level === 'all') return classes;
    return classes.filter(yogaClass => yogaClass.level === level);
  };

  const filteredClasses = filterClasses(selectedLevel);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Yoga Classes
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find the perfect class for your yoga journey
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-6 py-2 rounded-full ${
                selectedLevel === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              } transition duration-300`}
            >
              All Levels
            </button>
            <button
              onClick={() => setSelectedLevel('beginner')}
              className={`px-6 py-2 rounded-full ${
                selectedLevel === 'beginner'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              } transition duration-300`}
            >
              Beginner
            </button>
            <button
              onClick={() => setSelectedLevel('intermediate')}
              className={`px-6 py-2 rounded-full ${
                selectedLevel === 'intermediate'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              } transition duration-300`}
            >
              Intermediate
            </button>
            <button
              onClick={() => setSelectedLevel('advanced')}
              className={`px-6 py-2 rounded-full ${
                selectedLevel === 'advanced'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              } transition duration-300`}
            >
              Advanced
            </button>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((yogaClass) => (
            <div
              key={yogaClass.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              {/* Image Placeholder */}
              <div className="h-64 bg-gray-200 relative">
                <img
                  src="/api/placeholder/400/320"
                  alt={yogaClass.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                  {yogaClass.level.charAt(0).toUpperCase() + yogaClass.level.slice(1)}
                </div>
              </div>

              {/* Class Details */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {yogaClass.title}
                </h3>
                <p className="text-gray-600 mb-4">{yogaClass.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Duration:</strong> {yogaClass.duration}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span><strong>Schedule:</strong> {yogaClass.schedule}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span><strong>Instructor:</strong> {yogaClass.instructor}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Price:</strong> {yogaClass.price}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Mode:</strong> {yogaClass.mode}</span>
                  </div>
                </div>

                {/* Expandable Details */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Course Details:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Start Date:</strong> {yogaClass.startDate}</li>
                    <li><strong>Eligibility:</strong> {yogaClass.eligibility}</li>
                    <li><strong>Maximum Capacity:</strong> {yogaClass.maxCapacity}</li>
                    <li><strong>Curriculum:</strong> {yogaClass.curriculum}</li>
                  </ul>
                </div>

                <button
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                  aria-label={`Book ${yogaClass.title}`}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;