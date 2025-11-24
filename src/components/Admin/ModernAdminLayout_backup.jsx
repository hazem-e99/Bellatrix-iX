import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  DocumentTextIcon,
  ViewColumnsIcon,
  Cog6ToothIcon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  ViewColumnsIcon as ViewColumnsIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from "@heroicons/react/24/solid";
import Button from "../UI/Button";
import { Input } from "../UI/Input";
import { useTheme } from "../../contexts/ThemeContext";

const ModernAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      path: "/admin",
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
      description: "Overview & Analytics",
    },
    {
      id: "pages",
      name: "Pages",
      path: "/admin/pages",
      icon: DocumentTextIcon,
      iconSolid: DocumentTextIconSolid,
      description: "Content Management",
    },
    {
      id: "templates",
      name: "Templates",
      path: "/admin/templates",
      icon: ViewColumnsIcon,
      iconSolid: ViewColumnsIconSolid,
      description: "Design Templates",
    },
    {
      id: "settings",
      name: "Settings",
      path: "/admin/settings",
      icon: Cog6ToothIcon,
      iconSolid: Cog6ToothIconSolid,
      description: "System Configuration",
    },
  ];

  const getCurrentPageTitle = () => {
    const currentItem = menuItems.find(
      (item) =>
        item.path === location.pathname ||
        location.pathname.startsWith(item.path + "/")
    );
    return currentItem?.name || "Dashboard";
  };

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin" || location.pathname === "/admin/";
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const notifications = [
    {
      id: 1,
      title: "New page created",
      message: "Homepage has been updated",
      time: "5m ago",
      unread: true,
    },
    {
      id: 2,
      title: "Template uploaded",
      message: "New template available",
      time: "1h ago",
      unread: true,
    },
    {
      id: 3,
      title: "Settings updated",
      message: "System configuration changed",
      time: "2h ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 transition-colors duration-200">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 shadow-2xl transform transition-all duration-300 ease-out lg:relative lg:translate-x-0 lg:flex lg:flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        }}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-white/10">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl blur opacity-30 animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-wide">
                  Bellatrix
                </span>
                <div className="text-xs text-blue-300 font-medium">Admin Panel</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10 transition-colors duration-200"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-8 space-y-3 overflow-y-auto">
            {menuItems.map((item) => {
              const IconComponent = isActive(item.path)
                ? item.iconSolid
                : item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-4 py-4 text-sm font-medium rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-indigo-500/20 text-white border border-blue-400/30 shadow-xl backdrop-blur-sm"
                      : "text-slate-300 hover:bg-white/10 hover:text-white hover:translate-x-1"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive(item.path) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl"></div>
                  )}
                  <IconComponent
                    className={`mr-4 h-6 w-6 transition-colors duration-300 ${
                      isActive(item.path)
                        ? "text-blue-300"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  <div className="flex-1 text-left relative z-10">
                    <div className="font-semibold">{item.name}</div>
                    <div
                      className={`text-xs mt-1 ${
                        isActive(item.path)
                          ? "text-blue-200"
                          : "text-slate-500 group-hover:text-slate-300"
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                  {isActive(item.path) && (
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg animate-pulse"></div>
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-white/10 p-6">
            <div className="flex items-center space-x-3 text-sm text-slate-300 bg-green-500/10 rounded-xl p-3 border border-green-500/20">
              <div className="relative">
                <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 h-3 w-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="font-medium">All systems operational</span>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-slate-400">Active Users</div>
                <div className="text-white font-bold text-lg">24</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-slate-400">Response Time</div>
                <div className="text-white font-bold text-lg">98ms</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-30 shadow-sm">
          <div className="flex h-20 items-center justify-between px-6 lg:px-8">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-slate-600 hover:bg-slate-100 rounded-xl"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </Button>

              {/* Page title with breadcrumb */}
              <div>
                <div className="flex items-center space-x-2 text-sm text-slate-500 mb-1">
                  <span>Admin</span>
                  <span>/</span>
                  <span className="text-blue-600 font-medium">{getCurrentPageTitle()}</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {getCurrentPageTitle()}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <Input
                    placeholder="Search... (⌘K)"
                    icon={<MagnifyingGlassIcon className="h-4 w-4" />}
                    className="w-80 bg-slate-50/80 border-slate-200 focus:bg-white focus:border-blue-300 transition-all duration-200"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <kbd className="inline-flex items-center rounded border border-slate-200 px-1 font-mono text-xs text-slate-500">⌘K</kbd>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                {/* Theme toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                >
                  {isDark ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </Button>

                {/* Notifications */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 relative"
                  >
                    <BellIcon className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs items-center justify-center font-bold shadow-lg animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </Button>

                  {/* Notifications dropdown */}
                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div
                        className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 border border-gray-200"
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      >
                      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
                        <h3 className="text-lg font-medium text-gray-800">
                          Notifications
                        </h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-blue-50"
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`h-2 w-2 rounded-full mt-2 ${
                                  notification.unread
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                                }`}
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  <UserCircleIcon className="h-6 w-6" />
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>

                {/* User dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 border border-gray-200"
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    >
                      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
                        <p className="text-sm font-medium text-gray-800">
                          Admin User
                        </p>
                        <p className="text-sm text-gray-600">
                          admin@bellatrix.com
                        </p>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => navigate("/")}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <PowerIcon className="mr-3 h-4 w-4" />
                          Exit Admin
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Click outside to close dropdowns */}
      {(userMenuOpen || notificationsOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setUserMenuOpen(false);
            setNotificationsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ModernAdminLayout;
