import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./Components/Navbar";
import "./App.css";
import "./index.css";
import Home from "./page/Home";
import Teachers from "./page/Teacher";
import Pricing from "./page/Pricing";
import AuthPage from "./page/AuthPage";
import EventsPage from "./page/Event";
import ClassesPage from "./page/Dashboard/ClassPage";
import BlogPage from "./page/Blog";
import ContactUs from "./page/Contact";
import TestimonialPage from "./page/Testimonial";
import CoursePage from "./page/CoursePage";
import LoginPage from "./page/LoginPage";
import ProtectedRoute from "./routes/PrivateRoute";
import DashboardLayout from "./Components/dashboard/DashboardLayout";
import ProfilePage from "./page/Dashboard/ProfilePage";

import MainDashboard from "./page/Dashboard/MainDashboard"; 
import { ThemeProvider } from "./context/ThemeProvider";
import YogaClassPage from "./page/Dashboard/YogaClassPage";
import SupportPage from "./page/Dashboard/Support";
import SubscriptionPage from "./page/Dashboard/Subscription";
import OurCenter from "./page/Dashboard/OurCenter";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/loginPage" element={<LoginPage />} />

              <Route
                path="/yogadashboard/*"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                {/* Default dashboard route */}
                <Route index element={<MainDashboard />} />
                <Route path="classes" element={<ClassesPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="contact" element={<SupportPage />} />
                <Route path="subscription" element={<SubscriptionPage />} />
                <Route path="centers" element={<OurCenter />} />
                <Route path="yoga-class/:classId" element={<YogaClassPage />} />
              </Route>

              {/* Other Routes */}
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/authPage" element={<AuthPage />} />
              <Route path="/eventsPage" element={<EventsPage />} />
              <Route path="/classesPage" element={<ClassesPage />} />
              <Route path="/course/:id" element={<CoursePage />} />
              <Route path="/blogPage" element={<BlogPage />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/testimonialPage" element={<TestimonialPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
