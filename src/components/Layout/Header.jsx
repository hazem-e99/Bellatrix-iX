import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../UI';

const Header = ({ sidebarOpen, setSidebarOpen, title = 'Dashboard' }) => {
  const { colors } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New page created', time: '2 minutes ago', unread: true },
    { id: 2, title: 'Template updated', time: '1 hour ago', unread: true },
    { id: 3, title: 'User settings changed', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className={`${colors.surface} ${colors.border} border-b sticky top-0 z-30`}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`lg:hidden p-2 rounded-lg ${colors.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          
          <div>
            <h1 className={`${colors.text} text-2xl font-bold`}>{title}</h1>
            <p className={`${colors.textSecondary} text-sm`}>
              Welcome back! Here's what's happening today.
            </p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <div className={`
              absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
              transition-colors duration-200
              ${searchFocused ? 'text-blue-500' : colors.textSecondary}
            `}>
              <MagnifyingGlassIcon className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search pages, templates, or settings..."
              className={`
                block w-full pl-10 pr-3 py-2.5 rounded-xl border
                ${colors.surface} ${colors.border} ${colors.text}
                placeholder-gray-500 dark:placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200
                ${searchFocused ? 'shadow-lg transform scale-105' : 'shadow-sm'}
              `}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Search */}
          <button className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
            <MagnifyingGlassIcon className="w-6 h-6" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`
                relative p-2 rounded-lg transition-colors
                ${colors.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-800
              `}
            >
              <BellIcon className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className={`
                absolute right-0 mt-2 w-80 ${colors.surface} rounded-xl shadow-2xl 
                ${colors.border} border z-50 transform transition-all duration-200
                animate-in slide-in-from-top-2
              `}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className={`${colors.text} font-semibold`}>Notifications</h3>
                  <p className={`${colors.textSecondary} text-sm`}>{unreadCount} unread notifications</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`
                        p-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0
                        hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer
                        ${notification.unread ? 'bg-blue-50 dark:bg-blue-950/20' : ''}
                      `}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className={`${colors.text} text-sm font-medium`}>
                            {notification.title}
                          </p>
                          <p className={`${colors.textSecondary} text-xs mt-1`}>
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="ghost" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className={`
                flex items-center space-x-3 p-2 rounded-lg transition-colors
                ${colors.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-800
              `}
            >
              <UserCircleIcon className="w-8 h-8" />
              <div className="hidden sm:block text-left">
                <p className={`${colors.text} text-sm font-medium`}>Admin User</p>
                <p className={`${colors.textSecondary} text-xs`}>admin@bellatrix.com</p>
              </div>
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {/* Profile Dropdown */}
            {profileMenuOpen && (
              <div className={`
                absolute right-0 mt-2 w-56 ${colors.surface} rounded-xl shadow-2xl 
                ${colors.border} border z-50 transform transition-all duration-200
                animate-in slide-in-from-top-2
              `}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <p className={`${colors.text} font-medium`}>Admin User</p>
                  <p className={`${colors.textSecondary} text-sm`}>admin@bellatrix.com</p>
                </div>
                <div className="py-2">
                  <a href="#" className={`block px-4 py-2 text-sm ${colors.text} hover:bg-gray-100 dark:hover:bg-gray-800`}>
                    Profile Settings
                  </a>
                  <a href="#" className={`block px-4 py-2 text-sm ${colors.text} hover:bg-gray-100 dark:hover:bg-gray-800`}>
                    Account Preferences
                  </a>
                  <a href="#" className={`block px-4 py-2 text-sm ${colors.text} hover:bg-gray-100 dark:hover:bg-gray-800`}>
                    Help & Support
                  </a>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 py-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(profileMenuOpen || notificationsOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setProfileMenuOpen(false);
            setNotificationsOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;