import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { clearAuthData } from "../../utils/tokenManager";
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
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  ViewColumnsIcon as ViewColumnsIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
} from "@heroicons/react/24/solid";
import Button from "../UI/Button";
import { Input } from "../UI/Input";
import { useTheme } from "../../context/ThemeContext";
import { useMessageNotifications } from "../../hooks/useMessageNotifications";
import MessageNotification from "./MessageNotification";

const ModernAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, theme, toggleTheme, toggleColorTheme } = useTheme();
  const isEnhancedCreate = location.pathname.startsWith(
    "/admin/pages/enhanced-create"
  );
  const {
    notifications: messageNotifications,
    unreadCount,
    removeNotification,
    markAsRead,
  } = useMessageNotifications();
  const [notificationsViewed, setNotificationsViewed] = useState(false);

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
      id: "categories",
      name: "Categories",
      path: "/admin/categories",
      icon: ViewColumnsIcon,
      iconSolid: ViewColumnsIconSolid,
      description: "Manage Categories",
    },
    {
      id: "messages",
      name: "Messages",
      path: "/admin/messages",
      icon: ChatBubbleLeftRightIcon,
      iconSolid: ChatBubbleLeftRightIconSolid,
      description: "Contact Messages",
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

  // Legacy notifications for the dropdown (can be removed if not needed)
  const legacyNotifications = [
    {
      id: 1,
      title: "New page created",
      message: "Homepage has been updated",
      time: "5m ago",
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

  const legacyUnreadCount = legacyNotifications.filter((n) => n.unread).length;

  return (
    <div
      className="admin-layout flex min-h-screen"
      data-dashboard="true"
      style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
    >
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
            <div className="absolute inset-0 bg-[var(--color-text-secondary)] opacity-75" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 shadow-xl transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 lg:flex lg:flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "var(--color-brand-variant)" }}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-[var(--color-white-10)]">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center shadow">
                <span className="text-[var(--color-text-inverse)] font-bold text-sm">
                  B
                </span>
              </div>
              <span className="text-xl font-bold text-[var(--color-text-inverse)]">
                Bellatrix
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-[var(--color-text-inverse)] hover:bg-[var(--color-white-10)]"
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
                      ? "bg-[var(--color-primary)]/30 text-[var(--color-text-inverse)] border border-[var(--color-primary)]/30 shadow"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-white-10)] hover:text-[var(--color-text-inverse)]"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.path)
                        ? "text-[var(--color-primary-light)]"
                        : "text-[var(--color-text-light)]"
                    }`}
                  />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.name}</div>
                    <div
                      className={`text-xs ${
                        isActive(item.path)
                          ? "text-[var(--color-primary-light)]"
                          : "text-[var(--color-text-light)]"
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
          <div className="border-t border-[var(--color-white-10)] p-4">
            <div className="flex items-center space-x-3 text-sm text-[var(--color-text-secondary)]">
              <div className="h-2 w-2 bg-[var(--tw-green-400)] rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navbar */}
        <header
          className="sticky top-0 z-30 shadow border-b border-[var(--color-border-secondary)]"
          style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
        >
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:text-white hover:bg-white/20 transition-colors duration-200"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-5 w-5" />
              </Button>

              {/* Page title */}
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-text-inverse)]">
                  {getCurrentPageTitle()}
                </h1>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {menuItems.find((item) => isActive(item.path))?.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Dark/Light theme toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-white hover:text-white hover:bg-white/20 transition-colors duration-200"
                title="Toggle Dark/Light Mode"
              >
                {isDark ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </Button>

              {/* Color theme toggle (Default/Dark) */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleColorTheme}
                className="text-white hover:text-white hover:bg-white/20 transition-colors duration-200"
                title={`Switch to ${
                  theme === "default" ? "Dark" : "Default"
                } Theme`}
              >
                <div
                  className={`h-5 w-5 rounded-full border-2 border-white ${
                    theme === "dark" || theme === "purple"
                      ? "bg-gradient-to-r from-gray-800 to-black"
                      : "bg-gradient-to-r from-blue-500 to-blue-700"
                  }`}
                />
              </Button>

              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const opening = !notificationsOpen;
                    setNotificationsOpen(opening);
                    // If opening the dropdown, mark message notifications as read
                    if (opening) {
                      try {
                        messageNotifications.forEach((n) => {
                          const msgId = n.message?.id;
                          if (msgId && typeof markAsRead === 'function') {
                            markAsRead(msgId);
                          }
                        });
                      } catch (e) {
                        console.error('Error marking notifications as read', e);
                      }
                      // Hide legacy unread dot once viewed
                      setNotificationsViewed(true);
                    }
                  }}
                  className="text-white hover:text-white hover:bg-white/20 transition-colors duration-200"
                >
                  <BellIcon className="h-5 w-5" />
                  {((!notificationsViewed ? legacyUnreadCount : 0) + unreadCount) > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                  )}
                  {((!notificationsViewed ? legacyUnreadCount : 0) + unreadCount) > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {((!notificationsViewed ? legacyUnreadCount : 0) + unreadCount) > 9
                        ? "9+"
                        : ((!notificationsViewed ? legacyUnreadCount : 0) + unreadCount)}
                    </span>
                  )}
                </Button>

                {/* Notifications dropdown */}
                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg ring-1 ring-[var(--color-black)] ring-opacity-5 z-50"
                      style={{ backgroundColor: "var(--notif-bg)", border: "1px solid var(--notif-border)" }}
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    >
                      <div className="p-4 border-b" style={{ borderColor: "var(--notif-border)", backgroundColor: "var(--notif-bg)" }}>
                        <h3 className="text-lg font-semibold" style={{ color: "var(--notif-text-primary)" }}>
                          Notifications
                        </h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {legacyNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="p-4 border-b last:border-b-0 transition-colors duration-150 hover:bg-[var(--notif-bg-accent)]"
                            style={{ borderColor: "var(--notif-border)", backgroundColor: "transparent" }}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`h-2 w-2 rounded-full mt-2`}
                                style={{ backgroundColor: notification.unread ? "var(--notif-unread-dot)" : "var(--notif-read-dot)" }}
                              />
                              <div className="flex-1">
                                <p className="text-sm font-semibold" style={{ color: "var(--notif-text-primary)" }}>
                                  {notification.title}
                                </p>
                                <p className="text-sm mt-1" style={{ color: "var(--notif-text-secondary)" }}>
                                  {notification.message}
                                </p>
                                <p className="text-xs mt-2" style={{ color: "var(--notif-text-muted)" }}>
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
                  className="flex items-center space-x-2 text-white hover:text-white hover:bg-white/20 transition-colors duration-200"
                >
                  <UserCircleIcon className="h-6 w-6" />
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>

                {/* User dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-[var(--color-bg-primary)] rounded-lg shadow-lg ring-1 ring-[var(--color-black)] ring-opacity-5 z-50 border border-[var(--color-border-primary)]"
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    >
                      <div className="p-4 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                          Admin User
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          admin@bellatrix.com
                        </p>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => {
                            // Clear all authentication data from localStorage
                            clearAuthData();
                            // Navigate to admin login page
                            navigate("/admin/login");
                          }}
                          className="flex w-full items-center px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-primary-bg)] hover:text-[var(--color-primary)] transition-colors duration-150"
                        >
                          <PowerIcon className="mr-3 h-4 w-4" />
                          Logout
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
        <main
          className={`flex-1 ${
            isEnhancedCreate ? "p-0" : "p-4 sm:p-6 lg:p-8"
          } overflow-auto`}
        >
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

      {/* Message Notifications */}
      {messageNotifications.map((notification) => (
        <MessageNotification
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
          onReply={() => navigate("/admin/messages")}
          onView={() => navigate("/admin/messages")}
        />
      ))}
    </div>
  );
};

export default ModernAdminLayout;
