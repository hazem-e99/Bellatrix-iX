import React from 'react';
import { PageProvider } from '../contexts/PageContext';
import PageManagement from '../components/PageManagement';

/**
 * Example: Complete Page Management Integration
 * 
 * This example shows how to integrate the page management system
 * into your existing admin dashboard or create a standalone page management interface.
 */

// Example 1: Standalone Page Management
export const StandalonePageManagement = () => {
  return (
    <PageProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <PageManagement />
        </main>
      </div>
    </PageProvider>
  );
};

// Example 2: Integration with existing admin layout
export const AdminLayoutWithPages = ({ children }) => {
  return (
    <PageProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-lg">
            <nav className="mt-5 px-2">
              <a href="/admin/dashboard" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                Dashboard
              </a>
              <a href="/admin/pages" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                Pages
              </a>
              <a href="/admin/users" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                Users
              </a>
            </nav>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </PageProvider>
  );
};

// Example 3: Custom page management with additional features
export const CustomPageManagement = () => {
  return (
    <PageProvider>
      <div className="space-y-6">
        {/* Custom header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Custom Page Management</h1>
              <p className="text-gray-600">Manage your website pages with advanced features</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Export Pages
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Import Pages
              </button>
            </div>
          </div>
        </div>
        
        {/* Page management component */}
        <PageManagement />
        
        {/* Custom footer */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center text-gray-600">
            <p>Page Management System v1.0 - Built with React & Tailwind CSS</p>
          </div>
        </div>
      </div>
    </PageProvider>
  );
};

// Example 4: Router integration
export const RouterExample = () => {
  return (
    <div>
      {/* This would typically be in your main App.jsx or router setup */}
      <div className="text-sm text-gray-500 mb-4">
        Router Integration Example:
      </div>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`// In your main App.jsx or router setup
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StandalonePageManagement } from './examples/PageManagementExample';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/pages" element={<StandalonePageManagement />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}`}
      </pre>
    </div>
  );
};

export default StandalonePageManagement;
