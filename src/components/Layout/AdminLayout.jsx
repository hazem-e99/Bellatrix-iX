import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { useTheme } from '../../hooks/useTheme';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/') return 'Dashboard';
    if (path.includes('/pages')) return 'Pages Management';
    if (path.includes('/templates')) return 'Templates';
    if (path.includes('/settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <ThemeProvider>
      <AdminLayoutContent 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        pageTitle={getPageTitle()}
      />
    </ThemeProvider>
  );
};

const AdminLayoutContent = ({ sidebarOpen, setSidebarOpen, pageTitle }) => {
  const { colors } = useTheme();

  return (
    <div className={`min-h-screen ${colors.background} transition-colors duration-300`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            title={pageTitle}
          />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6 max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;