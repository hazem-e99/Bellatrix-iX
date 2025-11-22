/**
 * Query Key Factory
 * Centralized query key management for React Query
 * Follows the pattern: ['domain', 'operation', ...params]
 */

export const queryKeys = {
  pages: {
    all: ['pages'] as const,
    lists: () => [...queryKeys.pages.all, 'list'] as const,
    list: (filters) => [...queryKeys.pages.lists(), { filters }] as const,
    details: () => [...queryKeys.pages.all, 'detail'] as const,
    detail: (id) => [...queryKeys.pages.details(), id] as const,
    bySlug: (slug) => [...queryKeys.pages.all, 'slug', slug] as const,
    components: (pageId) => [...queryKeys.pages.detail(pageId), 'components'] as const,
  },
  media: {
    all: ['media'] as const,
    lists: () => [...queryKeys.media.all, 'list'] as const,
    list: (filters) => [...queryKeys.media.lists(), { filters }] as const,
    detail: (id) => [...queryKeys.media.all, 'detail', id] as const,
    public: (id) => [...queryKeys.media.all, 'public', id] as const,
  },
  messages: {
    all: ['messages'] as const,
    lists: () => [...queryKeys.messages.all, 'list'] as const,
    list: (filters) => [...queryKeys.messages.lists(), { filters }] as const,
    detail: (id) => [...queryKeys.messages.all, 'detail', id] as const,
    recent: (limit) => [...queryKeys.messages.all, 'recent', limit] as const,
    stats: () => [...queryKeys.messages.all, 'stats'] as const,
    search: (query) => [...queryKeys.messages.all, 'search', query] as const,
  },
  categories: {
    all: ['categories'] as const,
    lists: () => [...queryKeys.categories.all, 'list'] as const,
  },
  settings: {
    all: ['settings'] as const,
    lists: () => [...queryKeys.settings.all, 'list'] as const,
  },
  dashboard: {
    all: ['dashboard'] as const,
    stats: () => [...queryKeys.dashboard.all, 'stats'] as const,
    recentMessages: (count) => [...queryKeys.dashboard.all, 'recentMessages', count] as const,
    recentPages: (count) => [...queryKeys.dashboard.all, 'recentPages', count] as const,
    systemStatus: () => [...queryKeys.dashboard.all, 'systemStatus'] as const,
  },
  data: {
    all: ['data'] as const,
    file: (filename) => [...queryKeys.data.all, 'file', filename] as const,
    files: () => [...queryKeys.data.all, 'files'] as const,
  },
  components: {
    all: ['components'] as const,
    default: (componentName) => [...queryKeys.components.all, 'default', componentName] as const,
  },
};

export default queryKeys;


