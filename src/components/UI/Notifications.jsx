import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const success = useCallback((title, description, options = {}) => {
    return addNotification({ type: 'success', title, description, ...options });
  }, [addNotification]);

  const error = useCallback((title, description, options = {}) => {
    return addNotification({ type: 'error', title, description, duration: 7000, ...options });
  }, [addNotification]);

  const warning = useCallback((title, description, options = {}) => {
    return addNotification({ type: 'warning', title, description, ...options });
  }, [addNotification]);

  const info = useCallback((title, description, options = {}) => {
    return addNotification({ type: 'info', title, description, ...options });
  }, [addNotification]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = () => {
  const { notifications } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full pointer-events-none">
      {notifications.map((notification) => (
        <NotificationToast key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

const NotificationToast = ({ notification }) => {
  const { removeNotification } = useNotifications();

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          iconColor: 'text-green-600 dark:text-green-400',
          titleColor: 'text-green-800 dark:text-green-200',
          descColor: 'text-green-700 dark:text-green-300',
          icon: CheckCircleIcon,
        };
      case 'error':
        return {
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          iconColor: 'text-red-600 dark:text-red-400',
          titleColor: 'text-red-800 dark:text-red-200',
          descColor: 'text-red-700 dark:text-red-300',
          icon: XCircleIcon,
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          titleColor: 'text-yellow-800 dark:text-yellow-200',
          descColor: 'text-yellow-700 dark:text-yellow-300',
          icon: ExclamationCircleIcon,
        };
      case 'info':
      default:
        return {
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          iconColor: 'text-blue-600 dark:text-blue-400',
          titleColor: 'text-blue-800 dark:text-blue-200',
          descColor: 'text-blue-700 dark:text-blue-300',
          icon: InformationCircleIcon,
        };
    }
  };

  const styles = getNotificationStyles(notification.type);
  const Icon = styles.icon;

  return (
    <div 
      className={`
        ${styles.bgColor} ${styles.borderColor} border rounded-xl shadow-lg p-4
        pointer-events-auto transform transition-all duration-300 ease-in-out
        animate-in slide-in-from-top-2 fade-in
      `}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`w-6 h-6 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <p className={`${styles.titleColor} font-medium text-sm`}>
            {notification.title}
          </p>
          {notification.description && (
            <p className={`${styles.descColor} text-sm mt-1`}>
              {notification.description}
            </p>
          )}
        </div>
        <button
          onClick={() => removeNotification(notification.id)}
          className={`${styles.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};