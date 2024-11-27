import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Heart 
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Teachers', href: '/teachers' },
    { name: 'Class Schedule', href: '/schedule' },
    { name: 'Pricing Plans', href: '/pricing' },
    { name: 'Blog & Articles', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const yogaClasses = [
    { name: 'Hatha Yoga', href: '/classes/hatha' },
    { name: 'Vinyasa Flow', href: '/classes/vinyasa' },
    { name: 'Meditation', href: '/classes/meditation' },
    { name: 'Kundalini', href: '/classes/kundalini' },
    { name: 'Yin Yoga', href: '/classes/yin' },
    { name: 'Prenatal Yoga', href: '/classes/prenatal' },
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '6:00 AM - 9:00 PM' },
    { day: 'Saturday', hours: '7:00 AM - 8:00 PM' },
    { day: 'Sunday', hours: '8:00 AM - 6:00 PM' },
  ];

  return (
    <footer className="bg-gray-50">
      {/* Newsletter Section */}
      <div className="bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h3 className="text-2xl font-bold">Join Our Newsletter</h3>
              <p className="mt-2 text-purple-100">Get updates on classes, events, and wellness tips</p>
            </div>
            <div className="w-full md:w-96">
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <button type='button' className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Yoga Life</h3>
            <p className="text-gray-600 mb-6">
              Transform your mind, body, and soul with our expert-led yoga classes. 
              Join our community and begin your journey to wellness today.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Classes</h3>
            <ul className="space-y-3">
              {yogaClasses.map((yogaClass) => (
                <li key={yogaClass.name}>
                  <a 
                    href={yogaClass.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    {yogaClass.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-purple-600 flex-shrink-0" />
                <p className="text-gray-600">123 Serenity Lane, Mindful City, MC 12345</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-purple-600 flex-shrink-0" />
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-purple-600 flex-shrink-0" />
                <p className="text-gray-600">info@yogalife.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  Business Hours
                </h4>
                <ul className="space-y-2">
                  {businessHours.map((schedule) => (
                    <li key={schedule.day} className="text-gray-600 text-sm">
                      <span className="font-medium">{schedule.day}:</span>
                      <br />
                      {schedule.hours}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Yoga Life. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                Terms of Service
              </a>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                Made with <Heart className="h-4 w-4 text-red-500" /> by Yoga Life
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;