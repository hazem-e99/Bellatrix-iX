import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "http://bellatrix.runasp.net/api";

// Custom hook for fetching and managing JSON data
export const useJsonData = (filename = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastModified, setLastModified] = useState(null);

  const fetchData = useCallback(
    async (targetFilename = filename) => {
      if (!targetFilename) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/data/${targetFilename}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${targetFilename}: ${response.statusText}`
          );
        }

        const result = await response.json();
        setData(result.data);
        setLastModified(result.lastModified);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [filename]
  );

  const updateData = useCallback(
    async (newData, targetFilename = filename) => {
      if (!targetFilename) {
        setError("No filename specified for update");
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/data/${targetFilename}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: newData }),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to update ${targetFilename}: ${response.statusText}`
          );
        }

        const result = await response.json();
        setData(newData);
        setLastModified(result.timestamp);
        return true;
      } catch (err) {
        console.error("Error updating data:", err);
        setError(err.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [filename]
  );

  useEffect(() => {
    if (filename) {
      fetchData();
    }
  }, [fetchData, filename]);

  return {
    data,
    loading,
    error,
    lastModified,
    refetch: fetchData,
    updateData,
    setData, // For optimistic updates
  };
};

// Custom hook for fetching list of available JSON files
export const useDataFileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/data`);

      if (!response.ok) {
        throw new Error(`Failed to fetch file list: ${response.statusText}`);
      }

      const result = await response.json();
      setFiles(result);
    } catch (err) {
      console.error("Error fetching file list:", err);
      setError(err.message);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return {
    files,
    loading,
    error,
    refetch: fetchFiles,
  };
};

// Custom hook for real-time updates via WebSocket
export const useRealTimeUpdates = (onDataUpdated) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Only import socket.io client in the browser
    import("socket.io-client")
      .then(({ io }) => {
        const newSocket = io("http://localhost:3001");

        newSocket.on("connect", () => {
          console.log("Connected to real-time updates");
          setConnected(true);
        });

        newSocket.on("disconnect", () => {
          console.log("Disconnected from real-time updates");
          setConnected(false);
        });

        newSocket.on("dataUpdated", (update) => {
          console.log("Data updated:", update);
          if (onDataUpdated) {
            onDataUpdated(update);
          }
        });

        setSocket(newSocket);

        return () => {
          newSocket.disconnect();
        };
      })
      .catch((err) => {
        console.warn("Socket.IO not available:", err);
      });
  }, [onDataUpdated]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return {
    connected,
    socket,
  };
};

// Utility function for deep cloning objects
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Utility function for validating JSON data
export const validateJsonData = (data) => {
  try {
    JSON.stringify(data);
    return { valid: true, error: null };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};
