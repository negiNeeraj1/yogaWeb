import React, { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import DarkModeClasses from "../Components/DarkMode";
import Footer from "../Components/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-50 dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#0F172A] transition-colors duration-300">
     
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 transform transition-all hover:scale-105 pb-7">
                Contact Us
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
                For any queries, please reach out to us. Our support team will
                get back to you within 24 hours.
              </p>
            </div>

            <div className="w-full h-64 overflow-hidden rounded-lg shadow-xl transform transition-all hover:scale-105 dark:shadow-[#0F172A]/20">
              <img
                src="https://t3.ftcdn.net/jpg/08/20/04/54/360_F_820045411_YyduRYaPMpUGRByvhzjWl3cMyVzyS00E.jpg"
                alt="Contact Us"
                className={`w-full h-full object-cover image-hover ${DarkModeClasses.hover.card} transition-colors duration-300`}
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">
                <Phone className="w-6 h-6" />
                <span className="text-lg">+1 234 567 890</span>
              </div>

              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">
                <Mail className="w-6 h-6" />
                <span className="text-lg">cat@example.com</span>
              </div>
            </div>
          </div>

          
          <div className="bg-white dark:bg-[#1E293B] p-8 rounded-lg shadow-2xl dark:shadow-[#0F172A]/20 transform hover:scale-[1.02] transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 dark:text-gray-200 font-semibold"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 dark:bg-[#2D3D53] border border-gray-300 dark:border-[#4B5563] rounded-lg p-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transform transition-all duration-300 hover:shadow-md dark:hover:shadow-[#0F172A]/20"
                  placeholder="Your Full Name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-gray-700 dark:text-gray-200 font-semibold"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 dark:bg-[#2D3D53] border border-gray-300 dark:border-[#4B5563] rounded-lg p-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transform transition-all duration-300 hover:shadow-md dark:hover:shadow-[#0F172A]/20"
                  placeholder="Your Email Address"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 dark:text-gray-200 font-semibold"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 dark:bg-[#2D3D53] border border-gray-300 dark:border-[#4B5563] rounded-lg p-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transform transition-all duration-300 hover:shadow-md dark:hover:shadow-[#0F172A]/20"
                  placeholder="Your Phone Number"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-gray-700 dark:text-gray-200 font-semibold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-gray-50 dark:bg-[#2D3D53] border border-gray-300 dark:border-[#4B5563] rounded-lg p-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transform transition-all duration-300 hover:shadow-md dark:hover:shadow-[#0F172A]/20 resize-none"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-3 px-8 rounded-lg shadow-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer/>
    </section>
  );
};

export default ContactUs;
