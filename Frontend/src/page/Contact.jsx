import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
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
      address: "",
      city: "",
      state: "",
      zip: "",
      message: "",
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-lg text-gray-600 mt-4">
            We'd love to hear from you! Please fill out the form below with your
            details.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-medium mb-2"
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
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
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
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter your email address"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
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
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter your address"
            />
          </div>

          {/* City, State, ZIP */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-gray-700 font-medium mb-2"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                placeholder="City"
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-gray-700 font-medium mb-2"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                placeholder="State"
              />
            </div>
            <div>
              <label
                htmlFor="zip"
                className="block text-gray-700 font-medium mb-2"
              >
                ZIP Code
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                placeholder="ZIP"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Write your message here"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-medium shadow hover:bg-indigo-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
