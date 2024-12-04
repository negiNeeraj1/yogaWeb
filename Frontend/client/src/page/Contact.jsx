import React, { useState } from "react";

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
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Contact Information */}
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold  transform transition-all hover:scale-105p pb-7" style={{color:"#11827"}}>
                Contact Us
              </h1>
              <p className="text-lg text-gray-500">
                For any queries, Please reach out to us. Our Support team will get back to you within 24 hours.
              </p>
            </div>
            
            <div className="w-full h-64 overflow-hidden rounded-lg shadow-xl transform transition-all hover:scale-105">
              <img 
                src="https://imgs.search.brave.com/6cZilEbF20hGXbEfkwbLsMBap-_94wQDhr7GLpq6MeA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/b3Atdmlldy1jaGF0/LWJ1YmJsZXMtd2l0/aC10ZWxlcGhvbmUt/cmVjZWl2ZXItY29w/eS1zcGFjZV8yMy0y/MTQ4Nzk2MDc4Lmpw/Zz9zZW10PWFpc19o/eWJyaWQ"
                alt="Contact Us"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-4 animate-slideUp">
              <div className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 234 567 890</span>
              </div>
              
              <div className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@example.com</span>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 contact-right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-gray-700 font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-indigo-300 transform transition-all duration-300 hover:shadow-md"
                  placeholder="Your Full Name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-700 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-indigo-300 transform transition-all duration-300 hover:shadow-md"
                  placeholder="Your Email Address"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-gray-700 font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-indigo-300 transform transition-all duration-300 hover:shadow-md"
                  placeholder="Your Phone Number"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-gray-700 font-semibold">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-indigo-300 transform transition-all duration-300 hover:shadow-md resize-none"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-all text-white py-3 px-8 rounded-lg shadow-md font-medium focus:outline-none focus:ring-2 btn-hover focus:ring-offset-2 transform transition-all duration-300  hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;