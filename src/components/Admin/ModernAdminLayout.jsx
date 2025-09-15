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
import Button from "../ui/Button";
import { Input } from "../ui/Input";
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
    <div className="flex min-h-screen bg-gray-50 transition-colors duration-200" style={{backgroundColor: '#f7fafc'}}>
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
            <div className="absolute inset-0 bg-gray-600 opacity-75" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 shadow-xl transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 lg:flex lg:flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: 'linear-gradient(135deg, #001038 0%, #001248 50%, #001458 100%)',
        }}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-white">
                Bellatrix
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const IconComponent = isActive(item.path)
                ? item.iconSolid
                : item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white border border-blue-400/30 shadow-lg backdrop-blur-sm"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.path)
                        ? "text-blue-300"
                        : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.name}</div>
                    <div
                      className={`text-xs ${
                        isActive(item.path)
                          ? "text-blue-200"
                          : "text-gray-500"
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navbar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-5 w-5" />
              </Button>

              {/* Page title */}
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {getCurrentPageTitle()}
                </h1>
                <p className="text-sm text-gray-600">
                  {menuItems.find((item) => isActive(item.path))?.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block">
                <Input
                  placeholder="Search..."
                  icon={<MagnifyingGlassIcon className="h-4 w-4" />}
                  className="w-64"
                />
              </div>

              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50"
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
                  className="text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                >
                  <BellIcon className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
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
                        <h3 className="text-lg font-semibold text-black">
                          Notifications
                        </h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-blue-50 transition-colors duration-150"
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`h-2 w-2 rounded-full mt-2 ${
                                  notification.unread
                                    ? "bg-blue-600"
                                    : "bg-gray-400"
                                }`}
                              />
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-black">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-800 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-600 mt-2">
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
                        <p className="text-sm font-semibold text-black">
                          Admin User
                        </p>
                        <p className="text-sm text-gray-800">
                          admin@bellatrix.com
                        </p>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => navigate("/")}
                          className="flex w-full items-center px-4 py-3 text-sm font-medium text-black hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
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
