import React from "react";

const BlogPage = () => {
  const blogPosts = [
    {
      title: "Sukhasana: The Easy Pose",
      description:
        "Sukhasana is a simple seated posture that helps with relaxation and mindfulness. It is perfect for meditation and calming your mind.",
      image:
        "https://media.gettyimages.com/id/1320177756/photo/young-adult-woman-is-practicing-yoga-in-a-modern-loft.jpg?s=2048x2048&w=gi&k=20&c=b752gReApIgGY6Rq7o1-jPmsrbCw02XOfKrxb3HoSgU=",
      link: "/sukhasana-details",
      author: "John Doe",
      date: "November 24, 2024",
      time: "10:30 AM",
    },
    {
      title: "Adho Mukha Svanasana: Downward Dog",
      description:
        "A foundational pose that stretches the hamstrings and spine. It’s great for calming the mind and strengthening the body.",
      image:
        "https://media.hearstapps.com/loop/downward-dog-edited-1-1617286688.mp4/poster.jpg",
      link: "/downward-dog-details",
      author: "Jane Smith",
      date: "November 22, 2024",
      time: "2:45 PM",
    },
    {
      title: "Virabhadrasana I: Warrior I",
      description:
        "A standing pose that strengthens the legs, opens the chest, and improves focus and balance. It energizes your whole body.",
      image:
        "https://yogajala.com/wp-content/uploads/2021/11/The-Yoga-Warrior-Pose-Explained_-The-5-Warrior-Poses.jpg",
      link: "/warrior-1-details",
      author: "Alice Green",
      date: "November 20, 2024",
      time: "9:00 AM",
    },
    {
      title: "Vrksasana: Tree Pose",
      description:
        "A balancing posture that enhances stability and focus. Perfect for building core strength and improving your posture.",
      image:
        "https://t4.ftcdn.net/jpg/06/65/80/01/360_F_665800190_u59ww8djyzrHbyl0ptD55uHHgxo48qW7.jpg",
      link: "/tree-pose-details",
      author: "Chris Lee",
      date: "November 18, 2024",
      time: "4:15 PM",
    },
    {
      title: "Balasana: Child's Pose",
      description:
        "A gentle resting pose to stretch the back, hips, and thighs. It’s often used to relax and center the mind during practice.",
      image:
        "https://t4.ftcdn.net/jpg/00/99/66/59/360_F_99665987_hAxRHpLXxxlDIvAZ7U7OItxoUgEsUPv2.jpg",
      link: "/child-pose-details",
      author: "Emma Brown",
      date: "November 15, 2024",
      time: "8:00 AM",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Yoga Blogs</h1>
          <p className="text-lg text-gray-600 mt-4">
            Explore the world of yoga with detailed guides to various poses.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <a
                  href={post.link}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  See More →
                </a>
                {/* Author and Date */}
                <div className="mt-4 border-t pt-4 text-sm text-gray-500">
                  <p>
                    Posted by <span className="font-medium">{post.author}</span>
                  </p>
                  <p>
                    On {post.date} at {post.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
