import React from "react";
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
  Heart,
} from "lucide-react";
import DarkModeClasses from "./DarkMode";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Teachers", href: "/teachers" },
    { name: "Class Schedule", href: "/schedule" },
    { name: "Pricing Plans", href: "/pricing" },
    { name: "Blog & Articles", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  const yogaClasses = [
    { name: "Hatha Yoga", href: "/classes/hatha" },
    { name: "Vinyasa Flow", href: "/classes/vinyasa" },
    { name: "Meditation", href: "/classes/meditation" },
    { name: "Kundalini", href: "/classes/kundalini" },
    { name: "Yin Yoga", href: "/classes/yin" },
    { name: "Prenatal Yoga", href: "/classes/prenatal" },
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "6:00 AM - 9:00 PM" },
    { day: "Saturday", hours: "7:00 AM - 8:00 PM" },
    { day: "Sunday", hours: "8:00 AM - 6:00 PM" },
  ];

  return (
    <footer className={`${DarkModeClasses.background.primary}`}>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${DarkModeClasses.divider}`}
        >
          <div>
            <h3
              className={`text-xl font-bold mb-4 ${DarkModeClasses.text.primary}`}
            >
              Yoga Life
            </h3>
            <p className={`mb-6 ${DarkModeClasses.text.secondary}`}>
              Transform your mind, body, and soul with our expert-led yoga
              classes. Join our community and begin your journey to wellness
              today.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className={`${DarkModeClasses.text.muted} hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300`}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3
              className={`text-xl font-bold mb-4 ${DarkModeClasses.text.primary}`}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`${DarkModeClasses.text.secondary} hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group`}
                  >
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className={`text-xl font-bold mb-4 ${DarkModeClasses.text.primary}`}
            >
              Our Classes
            </h3>
            <ul className="space-y-3">
              {yogaClasses.map((yogaClass) => (
                <li key={yogaClass.name}>
                  <a
                    href={yogaClass.href}
                    className={`${DarkModeClasses.text.secondary} hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group`}
                  >
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    {yogaClass.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className={`text-xl font-bold mb-4 ${DarkModeClasses.text.primary}`}
            >
              Contact Us
            </h3>
            <div className="space-y-4">
              {[
                {
                  Icon: MapPin,
                  text: "123 Serenity Lane, Mindful City, MC 12345",
                },
                { Icon: Phone, text: "+1 (555) 123-4567" },
                { Icon: Mail, text: "info@yogalife.com" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <item.Icon className="h-6 w-6 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                  <p className={DarkModeClasses.text.secondary}>{item.text}</p>
                </div>
              ))}

              <div>
                <h4
                  className={`font-semibold mb-2 flex items-center gap-2 ${DarkModeClasses.text.primary}`}
                >
                  <Clock className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                  Business Hours
                </h4>
                <ul className="space-y-2">
                  {businessHours.map((schedule) => (
                    <li
                      key={schedule.day}
                      className={`${DarkModeClasses.text.secondary} text-sm`}
                    >
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

        <div className={`mt-12 pt-8 border-t ${DarkModeClasses.divider}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${DarkModeClasses.text.secondary}`}>
              © {new Date().getFullYear()} Yoga Life. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="/privacy"
                className={`text-sm ${DarkModeClasses.text.secondary} hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300`}
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className={`text-sm ${DarkModeClasses.text.secondary} hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300`}
              >
                Terms of Service
              </a>
              <p
                className={`text-sm ${DarkModeClasses.text.secondary} flex items-center gap-1`}
              >
                Made with <Heart className="h-4 w-4 text-red-500" /> by Yoga
                Life
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
