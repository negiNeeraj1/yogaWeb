import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              YogaLife
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/classesPage" className="text-gray-600 hover:text-indigo-600">
              Classes
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-indigo-600">
              Blog
            </Link>
            <Link
              to="/teachers"
              className="text-gray-600 hover:text-indigo-600"
            >
              Teachers
            </Link>
            <Link to="/ContactUs" className="text-gray-600 hover:text-indigo-600">
              Contact Us
            </Link>
            <Link
              to="/TestimonialPage"
              className="text-gray-600 hover:text-indigo-600"
            >
              Testimonials
            </Link>
            <Link
              to="/pricing"
              className="text-gray-600 hover:text-indigo-600"
            >
              Pro Plan
            </Link>
            <Link
              to="/try-free"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Try for free
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/classes"
                className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
              >
                Classes
              </Link>
              <Link
                to="/blog"
                className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
              >
                Blog
              </Link>
              <Link
                to="/teachers"
                className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
              >
                Teachers
              </Link>
              <Link
                to="/ContactUs"
                className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
              >
                Contact Us
              </Link>
              <Link
                to="/TestimonialPage"
                className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
              >
                Testimonials
              </Link>
              <Link
                to="/try-free"
                className="block px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Try for free
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar