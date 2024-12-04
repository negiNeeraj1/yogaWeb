import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialData = [
  {
    name: "John Doe",
    joinDate: "Member since January 2024",
    feedback: "Yoga has helped me achieve a state of peace and balance that I never thought was possible. The instructors here are truly exceptional.",
    image: "https://imgs.search.brave.com/yilXF3RmK1gydnEn0g106Rz81U_pbcGv-S_A7zPNcZk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjc0/MDQ5NTAyL3Bob3Rv/L2ltLXRvby13b3Jy/aWVkLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz14YjlndWlL/X0YxMHFYb21GTk8t/SUE0SUpyM1VONFM3/RDBDWTY3WGN3N2lB/PQ",
    duration: "6 months"
  },
  {
    name: "Sarah Brown",
    joinDate: "Member since March 2023",
    feedback: "The mindfulness techniques I've learned here have transformed my daily life. I feel more centered and focused than ever before.",
    image: "https://imgs.search.brave.com/kj2XynP9TdrnnuEzMEg4U_5Kqis0yIyQyAZoeaciUxg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTA4/OTU2NjQ0L3Bob3Rv/L3ByZXR0eS1jb2xv/bWJpYW4td29tYW4u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWpFd1RDTUtTcGpZ/c2FTZmlGSWxpZllu/ZVVwY3p1cmVRRmw4/bzU0M19aakU9",
    duration: "1 year"
  },
  {
    name: "Mark Lee",
    joinDate: "Member since June 2023",
    feedback: "From a complete beginner to now, the progress I've made is incredible. The supportive community here makes all the difference.",
    image: "https://imgs.search.brave.com/yilXF3RmK1gydnEn0g106Rz81U_pbcGv-S_A7zPNcZk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjc0/MDQ5NTAyL3Bob3Rv/L2ltLXRvby13b3Jy/aWVkLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz14YjlndWlL/X0YxMHFYb21GTk8t/SUE0SUpyM1VONFM3/RDBDWTY3WGN3N2lB/PQ",
    duration: "9 months"
  },
  {
    name: "Emily Williams",
    joinDate: "Member since December 2023",
    feedback: "The personalized attention and expert guidance have helped me develop a sustainable practice that fits my lifestyle.",
    image: "https://imgs.search.brave.com/kj2XynP9TdrnnuEzMEg4U_5Kqis0yIyQyAZoeaciUxg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTA4/OTU2NjQ0L3Bob3Rv/L3ByZXR0eS1jb2xv/bWJpYW4td29tYW4u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWpFd1RDTUtTcGpZ/c2FTZmlGSWxpZllu/ZVVwY3p1cmVRRmw4/bzU0M19aakU9",
    duration: "3 months"
  },
  {
    name: "Daniel Green",
    joinDate: "Member since August 2023",
    feedback: "As someone with previous injuries, I appreciate how the instructors modify poses to ensure safe practice while still challenging me.",
    image: "https://imgs.search.brave.com/UrfOYEfNVGk4HuKB7mAT48RnMwUv0720Mmnl2dmsao0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzUzLzA3LzM2/LzM2MF9GXzg1MzA3/MzY5Ml9kd3hxSjBM/WWUzU1o3eGtFYVQ4/WEtiNXpmUzJCdnhV/di5qcGc",
    duration: "8 months"
  },
  {
    name: "Sophia Carter",
    joinDate: "Member since February 2023",
    feedback: "The variety of classes and workshops keeps me engaged and continuously learning. It's been an amazing journey of growth.",
    image: "https://imgs.search.brave.com/yilXF3RmK1gydnEn0g106Rz81U_pbcGv-S_A7zPNcZk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjc0/MDQ5NTAyL3Bob3Rv/L2ltLXRvby13b3Jy/aWVkLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz14YjlndWlL/X0YxMHFYb21GTk8t/SUE0SUpyM1VONFM3/RDBDWTY3WGN3N2lB/PQ",
    duration: "1 year"
  },
  {
    name: "James Miller",
    joinDate: "Member since April 2023",
    feedback: "The combination of physical practice and philosophical teachings has given me a deeper understanding of yoga's true benefits.",
    image: "/api/placeholder/80/80",
    duration: "11 months"
  },
  {
    name: "Olivia Thomas",
    joinDate: "Member since July 2023",
    feedback: "I've noticed significant improvements in my flexibility and strength. The progress tracking tools are incredibly motivating.",
    image: "https://imgs.search.brave.com/yilXF3RmK1gydnEn0g106Rz81U_pbcGv-S_A7zPNcZk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjc0/MDQ5NTAyL3Bob3Rv/L2ltLXRvby13b3Jy/aWVkLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz14YjlndWlL/X0YxMHFYb21GTk8t/SUE0SUpyM1VONFM3/RDBDWTY3WGN3N2lB/PQ",
    duration: "6 months"
  },
  {
    name: "William Harris",
    joinDate: "Member since September 2023",
    feedback: "The online classes during lockdown were excellent, and the transition back to in-person sessions was seamless.",
    image: "/api/placeholder/80/80",
    duration: "5 months"
  },
  {
    name: "Emma Wilson",
    joinDate: "Member since November 2023",
    feedback: "The meditation sessions have helped me manage stress and anxiety. I'm grateful for this supportive community.",
    image: "/api/placeholder/80/80",
    duration: "4 months"
  }
];

const carouselImages = [
  "https://media.istockphoto.com/id/93094168/photo/sun-rising-meditation.jpg?s=612x612&w=0&k=20&c=1UcHN4s5HI9XB3ecVE2R2LQrWaUxInMa7DX97wOcUlM=",
  "https://media.istockphoto.com/id/1283377954/photo/yoga-silhouettes-of-group-of-people-meditating.jpg?s=612x612&w=0&k=20&c=rkxT6_5ljsdRsLs-59IVyB6CV6yarCjifMdcR9DMmOg=",
  "https://media.istockphoto.com/id/1219392296/photo/beautiful-woman-exercising-at-park.jpg?s=612x612&w=0&k=20&c=yumIeyjIFWDJWhrZ2Nr1Kd-MCvTM_ORxTyP8v4UerBI=",
  "https://media.istockphoto.com/id/2088139685/photo/young-woman-preforms-yoga-outdoors.jpg?s=612x612&w=0&k=20&c=5oxfyVNFWB5sKUYG1DvSz6rp2NTh-w7nrXusTN-iSmM=",
  "https://media.istockphoto.com/id/1178353856/photo/a-young-man-meditates-in-a-lotus-position-over-the-ganges-river-in-rishikesh-at-the-sunset.jpg?s=612x612&w=0&k=20&c=7j4JGKEY2KP5vMvK6yp6BbQIMRXm-YIZsMLK5bOrkPU="
];

const ProfessionalTestimonials = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('right');
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('left');
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="w-full bg-gray-50">
    {/* Image Carousel */}
    <div className="relative mx-auto px-4 md:px-0 md:h-[31rem] md:w-[50rem] overflow-hidden md:pt-20 md:ml-[23%] pt-10">
      <div 
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className="min-w-full h-64 md:h-full"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              style={{backgroundPosition: "center", backgroundSize: "cover"}}
            />
          </div>
        ))}
      </div>
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              currentImageIndex === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>

    {/* Testimonials Section */}
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800">
        What Our Students Say
      </h2>

      {/* Testimonial Card Container */}
      <div className="relative overflow-hidden">
        <div 
          className={`transform transition-all duration-500 ease-out ${
            isAnimating
              ? slideDirection === 'right'
                ? '-translate-x-full opacity-0'
                : 'translate-x-full opacity-0'
              : 'translate-x-0 opacity-100'
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0">
              <img
                src={testimonialData[currentTestimonialIndex].image}
                alt={testimonialData[currentTestimonialIndex].name}
                className="w-16 h-16 rounded-full object-cover mx-auto md:mx-0"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-semibold text-lg md:text-xl text-gray-800">
                  {testimonialData[currentTestimonialIndex].name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {testimonialData[currentTestimonialIndex].joinDate}
                </p>
                <p className="text-gray-600 italic font-serif">
                  "{testimonialData[currentTestimonialIndex].feedback}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center md:justify-end mt-6 space-x-2">
          <button
            onClick={prevTestimonial}
            disabled={isAnimating}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            disabled={isAnimating}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 flex justify-center items-center space-x-2">
        {testimonialData.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentTestimonialIndex ? 'w-6 bg-blue-500' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  </div>
);
};

export default ProfessionalTestimonials;