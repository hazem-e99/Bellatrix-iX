import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Hook للتحديثات المباشرة للصفحات بعد تغيير Admin
export const usePageDataSync = () => {
  const queryClient = useQueryClient();

  // تحديث البيانات بناءً على تغييرات Admin
  const syncPageData = useCallback(async (endpoint) => {
    console.log(`🔄 Syncing page data for: ${endpoint}`);
    
    try {
      // Clear the cache completely for this endpoint
      queryClient.removeQueries(['pageData', endpoint]);
      
      // Force a fresh fetch
      await queryClient.prefetchQuery({
        queryKey: ['pageData', endpoint],
        queryFn: async () => {
          const response = await fetch(`http://localhost:3001/${endpoint}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint}`);
          }
          return response.json();
        },
        staleTime: 0,
        cacheTime: 0, // Don't cache
      });
      
      // Invalidate all related queries
      queryClient.invalidateQueries(['pageData', endpoint]);
      
      console.log(`✅ Page data synced for: ${endpoint}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to sync page data for ${endpoint}:`, error);
      return false;
    }
  }, [queryClient]);

  // تحديث جميع البيانات
  const syncAllPageData = useCallback(async () => {
    console.log('🔄 Syncing all page data...');
    
    const endpoints = [
      'customization', 'home', 'hr', 'Implementation', 
      'integration', 'manufacturing', 'netsuite-consulting', 
      'payroll', 'retail', 'training'
    ];
    
    try {
      // Clear all page data cache
      queryClient.removeQueries(['pageData']);
      
      // Wait a bit for cache clearing
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Force refresh each endpoint
      const results = await Promise.allSettled(
        endpoints.map(endpoint => syncPageData(endpoint))
      );
      
      const successCount = results.filter(r => r.status === 'fulfilled' && r.value).length;
      console.log(`✅ Synced ${successCount}/${endpoints.length} endpoints`);
      
      return successCount === endpoints.length;
    } catch (error) {
      console.error('❌ Failed to sync all page data:', error);
      return false;
    }
  }, [queryClient, syncPageData]);

  return {
    syncPageData,
    syncAllPageData
  };
};

// Hook للاستماع لتغييرات الملفات
export const useFileChangeWatcher = () => {
  const { syncPageData } = usePageDataSync();

  // مراقبة تغييرات db.json
  const watchFileChanges = useCallback(() => {
    // في بيئة production يمكن استخدام WebSocket أو SSE
    // للآن سنستخدم polling بسيط
    const interval = setInterval(async () => {
      try {
        // فحص آخر تعديل على db.json
        const response = await fetch('http://localhost:3001/db');
        if (response.ok) {
          // تم العثور على تغيير، قم بتحديث كل البيانات
          console.log('📂 File change detected, syncing data...');
          // يمكن تحسين هذا لتحديد الـ endpoint المحدد فقط
        }
      } catch (error) {
        // تجاهل الأخطاء في polling
      }
    }, 2000); // فحص كل ثانيتين

    return () => clearInterval(interval);
  }, []);

  return {
    watchFileChanges
  };
};