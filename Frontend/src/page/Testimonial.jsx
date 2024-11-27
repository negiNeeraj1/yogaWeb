import React from "react";

const Testimonials = [
  {
    name: "John Doe",
    feedback:
      "Yoga has helped me achieve a state of peace and balance that I never thought was possible. Highly recommend to anyone!",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Jane Smith",
    feedback:
      "This practice has transformed my life. I feel healthier, stronger, and more centered.",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    name: "Mark Lee",
    feedback:
      "I never imagined how much yoga would impact my physical and mental health. The difference is incredible!",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Emily Williams",
    feedback:
      "I’ve been doing yoga for a few months now, and it’s been a life-changing experience. The instructors are amazing!",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    name: "Sarah Brown",
    feedback:
      "The yoga sessions here are fantastic! I feel so much more connected to myself and at ease.",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    name: "Daniel Green",
    feedback:
      "Yoga has not only improved my flexibility but also my overall mindset. It's the best decision I've made.",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    name: "Sophia Carter",
    feedback:
      "I feel so much more energized and focused after practicing yoga. I can’t recommend it enough!",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    name: "James Miller",
    feedback:
      "Yoga has taught me to embrace mindfulness and balance in my life. It’s been a truly rewarding experience.",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    name: "Olivia Thomas",
    feedback:
      "The yoga classes here are wonderful! I love how the sessions combine strength and relaxation.",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    name: "William Harris",
    feedback:
      "I’ve seen significant improvements in my posture and flexibility thanks to yoga. It’s been amazing!",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
  },
];

const Images = [
  "https://source.unsplash.com/200x200/?nature",
  "https://source.unsplash.com/200x200/?beach",
  "https://source.unsplash.com/200x200/?mountains",
  "https://source.unsplash.com/200x200/?yoga",
  "https://source.unsplash.com/200x200/?forest",
  "https://source.unsplash.com/200x200/?sky",
  "https://source.unsplash.com/200x200/?exercise",
  "https://source.unsplash.com/200x200/?outdoors",
  "https://source.unsplash.com/200x200/?landscape",
  "https://source.unsplash.com/200x200/?wellness",
];

const TestimonialPage = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">What Our Clients Say</h1>
          <p className="text-lg text-gray-600 mt-4">
            Hear from some of our satisfied yoga practitioners!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Testimonials */}
          <div className="space-y-8">
            {Testimonials.map((testimonial, index) => (
              <div key={index} className="flex items-center space-x-6">
                {/* Profile Image */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Feedback */}
                <div>
                  <p className="font-semibold text-lg text-gray-800">{testimonial.name}</p>
                  <p className="mt-2 text-gray-600 italic">{testimonial.feedback}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Images */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Images.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                <img src={image} alt="testimonials image" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialPage;
