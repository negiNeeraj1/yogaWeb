import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import StatsCard from './components/StatsCard';

// Pages importing:
import Overview from './pages/Overview';
import Bookings from './pages/Bookings';
import Clients from './pages/Clients';
import Blogs from './pages/Blogs';
import Analytics from './pages/Analytics';
import ManageCoursesPage from "./pages/ManageCoursesPage";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-4">
            <Routes>
              <Route path="/overview" element={<Overview />} />
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
