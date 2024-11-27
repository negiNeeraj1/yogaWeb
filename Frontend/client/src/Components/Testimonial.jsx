import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    text: "Yoga has transformed my energy levels and focus throughout the day. I feel calmer and more grounded after every session!",
    name: "Davy Bryson",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww",
    galleryImage:
      "https://st2.depositphotos.com/3941151/9048/i/950/depositphotos_90483988-stock-photo-sexy-woman-doing-yoga-exercises.jpg",
  },
  {
    text: "The mindfulness practices have helped me manage stress better. I'm sleeping better and feeling more balanced.",
    name: "Sarah Chen",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww",
    galleryImage:
      "https://media.istockphoto.com/id/924163406/photo/young-woman-doing-cobra-exercise.jpg?s=612x612&w=0&k=20&c=h9nNF3H0eYGIZMTTPy1aGuU8_grk0Hc_caQEU93CU2Y=",
  },
  {
    text: "I've noticed significant improvements in my flexibility and strength. The instructors are amazing!",
    name: "Michael Rodriguez",
    image:
      "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    galleryImage:
      "https://c4.wallpaperflare.com/wallpaper/804/257/228/girl-pose-gymnastics-yoga-wallpaper-preview.jpg",
  },
  {
    text: "This program has been life-changing. I'm more focused at work and relaxed at home.",
    name: "Emma Thompson",
    image:
      "https://images.unsplash.com/photo-1663893364107-a6ecd06cf615?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    galleryImage:
      "https://image.tensorartassets.com/cdn-cgi/image/anim=true,plain=false,w=2048,f=jpeg,q=85/posts/images/617258676985691651/1327b156-8a63-4aab-94ea-1816dde24bd8.jpg",
  },
];

const Testimonials = () => {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  return (
    <section className="py-20 bg-white" id="testimonial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="zoom-in">
          <span className="text-indigo-600 font-semibold">TESTIMONIALS</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Once you try it, you can't go back
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8" data-aos="fade-right">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, Controller]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              onSwiper={setFirstSwiper}
              controller={{ control: secondSwiper }}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-gray-50 p-8 rounded-lg shadow-md transform transition-all duration-500 hover:shadow-lg">
                    <div className="flex flex-col items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mb-4 border-2 border-indigo-500"
                      />
                      <blockquote className="text-gray-600 text-center italic mb-4">
                        "{testimonial.text}"
                      </blockquote>
                      <p className="text-indigo-600 font-semibold text-center">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="relative" data-aos="fade-left">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, Controller]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              onSwiper={setSecondSwiper}
              controller={{ control: firstSwiper }}
              className="gallery-swiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={testimonial.galleryImage}
                      alt={`${testimonial.name}'s transformation`}
                      className="w-full h-96 object-cover rounded-lg transform transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
