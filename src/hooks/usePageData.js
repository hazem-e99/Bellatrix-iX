import { useState, useEffect, useCallback, useRef } from 'react';

// Hook for polling-based updates
export const useDataPolling = (filename, interval = 10000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastModified, setLastModified] = useState(null);
  const intervalRef = useRef(null);
  const isMountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    if (!filename) return;

    try {
      const response = await fetch(`/data/${filename}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (isMountedRef.current) {
        setData(result);
        setError(null);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      if (isMountedRef.current) {
        setError(err.message);
        setLoading(false);
      }
    }
  }, [filename]);

  const checkForUpdates = useCallback(async () => {
    if (!filename) return;

    try {
      const response = await fetch(`http://localhost:3001/api/data/${filename}`);
      
      if (response.ok) {
        const result = await response.json();
        const newLastModified = result.lastModified;
        
        // Check if data has been updated
        if (lastModified && newLastModified !== lastModified) {
          console.log(`Data updated for ${filename}, refreshing...`);
          setData(result.data);
          setLastModified(newLastModified);
          
          // Optionally show a notification
          if (window.showUpdateNotification) {
            window.showUpdateNotification(`${filename} has been updated`);
          }
        } else if (!lastModified) {
          setLastModified(newLastModified);
        }
      }
    } catch (err) {
      // Silently fail - probably means admin API is not running
      console.warn('Admin API not available for real-time updates:', err.message);
    }
  }, [filename, lastModified]);

  // Initial data fetch from public folder
  useEffect(() => {
    fetchData();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchData]);

  // Set up polling for updates
  useEffect(() => {
    if (interval && filename) {
      intervalRef.current = setInterval(checkForUpdates, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [checkForUpdates, interval, filename]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};

// Enhanced version with WebSocket support
export const useRealtimeData = (filename, options = {}) => {
  const {
    pollInterval = 10000,
    enableWebSocket = true,
    fallbackToPolling = true
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const socketRef = useRef(null);
  const isMountedRef = useRef(true);

  // Initial data fetch
  const fetchData = useCallback(async () => {
    if (!filename) return;

    try {
      setLoading(true);
      const response = await fetch(`/data/${filename}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (isMountedRef.current) {
        setData(result);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      if (isMountedRef.current) {
        setError(err.message);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [filename]);

  // WebSocket connection
  useEffect(() => {
    if (!enableWebSocket || !filename) return;

    const connectWebSocket = async () => {
      try {
        const { io } = await import('socket.io-client');
        
        socketRef.current = io('http://localhost:3001', {
          transports: ['websocket', 'polling']
        });

        socketRef.current.on('connect', () => {
          console.log('Connected to real-time updates');
          setConnectionStatus('connected');
        });

        socketRef.current.on('disconnect', () => {
          console.log('Disconnected from real-time updates');
          setConnectionStatus('disconnected');
        });

        socketRef.current.on('dataUpdated', (update) => {
          if (update.filename === filename || update.filename === `${filename}.json`) {
            console.log(`Real-time update received for ${filename}`);
            setData(update.data);
            
            // Show notification if available
            if (window.showUpdateNotification) {
              window.showUpdateNotification(`${filename} has been updated`);
            }
          }
        });

        socketRef.current.on('connect_error', (error) => {
          console.warn('WebSocket connection failed:', error);
          setConnectionStatus('error');
        });

      } catch (error) {
        console.warn('WebSocket not available:', error);
        setConnectionStatus('unavailable');
      }
    };

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [filename, enableWebSocket]);

  // Fallback polling when WebSocket is not available
  const { data: pollingData, error: pollingError } = useDataPolling(
    filename,
    (connectionStatus === 'connected' || !fallbackToPolling) ? null : pollInterval
  );

  // Use WebSocket data when available, otherwise use polling data
  useEffect(() => {
    if (connectionStatus !== 'connected' && pollingData) {
      setData(pollingData);
    }
    if (pollingError) {
      setError(pollingError);
    }
  }, [pollingData, pollingError, connectionStatus]);

  // Initial fetch
  useEffect(() => {
    fetchData();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    connectionStatus,
    refetch: fetchData
  };
};

// Simple hook for static data with optional updates
export const usePageData = (filename, enableRealtime = false) => {
  const realtimeResult = useRealtimeData(filename, { enableWebSocket: enableRealtime });
  const pollingResult = useDataPolling(filename, enableRealtime ? null : null);
  
  return enableRealtime ? realtimeResult : pollingResult;
};