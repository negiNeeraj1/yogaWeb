import React, { useState } from "react";
import {
  Eye,
  Calendar,
  BookOpen,
  Tag,
  Heart,
  Share2,
  ChevronRight,
} from "lucide-react";

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Yoga", "Wellness", "Fitness", "Meditation"];

  const blogs = [
    {
      id: 1,
      title: "The Benefits of Yoga",
      views: 1234,
      date: "2024-11-01",
      category: "Yoga",
      author: "Emma Johnson",
      excerpt:
        "Discover how regular yoga practice can transform your physical and mental well-being.",
      readTime: "5 min read",
      likes: 345,
      image: "/api/placeholder/800/400",
    },
    {
      id: 2,
      title: "How to Start Yoga at Home",
      views: 987,
      date: "2024-11-10",
      category: "Wellness",
      author: "Alex Rodriguez",
      excerpt:
        "Practical tips for beginners to create a peaceful yoga space and start their journey.",
      readTime: "4 min read",
      likes: 278,
      image: "/api/placeholder/800/400",
    },
    {
      id: 3,
      title: "Advanced Yoga Techniques",
      views: 456,
      date: "2024-11-20",
      category: "Fitness",
      author: "Sarah Kim",
      excerpt:
        "Explore challenging yoga poses and how to safely advance your practice.",
      readTime: "6 min read",
      likes: 412,
      image: "/api/placeholder/800/400",
    },
    {
      id: 4,
      title: "Meditation for Stress Relief",
      views: 789,
      date: "2024-11-25",
      category: "Meditation",
      author: "Michael Chen",
      excerpt:
        "Learn powerful meditation techniques to reduce stress and improve mental clarity.",
      readTime: "5 min read",
      likes: 356,
      image: "/api/placeholder/800/400",
    },
  ];

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-indigo-600">
          Yoga & Wellness Blogs
        </h2>
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
          >
            {/* Blog Image */}
            <div className="relative">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded-full flex items-center space-x-1">
                <Tag size={16} className="text-indigo-600" />
                <span className="text-sm font-medium text-gray-700">
                  {blog.category}
                </span>
              </div>
            </div>

            {/* Blog Content */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>

              {/* Blog Metadata */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <BookOpen size={16} className="text-indigo-500" />
                    <span>{blog.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye size={16} className="text-indigo-500" />
                    <span>{blog.views} Views</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Heart size={16} className="text-red-500" />
                    <span>{blog.likes}</span>
                  </div>
                </div>
              </div>

              {/* Author and Read More */}
              <div className="mt-4 flex justify-between items-center border-t pt-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-bold">
                      {blog.author.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {blog.author}
                  </span>
                </div>
                <button className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                  Read More
                  <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Blogs Found */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No blogs found in this category.
        </div>
      )}
    </div>
  );
};

export default Blogs;
