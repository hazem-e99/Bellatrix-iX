import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { NotificationContainer } from './NotificationToast';
import { usePageData } from '../hooks/useJsonServerData.jsx';

const Layout = () => {
  const [navbarData, setNavbarData] = useState({
    services: [],
    industries: [],
    solutions: []
  });

  // Fetch navbar data from JSON Server
  const { data: homeData, error } = usePageData('home');

  // Update navbar data when homeData changes
  useEffect(() => {
    if (homeData) {
      setNavbarData({
        services: homeData.services?.services || [],
        industries: homeData.industries?.industries || [],
        solutions: homeData.solutions?.solutions || []
      });
    } else if (error) {
      // Fallback data if fetch fails
      setNavbarData({
        services: [
          { title: "Strategic Consultation", link: "#" },
          { title: "Implementation", link: "/Implementation" },
          { title: "Training", link: "/Training" },
          { title: "Tailored Customization", link: "#" },
          { title: "Seamless Integration", link: "#" }
        ],
        industries: [],
        solutions: []
      });
    }
  }, [homeData, error]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <Navbar 
        services={navbarData.services}
        industries={navbarData.industries}
        solutions={navbarData.solutions}
      />
      
      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Fixed Footer */}
      <Footer />
      
      {/* Notification System */}
      <NotificationContainer />
    </div>
  );
};

export default Layout;
