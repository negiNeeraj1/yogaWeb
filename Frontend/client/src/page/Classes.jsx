import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ClassesPage = ({ onExplore, onBuyNow }) => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState("all");

  const classes = [
    {
      id: 1,
      title: "Foundational Poses (Asanas)",
      description: "Perfect for those just starting their yoga journey.",
      fullDescription: "Dive deep into the fundamental poses that form the building blocks of yoga practice. This comprehensive course is designed for beginners who want to establish a strong foundation in yoga.",
      originalPrice: 2000,
      discountedPrice: 1499,
      level: "beginner",
      duration: "8 weeks",
      studentsEnrolled: 1500,
      image: {
        src: "https://media.istockphoto.com/id/1219401141/photo/woman-practicing-yoga-in-lotus-position-at-park.jpg?s=612x612&w=0&k=20&c=Bk7HV73FLORtdNrnB9L0MI9tbMLB28W1c5N65bMiPvI=",
        alt: "Instructor demonstrating Sun Salutation pose",
      },
      highlights: [
        "Basic yoga philosophy and principles",
        "20+ fundamental yoga poses with proper alignment",
        "Breathing techniques (Pranayama)",
        "Meditation basics",
        "Safe practice guidelines"
      ],
      instructor: {
        name: "Sarah Johnson",
        bio: "Certified yoga instructor with 10+ years of teaching experience",
        image: "/api/placeholder/100/100"
      }
    },
    {
      id: 2,
      title: "Gentle Hatha Yoga",
      description: "A calm and relaxing approach to basic yoga postures.",
      fullDescription: "Experience the therapeutic benefits of gentle Hatha yoga. This course focuses on slow-paced, mindful movement combined with breath awareness.",
      originalPrice: 2500,
      discountedPrice: 1799,
      level: "beginner",
      duration: "10 weeks",
      studentsEnrolled: 1200,
      image: {
        src: "https://media.istockphoto.com/id/1919389111/photo/old-friends-meditating-on-mats-in-park.jpg?s=612x612&w=0&k=20&c=oJhWy2TBo4gxDfyIPkHqcH31tL2Y-Gj62eCYwY3hEmY=",
        alt: "Student practicing Hatha yoga pose",
      },
      highlights: [
        "Gentle, mindful movements",
        "Stress reduction techniques",
        "Joint mobility exercises",
        "Restorative poses",
        "Mind-body connection practices"
      ],
      instructor: {
        name: "Michael Chen",
        bio: "Specialized in therapeutic yoga with 8 years of experience",
        image: "/api/placeholder/100/100"
      }
    },
    {
      id: 3,
      title: "Vinyasa Flow",
      description: "Dynamic flowing sequences synchronized with breath.",
      fullDescription: "Join us for an energizing Vinyasa Flow practice that synchronizes breath with movement. This course will teach you how to create seamless transitions between poses.",
      originalPrice: 3000,
      discountedPrice: 2299,
      level: "intermediate",
      duration: "12 weeks",
      studentsEnrolled: 800,
      image: {
        src: "https://media.istockphoto.com/id/589554884/photo/woman-in-yoga-asana-vrikshasana-tree-pose-in-mountains-outdoors.jpg?s=612x612&w=0&k=20&c=ohUiTrrVA6A1G2WvxThRoahAO2EfcIGWTlr1F9FGYBE=",
        alt: "Instructor demonstrating Vinyasa flow sequence",
      },
      highlights: [
        "Dynamic flow sequences",
        "Advanced breathing techniques",
        "Core strength development",
        "Balance poses",
        "Arm balances introduction"
      ],
      instructor: {
        name: "David Rodriguez",
        bio: "Former dancer turned yoga instructor with 12 years of experience",
        image: "/api/placeholder/100/100"
      }
    },
    {
      id: 4,
      title: "Power Yoga",
      description: "Intense and energetic practice for strength and flexibility.",
      fullDescription: "Challenge yourself with this intense Power Yoga course designed to build strength, increase flexibility, and enhance mental focus through dynamic, flowing sequences.",
      originalPrice: 3500,
      discountedPrice: 2799,
      level: "intermediate",
      duration: "10 weeks",
      studentsEnrolled: 600,
      image: {
        src: "https://media.istockphoto.com/id/1952501679/photo/old-man-meditating-on-yoga-mat-in-yard.jpg?s=612x612&w=0&k=20&c=-531TKjfAX_ukDNEUOaFaF5XizitTAs7sY-HEd979ME=",
        alt: "Student in advanced Power yoga pose",
      },
      highlights: [
        "Strength-building sequences",
        "Advanced asana practice",
        "Power flow techniques",
        "Core power development",
        "Endurance training"
      ],
      instructor: {
        name: "Lisa Thompson",
        bio: "Power yoga specialist and fitness trainer with 15 years of experience",
        image: "/api/placeholder/100/100"
      }
    },
    {
      id: 5,
      title: "Ashtanga Yoga",
      description: "Traditional and rigorous practice following specific sequence.",
      fullDescription: "Immerse yourself in the traditional practice of Ashtanga Yoga. Learn the primary series and develop a strong, disciplined practice following the authentic methodology.",
      originalPrice: 4000,
      discountedPrice: 3299,
      level: "advanced",
      duration: "16 weeks",
      studentsEnrolled: 400,
      image: {
        src: "https://media.istockphoto.com/id/1767112357/photo/authentic-shot-of-an-indian-senior-monk-practicing-yoga-in-a-temple-setting-serene-and.jpg?s=612x612&w=0&k=20&c=cDKGiHCzAAnNM_o-niWaCRYyGRKmi8VQnAwNbWFWvxs=",
        alt: "Advanced practitioner in Ashtanga pose",
      },
      highlights: [
        "Traditional Ashtanga sequence",
        "Sanskrit counting",
        "Advanced transitions",
        "Mysore-style practice",
        "Philosophy and history"
      ],
      instructor: {
        name: "Amit Patel",
        bio: "Certified Ashtanga instructor trained in Mysore, India",
        image: "/api/placeholder/100/100"
      }
    },
  ];

  const filterClasses = (level) => {
    if (level === "all") return classes;
    return classes.filter((yogaClass) => yogaClass.level === level);
  };

  const handleExplore = (id) => {
    navigate(`/course/${id}`);
  };

  const handleBuyNow = (id) => {
    if (onBuyNow) {
      onBuyNow(id);
    }
  };

  const filteredClasses = filterClasses(selectedLevel);

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Yoga Classes</h1>
          <p className="text-lg text-gray-600 mb-8">Find the perfect class for your yoga journey</p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["all", "beginner", "intermediate", "advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                  selectedLevel === level
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((yogaClass) => (
            <div
              key={yogaClass.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={yogaClass.image.src}
                  alt={yogaClass.image.alt}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                  {yogaClass.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {yogaClass.description}
                </p>
                
                {/* Course Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {yogaClass.duration}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {yogaClass.studentsEnrolled.toLocaleString()} students
                  </span>
                </div>
                
                {/* Price Section */}
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-gray-800">
                    ₹{yogaClass.discountedPrice}
                  </span>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ₹{yogaClass.originalPrice}
                  </span>
                  <span className="ml-2 text-green-500 text-sm">
                    {Math.round((1 - yogaClass.discountedPrice / yogaClass.originalPrice) * 100)}% off
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleExplore(yogaClass.id)}
                    className="flex-1 button-hover btn-all text-white py-2 rounded-lg transition-colors duration-300" style={{fontWeight:"600"}}
                  >
                    Explore
                  </button>
                  <button 
                    onClick={() => handleBuyNow(yogaClass.id)}
                    className="flex-1 button-hover text-white py-2 rounded-lg transition-colors duration-300"style={{border:"1px solid #e97963",color:"#e97963",fontWeight:"600"}}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;