import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create api instance directly to avoid import issues
const api = axios.create({
  baseURL: "http://bellatrix.runasp.net/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Add request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle wrapped responses
api.interceptors.response.use(
  (response) => {
    if (
      response.data &&
      typeof response.data === "object" &&
      "data" in response.data
    ) {
      if (response.data.success === false) {
        const error = new Error(response.data.message || "API request failed");
        error.response = { status: response.status, data: response.data };
        throw error;
      }
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error) => {
    const normalizedError = {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      status: error.response?.status || 0,
      details: error.response?.data || null,
    };
    return Promise.reject(normalizedError);
  }
);

export const useMessageNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch initial unread count
  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await api.get('/ContactMessages/stats');
      if (response.data.success) {
        setUnreadCount(response.data.data.unrepliedMessages || 0);
      }
    } catch (error) {
      console.error('Error fetching message stats:', error);
    }
  }, []);

  // Check for new messages (simulate real-time updates)
  const checkForNewMessages = useCallback(async () => {
    try {
      const response = await api.get('/ContactMessages/recent');
      if (response.data.success) {
        const recentMessages = response.data.data || [];
        const now = new Date();
        
        // Find messages from the last 30 seconds (simulating real-time)
        const newMessages = recentMessages.filter(message => {
          const messageTime = new Date(message.createdAt || message.date);
          const timeDiff = (now - messageTime) / 1000; // seconds
          return timeDiff <= 30;
        });

        // Add new notifications
        newMessages.forEach(message => {
          const notificationExists = notifications.some(
            n => n.message?.id === message.id
          );
          
          if (!notificationExists) {
            const newNotification = {
              id: Date.now() + Math.random(),
              message,
              timestamp: new Date(),
              type: 'new_message',
            };
            
            setNotifications(prev => [newNotification, ...prev]);
            setUnreadCount(prev => prev + 1);
          }
        });
      }
    } catch (error) {
      console.error('Error checking for new messages:', error);
    }
  }, [notifications]);

  // Remove notification
  const removeNotification = useCallback((notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Mark message as read (decreases unread count)
  const markAsRead = useCallback((messageId) => {
    setUnreadCount(prev => Math.max(0, prev - 1));
    // Remove any notifications for this message
    setNotifications(prev => prev.filter(n => n.message?.id !== messageId));
  }, []);

  // Simulate WebSocket connection for real-time updates
  useEffect(() => {
    // Initial fetch
    fetchUnreadCount();
    
    // Set up polling for new messages (every 30 seconds)
    const interval = setInterval(() => {
      checkForNewMessages();
    }, 30000);

    // Simulate connection status
    setIsConnected(true);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, [fetchUnreadCount, checkForNewMessages]);

  // Simulate receiving a new message (for testing)
  const simulateNewMessage = useCallback((message) => {
    const newNotification = {
      id: Date.now() + Math.random(),
      message,
      timestamp: new Date(),
      type: 'new_message',
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  }, []);

  return {
    notifications,
    unreadCount,
    isConnected,
    removeNotification,
    clearAllNotifications,
    markAsRead,
    simulateNewMessage,
    fetchUnreadCount,
  };
};

// Hook for managing message polling (can be used in other components)
export const useMessagePolling = (interval = 30000) => {
  const [lastCheck, setLastCheck] = useState(new Date());

  const checkForNewMessages = useCallback(async () => {
    try {
      const response = await api.get('/ContactMessages/recent');
      if (response.data.success) {
        const recentMessages = response.data.data || [];
        const now = new Date();
        
        // Return messages from the last check
        const newMessages = recentMessages.filter(message => {
          const messageTime = new Date(message.createdAt || message.date);
          return messageTime > lastCheck;
        });

        setLastCheck(now);
        return newMessages;
      }
    } catch (error) {
      console.error('Error polling for messages:', error);
    }
    return [];
  }, [lastCheck]);

  useEffect(() => {
    const intervalId = setInterval(checkForNewMessages, interval);
    return () => clearInterval(intervalId);
  }, [checkForNewMessages, interval]);

  return { checkForNewMessages };
};
