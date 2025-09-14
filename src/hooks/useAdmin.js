import { useContext } from 'react';
import AdminContext from '../contexts/AdminContext';

// Hook to use the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};