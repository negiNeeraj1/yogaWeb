import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Overview from "./pages/Overview";
import Bookings from "./pages/Bookings";
import Clients from "./pages/Clients";
import Blogs from "./pages/Blogs";
import Analytics from "./pages/Analytics";
import ManageCoursesPage from "./pages/ManageCoursesPage";

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <div
          className={`
            flex-1 
            transition-all 
            duration-300 
            ease-in-out
            ${isSidebarCollapsed ? "ml-20" : "ml-64"}
          `}
        >
          <Header />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/manage-courses" element={<ManageCoursesPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
