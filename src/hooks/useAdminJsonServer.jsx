import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCacheManager } from '../utils/cacheManager.js';

const JSON_SERVER_BASE = 'http://localhost:3001';

// Available endpoints mapping
const ENDPOINTS = {
  'customization.json': 'customization',
  'homeData.json': 'home', 
  'hr.json': 'hr',
  'Implementation.json': 'Implementation',
  'integration-data.json': 'integration',
  'manufacturing-data.json': 'manufacturing',
  'netSuiteConsulting.json': 'netsuite-consulting',
  'payroll.json': 'payroll',
  'retail-data.json': 'retail',
  'training.json': 'training'
};

// Get list of available data files
export const useDataFileList = () => {
  const files = Object.keys(ENDPOINTS);
  
  return {
    files,
    loading: false,
    error: null,
    refresh: () => {} // No need to refresh static list
  };
};

// Get data for a specific file
export const useAdminJsonData = (filename) => {
  const endpoint = ENDPOINTS[filename];
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-data', filename],
    queryFn: async () => {
      if (!endpoint) {
        throw new Error(`No endpoint found for file: ${filename}`);
      }
      
      const response = await fetch(`${JSON_SERVER_BASE}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
      }
      
      return response.json();
    },
    enabled: !!filename && !!endpoint,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    data,
    loading: isLoading,
    error: error?.message || null,
    lastModified: null, // JSON Server doesn't provide this
    refetch
  };
};

// Save data to JSON Server (and sync to files)
export const useAdminSaveData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ filename, data }) => {
      const endpoint = ENDPOINTS[filename];
      if (!endpoint) {
        throw new Error(`No endpoint found for file: ${filename}`);
      }

      console.log('Saving data to endpoint:', endpoint, 'with data:', data);

      // Update the JSON Server endpoint
      const response = await fetch(`${JSON_SERVER_BASE}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Save failed:', response.status, errorText);
        throw new Error(`Failed to save ${filename}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Save response:', result);

      // Small delay to ensure JSON Server has written the data
      await new Promise(resolve => setTimeout(resolve, 100));

      return result;
    },
    onSuccess: async (data, variables) => {
      console.log('Save successful, invalidating caches for:', variables.filename);
      
      // Invalidate and refetch the specific file's data
      queryClient.invalidateQueries(['admin-data', variables.filename]);
      
      // Get endpoint for user pages
      const endpoint = ENDPOINTS[variables.filename];
      if (endpoint) {
        console.log('Invalidating pageData cache for endpoint:', endpoint);
        
        try {
          // Use cache manager for aggressive refresh
          const cacheManager = getCacheManager();
          await cacheManager.forceRefreshEndpoint(endpoint);
          
          // Also do manual invalidation as backup
          queryClient.invalidateQueries(['pageData', endpoint]);
          queryClient.refetchQueries(['pageData', endpoint]);
          
        } catch (error) {
          console.warn('Cache manager not available, using fallback:', error);
          
          // Fallback: manual invalidation
          queryClient.invalidateQueries(['pageData', endpoint]);
          queryClient.refetchQueries(['pageData', endpoint]);
        }
      }
      
      // Also invalidate all page data to be extra sure
      queryClient.invalidateQueries(['pageData']);
      
      console.log('✅ Cache invalidation completed');
    },
    onError: (error, variables) => {
      console.error('Save failed for:', variables.filename, error);
    },
  });
};

// Real-time updates (simplified for JSON Server)
export const useRealTimeUpdates = () => {
  const [connectionStatus] = useState('connected');
  
  // JSON Server doesn't have real-time updates, but we can simulate the connection status
  return {
    connectionStatus,
    lastUpdate: new Date().toISOString(),
    isConnected: true
  };
};

// Legacy compatibility exports
export const useJsonData = useAdminJsonData;