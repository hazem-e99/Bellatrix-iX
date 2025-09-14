// Cache Manager utility for force refresh
export class CacheManager {
  constructor(queryClient) {
    this.queryClient = queryClient;
  }

  // Force refresh all data after admin save
  async forceRefreshAll() {
    console.log('🔄 Force refreshing all page data...');
    
    // Clear all page data cache
    await this.queryClient.invalidateQueries({ queryKey: ['pageData'] });
    await this.queryClient.invalidateQueries({ queryKey: ['admin-data'] });
    
    // Force refetch all active queries
    await this.queryClient.refetchQueries({ 
      queryKey: ['pageData'],
      type: 'active'
    });
    
    console.log('✅ Cache refresh completed');
  }

  // Force refresh specific endpoint
  async forceRefreshEndpoint(endpoint) {
    console.log(`🔄 Force refreshing endpoint: ${endpoint}`);
    
    // Clear specific cache
    await this.queryClient.invalidateQueries({ queryKey: ['pageData', endpoint] });
    
    // Force refetch
    await this.queryClient.refetchQueries({ 
      queryKey: ['pageData', endpoint],
      type: 'active'
    });
    
    console.log(`✅ Endpoint ${endpoint} refreshed`);
  }

  // Get current cache status
  getCacheStatus() {
    const cache = this.queryClient.getQueryCache();
    const queries = cache.getAll();
    
    return {
      totalQueries: queries.length,
      pageDataQueries: queries.filter(q => q.queryKey[0] === 'pageData').length,
      adminQueries: queries.filter(q => q.queryKey[0] === 'admin-data').length,
      staleQueries: queries.filter(q => q.isStale()).length,
    };
  }

  // Clear all cache
  async clearAllCache() {
    console.log('🗑️ Clearing all cache...');
    await this.queryClient.clear();
    console.log('✅ All cache cleared');
  }
}

// Global cache manager instance
let globalCacheManager = null;

export const initCacheManager = (queryClient) => {
  globalCacheManager = new CacheManager(queryClient);
  return globalCacheManager;
};

export const getCacheManager = () => {
  if (!globalCacheManager) {
    throw new Error('Cache manager not initialized. Call initCacheManager first.');
  }
  return globalCacheManager;
};