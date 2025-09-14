import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/Layout/AdminLayout';
import ModernDashboard from '../components/Dashboard/ModernDashboard';
import PagesManagement from '../components/Pages/PagesManagement';
import TemplatesManagement from '../components/Templates/TemplatesManagement';
import SettingsManagement from '../components/Settings/SettingsManagement';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<ModernDashboard />} />
        <Route path="pages" element={<PagesManagement />} />
        <Route path="pages/:pageId" element={<PagesManagement />} />
        <Route path="templates" element={<TemplatesManagement />} />
        <Route path="templates/:templateId" element={<TemplatesManagement />} />
        <Route path="settings" element={<SettingsManagement />} />
        <Route path="analytics" element={<div>Analytics Coming Soon</div>} />
        <Route path="users" element={<div>User Management Coming Soon</div>} />
        <Route path="notifications" element={<div>Notifications Coming Soon</div>} />
      </Route>
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRoutes;