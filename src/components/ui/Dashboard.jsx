import React from 'react';
import { Button, Card } from './components';

export const Sidebar = ({ isOpen, onClose, children }) => (
  <>
    {isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
    )}
    <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 bg-white border-r border-gray-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
        <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  </>
);

export const NavItem = ({ icon: Icon, label, isActive = false, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors duration-200 ${
      isActive ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    {Icon && <Icon className="w-5 h-5 mr-3" />}
    <span className="flex-1">{label}</span>
    {badge && (
      <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

export const StatsCard = ({ title, value, change, changeType = 'positive', icon: Icon }) => {
  const changeStyles = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600',
  };

  return (
    <Card className="p-6">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change && <p className={`text-sm ${changeStyles[changeType]}`}>{change}</p>}
        </div>
        {Icon && (
          <div className="ml-4">
            <Icon className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
    </Card>
  );
};

export const QuickActionButton = ({ icon: Icon, label, onClick, variant = 'primary' }) => (
  <Button onClick={onClick} variant={variant} className="flex flex-col items-center p-4 h-20">
    {Icon && <Icon className="w-6 h-6 mb-2" />}
    <span className="text-sm">{label}</span>
  </Button>
);

export const ActivityFeed = ({ activities = [] }) => (
  <Card className="p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">{activity.message}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

export const ChartContainer = ({ title, children }) => (
  <Card className="p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
      {children || <p className="text-gray-500">Chart placeholder</p>}
    </div>
  </Card>
);

export const NotificationBadge = ({ count = 0 }) => {
  if (count === 0) return null;
  return (
    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
      {count > 99 ? '99+' : count}
    </span>
  );
};

export const ThemeToggle = ({ isDark, onToggle }) => (
  <button onClick={onToggle} className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
    {isDark ? (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ) : (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )}
  </button>
);

export const ProgressRing = ({ percentage = 0, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" className="text-gray-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} className="text-blue-600 transition-all duration-500 ease-out" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-semibold text-gray-900">{percentage}%</span>
      </div>
    </div>
  );
};

export const Breadcrumb = ({ items = [] }) => (
  <nav className="flex">
    <ol className="inline-flex items-center space-x-1 md:space-x-3">
      {items.map((item, index) => (
        <li key={index} className="inline-flex items-center">
          {index > 0 && (
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          )}
          {item.href ? (
            <a href={item.href} className={`inline-flex items-center text-sm font-medium ${index === items.length - 1 ? 'text-gray-500 cursor-default' : 'text-gray-700 hover:text-blue-600'}`}>
              {item.label}
            </a>
          ) : (
            <span className="inline-flex items-center text-sm font-medium text-gray-500">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);