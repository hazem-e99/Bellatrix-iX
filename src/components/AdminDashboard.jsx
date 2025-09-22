import React from 'react';
import { PageProvider } from '../contexts/PageContext';
import PageManagement from './PageManagement';

/**
 * Admin Dashboard Component
 * 
 * This is the main admin dashboard that wraps the PageManagement component
 * with the PageProvider context. Use this component in your admin routes.
 * 
 * Example usage in your App.jsx or router:
 * 
 * import AdminDashboard from './components/AdminDashboard';
 * 
 * <Route path="/admin/pages" element={<AdminDashboard />} />
 */
const AdminDashboard = () => {
  return (
    <PageProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <PageManagement />
        </div>
      </div>
    </PageProvider>
  );
};

export default AdminDashboard;
