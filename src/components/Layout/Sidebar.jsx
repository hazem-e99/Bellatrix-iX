import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import {
  HomeIcon,
  DocumentIcon,
  DocumentDuplicateIcon,
  CogIcon,
  ChartBarIcon,
  UserGroupIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  DocumentIcon as DocumentIconSolid,
  DocumentDuplicateIcon as DocumentDuplicateIconSolid,
  CogIcon as CogIconSolid,
} from '@heroicons/react/24/solid';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { colors, isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
      description: 'Overview & Analytics',
    },
    {
      name: 'Pages',
      href: '/admin/pages',
      icon: DocumentIcon,
      iconSolid: DocumentIconSolid,
      description: 'Manage Content Pages',
    },
    {
      name: 'Templates',
      href: '/admin/templates',
      icon: DocumentDuplicateIcon,
      iconSolid: DocumentDuplicateIconSolid,
      description: 'Design Templates',
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: CogIcon,
      iconSolid: CogIconSolid,
      description: 'System Configuration',
    },
  ];

  const secondaryNavigation = [
    { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
    { name: 'Users', href: '/admin/users', icon: UserGroupIcon },
    { name: 'Notifications', href: '/admin/notifications', icon: BellIcon },
  ];

  const isCurrentPath = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
        ${colors.surface} ${colors.border} border-r
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${colors.accent} rounded-xl flex items-center justify-center`}>
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div>
              <h1 className={`${colors.text} font-bold text-xl`}>Bellatrix</h1>
              <p className={`${colors.textSecondary} text-sm`}>Admin Panel</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className={`lg:hidden p-2 rounded-lg ${colors.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-800`}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = isCurrentPath(item.href);
              const Icon = isActive ? item.iconSolid : item.icon;
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-3 text-sm font-medium rounded-xl
                    transition-all duration-200 relative overflow-hidden
                    ${isActive 
                      ? `${colors.primary} text-white shadow-lg` 
                      : `${colors.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100`
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
                  )}
                  <Icon className="flex-shrink-0 w-6 h-6 mr-4 relative z-10" />
                  <div className="relative z-10">
                    <div className="font-medium">{item.name}</div>
                    <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      {item.description}
                    </div>
                  </div>
                  
                  {isActive && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white rounded-l-full opacity-90" />
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Secondary Navigation */}
          <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <p className={`px-3 text-xs font-semibold ${colors.textSecondary} uppercase tracking-wider mb-3`}>
              Quick Access
            </p>
            <div className="space-y-1">
              {secondaryNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-lg
                    ${colors.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-800 
                    hover:text-gray-900 dark:hover:text-gray-100
                    transition-colors duration-200
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="flex-shrink-0 w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleTheme}
            className={`
              w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg
              ${colors.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-800
              transition-colors duration-200
            `}
          >
            <span className="flex items-center">
              {isDark ? (
                <SunIcon className="w-5 h-5 mr-3" />
              ) : (
                <MoonIcon className="w-5 h-5 mr-3" />
              )}
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </span>
            <div className={`
              w-10 h-6 rounded-full transition-colors duration-200
              ${isDark ? 'bg-blue-600' : 'bg-gray-300'}
              relative
            `}>
              <div className={`
                w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200
                ${isDark ? 'translate-x-5' : 'translate-x-1'}
              `} />
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;