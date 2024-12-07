import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Bookings from "./pages/Bookings";
import Clients from "./pages/Clients";
import Blogs from "./pages/Blogs";
import Analytics from "./pages/Analytics";
import ManageCoursesPage from "./pages/ManageCoursesPage";
import Setting from "./pages/Setting";

import { useAuth } from "./components/AuthContext";
import AdminLoginPage from "./pages/login";
import AdminSignupPage from "./pages/Signup";
import YogaDashboard from "./pages/Overview";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="flex min-h-screen">
        {isAuthenticated && (
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        )}
        <div
          className={`
            flex-1 
            transition-all 
            duration-300 
            ease-in-out
            ${isAuthenticated && !isSidebarCollapsed ? "ml-64" : "ml-0"}
          `}
        >
          {isAuthenticated && <Header />}
          <main className="p-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<AdminLoginPage />} />
              <Route path="/signup" element={<AdminSignupPage />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <YogaDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <PrivateRoute>
                    <Bookings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/clients"
                element={
                  <PrivateRoute>
                    <Clients />
                  </PrivateRoute>
                }
              />
              <Route
                path="/blogs"
                element={
                  <PrivateRoute>
                    <Blogs />
                  </PrivateRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <PrivateRoute>
                    <Analytics />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-courses"
                element={
                  <PrivateRoute>
                    <ManageCoursesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/setting"
                element={
                  <PrivateRoute>
                    <Setting />
                  </PrivateRoute>
                }
              />

              {/* Redirect to login if no route matches */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
          {isAuthenticated && <Footer />}
        </div>
      </div>
    </Router>
  );
};

export default App;
