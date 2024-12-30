import React from "react";
import Footer from "../Components/Footer";

const BlogPage = () => {

  const blogPosts = [
    {
      title: "Sukhasana: The Easy Pose",
      description:
        "Sukhasana is a simple seated posture that helps with relaxation and mindfulness. It is perfect for meditation and calming your mind.",
      image: "/api/placeholder/400/320",
      link: "/sukhasana-details",
      author: "John Doe",
      date: "November 24, 2024",
      time: "10:30 AM",
    },
    {
      title: "Adho Mukha Svanasana: Downward Dog",
      description:
        "A foundational pose that stretches the hamstrings and spine. It's great for calming the mind and strengthening the body.",
      image: "/api/placeholder/400/320",
      link: "/downward-dog-details",
      author: "Jane Smith",
      date: "November 22, 2024",
      time: "2:45 PM",
    },
    {
      title: "Virabhadrasana I: Warrior I",
      description:
        "A standing pose that strengthens the legs, opens the chest, and improves focus and balance. It energizes your whole body.",
      image: "/api/placeholder/400/320",
      link: "/warrior-1-details",
      author: "Alice Green",
      date: "November 20, 2024",
      time: "9:00 AM",
    },
    {
      title: "Vrksasana: Tree Pose",
      description:
        "A balancing posture that enhances stability and focus. Perfect for building core strength and improving your posture.",
      image: "/api/placeholder/400/320",
      link: "/tree-pose-details",
      author: "Chris Lee",
      date: "November 18, 2024",
      time: "4:15 PM",
    },
    {
      title: "Balasana: Child's Pose",
      description:
        "A gentle resting pose to stretch the back, hips, and thighs. It's often used to relax and center the mind during practice.",
      image: "/api/placeholder/400/320",
      link: "/child-pose-details",
      author: "Emma Brown",
      date: "November 15, 2024",
      time: "8:00 AM",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#0F172A] transition-colors duration-300">
      
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 pt-5">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
            Yoga Blogs
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors duration-300 mt-4">
            Explore the world of yoga with detailed guides to various poses.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md dark:shadow-[#0F172A]/20 overflow-hidden border border-gray-100 dark:border-[#2D3D53] hover:shadow-lg dark:hover:shadow-[#0F172A]/50 transition-all duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-4">
                  {post.description}
                </p>
                <a
                  href={post.link}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold transition-colors duration-300"
                >
                  See More →
                </a>
                
                <div className="mt-4 border-t border-gray-200 dark:border-[#2D3D53] pt-4 text-sm transition-colors duration-300">
                  <p className="text-gray-500 dark:text-gray-400">
                    Posted by{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {post.author}
                    </span>
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    On {post.date} at {post.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer/>
    </section>
  );
};

export default BlogPage;
