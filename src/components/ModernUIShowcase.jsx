import React, { useState, useEffect } from 'react';
import ModernDashboard from './ModernDashboard';
import PagesManagement from './Admin/PagesManagement';
import TemplatesManagement from './TemplatesManagement';
import SettingsManagement from './SettingsManagement';
import { ToastContainer } from './ui/Interactive';
import { useTheme, useToast, useKeyboard } from '../hooks/useCommon';

const ModernUIShowcase = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { addToast } = useToast();

  // Navigation items
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
      component: ModernDashboard,
      description: 'Analytics and overview'
    },
    {
      id: 'pages',
      label: 'Pages',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      component: PagesManagement,
      description: 'Content management'
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      component: TemplatesManagement,
      description: 'Design templates'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      component: SettingsManagement,
      description: 'System configuration'
    }
  ];

  // Keyboard navigation
  useKeyboard({
    'Escape': () => setSidebarOpen(false),
    'Meta+k': (e) => {
      e.preventDefault();
      addToast('Search shortcut activated', 'info');
    },
    'Meta+1': (e) => {
      e.preventDefault();
      setActiveSection('dashboard');
    },
    'Meta+2': (e) => {
      e.preventDefault();
      setActiveSection('pages');
    },
    'Meta+3': (e) => {
      e.preventDefault();
      setActiveSection('templates');
    },
    'Meta+4': (e) => {
      e.preventDefault();
      setActiveSection('settings');
    }
  });

  // Demo notification on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      addToast('Welcome to the Modern UI/UX Showcase! 🎉', 'success');
    }, 1000);
    return () => clearTimeout(timer);
  }, [addToast]);

  // Get current component
  const getCurrentComponent = () => {
    const currentItem = navigationItems.find(item => item.id === activeSection);
    if (currentItem) {
      const Component = currentItem.component;
      return <Component />;
    }
    return null;
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <ToastContainer />
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200 dark:border-gray-700`}>
        
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Bellatrix</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                activeSection === item.id
                  ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              <span className="mr-3 flex-shrink-0">{item.icon}</span>
              <div className="flex-1 text-left">
                <div>{item.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
              </div>
            </button>
          ))}
        </nav>

        {/* Theme Toggle & Info */}
        <div className="absolute bottom-4 left-4 right-4 space-y-3">
          {/* Keyboard Shortcuts */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Keyboard Shortcuts</h4>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <div>⌘ + 1-4: Switch sections</div>
              <div>⌘ + K: Search</div>
              <div>Esc: Close sidebar</div>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-300">Dark Mode</span>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isDark ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Breadcrumb */}
              <div className="flex-1 min-w-0">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2">
                    <li>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        UI/UX Showcase
                      </span>
                    </li>
                    <li>
                      <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </li>
                    <li>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {navigationItems.find(item => item.id === activeSection)?.label}
                      </span>
                    </li>
                  </ol>
                </nav>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                {/* Demo Badge */}
                <div className="hidden sm:block">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Live Demo
                  </div>
                </div>

                {/* GitHub Link */}
                <button
                  onClick={() => addToast('GitHub repository link copied!', 'success')}
                  className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  title="View on GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Help */}
                <button
                  onClick={() => addToast('Help documentation opened', 'info')}
                  className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  title="Help"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {getCurrentComponent()}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Modern UI/UX Showcase built with React, TailwindCSS, and modern design principles
              </div>
              <div className="mt-2 sm:mt-0 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>© 2024 Bellatrix iX</span>
                <span>•</span>
                <button
                  onClick={() => addToast('Documentation opened', 'info')}
                  className="hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Documentation
                </button>
                <span>•</span>
                <button
                  onClick={() => addToast('Support contacted', 'info')}
                  className="hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Support
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ModernUIShowcase;