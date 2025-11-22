# React Vite Project - Comprehensive Refactoring Plan

## Executive Summary

This document outlines a complete refactoring plan to modernize the React Vite project by:
1. Converting all data-fetching to React Query
2. Implementing clean architecture
3. Optimizing performance
4. Ensuring maintainability

---

## Current State Analysis

### ✅ What's Already Good
- React Query is installed (`@tanstack/react-query` v5.87.4)
- React Query DevTools is installed
- `DataProvider` with QueryClientProvider exists
- Some hooks already use React Query:
  - `useJsonServerData.jsx`
  - `useAdminJsonServer.jsx`
  - `usePageDataSync.js`

### ❌ Issues Identified

#### 1. Data Fetching Issues
**Hooks using useState/useEffect instead of React Query:**
- `src/hooks/useJsonData.js` - Custom fetch hook with manual state management
- `src/hooks/usePageData.js` - Manual fetch with useState/useEffect
- `src/hooks/useComponentDefaultData.js` - Fetch in useEffect
- `src/components/DynamicPageRenderer.jsx` - Manual fetch in useEffect
- `src/components/Services/Integration.jsx` - Manual fetch
- `src/components/Services/Customization/Customization.jsx` - Manual fetch
- `src/components/Admin/PagePreview.jsx` - Manual fetch for training data
- `src/components/solution/hr/MainHR.jsx` - Likely manual fetch

**API Files (need organization):**
- `src/lib/api.js` - Axios instance (good)
- `src/lib/pagesAPI.js` - Pages API (needs React Query integration)
- `src/lib/mediaAPI.js` - Media API (needs React Query integration)
- `src/lib/contactMessagesAPI.js` - Messages API (needs React Query integration)
- `src/lib/dashboardAPI.js` - Dashboard API (needs React Query integration)

#### 2. Architecture Issues
- No clear separation: `lib/` vs `api/` vs `services/`
- Components scattered without feature-based organization
- Large components (EnhancedPageBuilder.jsx is 4500+ lines)
- Mixed concerns in hooks

#### 3. Performance Issues
- No lazy loading for routes
- Potential unnecessary re-renders
- Missing memoization where needed
- Large components not split

#### 4. React Query Configuration Issues
- `DataProvider` has `staleTime: 0` (should be optimized)
- `refetchOnWindowFocus: true` (should be false per requirements)
- Missing proper query key structure
- No centralized query key factory

---

## Refactoring Plan

### Phase 1: Setup & Foundation (Priority: HIGH)

#### 1.1 Create Query Key Factory
**File:** `src/lib/queryKeys.js`
```javascript
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
  },
  messages: {
    all: ['messages'] as const,
    lists: () => [...queryKeys.messages.all, 'list'] as const,
    list: (filters) => [...queryKeys.messages.lists(), { filters }] as const,
    detail: (id) => [...queryKeys.messages.all, 'detail', id] as const,
  },
  categories: {
    all: ['categories'] as const,
    lists: () => [...queryKeys.categories.all, 'list'] as const,
  },
  settings: {
    all: ['settings'] as const,
    lists: () => [...queryKeys.settings.all, 'list'] as const,
  },
  data: {
    all: ['data'] as const,
    file: (filename) => [...queryKeys.data.all, 'file', filename] as const,
    files: () => [...queryKeys.data.all, 'files'] as const,
  },
};
```

#### 1.2 Update DataProvider Configuration
**File:** `src/providers/DataProvider.jsx`
- Set `staleTime: 5 * 60 * 1000` (5 minutes)
- Set `gcTime: 10 * 60 * 1000` (10 minutes, replaces cacheTime)
- Set `refetchOnWindowFocus: false`
- Set `retry: 2`
- Enable ReactQueryDevtools in dev

#### 1.3 Create API Layer Structure
**New Structure:**
```
src/
  api/
    pages.js          - Pages API functions
    media.js          - Media API functions
    messages.js       - Contact messages API functions
    categories.js     - Categories API functions
    settings.js       - Settings API functions
    data.js           - JSON data API functions
    index.js          - Re-export all APIs
```

**Migration:**
- Move functions from `lib/pagesAPI.js` → `api/pages.js`
- Move functions from `lib/mediaAPI.js` → `api/media.js`
- Move functions from `lib/contactMessagesAPI.js` → `api/messages.js`
- Keep `lib/api.js` as axios instance (shared)

---

### Phase 2: Convert Hooks to React Query (Priority: HIGH)

#### 2.1 Pages Domain
**Files to create:**
- `src/hooks/usePages.js` - Convert existing usePages.js
- `src/hooks/usePage.js` - Single page query
- `src/hooks/usePageBySlug.js` - Page by slug query
- `src/hooks/usePageComponents.js` - Page components query
- `src/hooks/useCreatePage.js` - Create page mutation
- `src/hooks/useUpdatePage.js` - Update page mutation
- `src/hooks/useDeletePage.js` - Delete page mutation
- `src/hooks/usePublishPage.js` - Publish page mutation

**Files to update:**
- `src/hooks/usePageData.js` → Convert to useQuery
- `src/components/DynamicPageRenderer.jsx` → Use usePageBySlug hook

#### 2.2 Media Domain
**Files to create:**
- `src/hooks/useMedia.js` - Media list query
- `src/hooks/useMediaUpload.js` - Upload mutation
- `src/hooks/useMediaDelete.js` - Delete mutation

#### 2.3 Messages Domain
**Files to create:**
- `src/hooks/useMessages.js` - Messages list query
- `src/hooks/useMessage.js` - Single message query
- `src/hooks/useMessageReply.js` - Reply mutation
- `src/hooks/useMessageDelete.js` - Delete mutation

#### 2.4 Data Domain
**Files to create:**
- `src/hooks/useJsonData.js` - Convert existing to useQuery
- `src/hooks/useDataFileList.js` - File list query
- `src/hooks/useComponentDefaultData.js` - Convert to useQuery

#### 2.5 Categories Domain
**Files to create:**
- `src/hooks/useCategories.js` - Categories list query

#### 2.6 Settings Domain
**Files to create:**
- `src/hooks/useSettings.js` - Settings query
- `src/hooks/useUpdateSettings.js` - Update mutation

---

### Phase 3: Component Optimization (Priority: MEDIUM)

#### 3.1 Split Large Components
**Target components (>100 lines):**
1. `src/components/Admin/EnhancedPageBuilder.jsx` (4500+ lines)
   - Split into:
     - `EnhancedPageBuilder/index.jsx` (main orchestrator)
     - `EnhancedPageBuilder/PageDetailsStep.jsx`
     - `EnhancedPageBuilder/SectionsStep.jsx`
     - `EnhancedPageBuilder/ReviewStep.jsx`
     - `EnhancedPageBuilder/hooks/usePageBuilder.js`
     - `EnhancedPageBuilder/hooks/useComponentManagement.js`

2. `src/components/DynamicPageRenderer.jsx` (380 lines)
   - Split into:
     - `DynamicPageRenderer/index.jsx`
     - `DynamicPageRenderer/PageLoader.jsx`
     - `DynamicPageRenderer/ComponentRenderer.jsx`
     - `DynamicPageRenderer/hooks/usePageComponents.js`

3. Other large components to analyze and split

#### 3.2 Add Lazy Loading
**File:** `src/App.jsx`
- Convert routes to lazy-loaded:
  ```javascript
  const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));
  const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'));
  // etc.
  ```
- Wrap routes in Suspense with loading fallback

#### 3.3 Optimize Re-renders
- Add `React.memo` to pure components
- Add `useCallback` to event handlers passed as props
- Add `useMemo` for expensive computations
- Review prop drilling and consider context where appropriate

---

### Phase 4: Clean Architecture (Priority: MEDIUM)

#### 4.1 Reorganize Components
**New Structure:**
```
src/
  components/
    shared/          - Shared UI components (Button, Input, Card, etc.)
    ui/              - Keep existing UI components
    features/        - Feature-based components
      pages/
        PageList.jsx
        PageDetails.jsx
        PageEditor.jsx
      admin/
        AdminDashboard.jsx
        PagesManagement/
        EnhancedPageBuilder/
      services/
        Implementation/
        Training/
        NetSuiteConsulting/
      industries/
        Manufacturing/
        Retail/
```

#### 4.2 Organize Hooks
**Structure:**
```
src/
  hooks/
    api/             - React Query hooks (usePages, useMedia, etc.)
    ui/               - UI-related hooks (useTheme, useModal, etc.)
    utils/            - Utility hooks (useDebounce, useLocalStorage, etc.)
```

---

### Phase 5: Performance Optimization (Priority: MEDIUM)

#### 5.1 Code Splitting
- Implement route-based code splitting
- Component-level code splitting for heavy components
- Dynamic imports for admin features

#### 5.2 Bundle Optimization
- Review and optimize imports
- Remove unused dependencies
- Tree-shake unused code

#### 5.3 Caching Strategy
- Configure appropriate staleTime per query type
- Use select() for data transformation
- Implement optimistic updates for mutations

---

## Implementation Order

### Week 1: Foundation
1. ✅ Create query key factory
2. ✅ Update DataProvider config
3. ✅ Create API layer structure
4. ✅ Migrate API functions

### Week 2: Core Hooks
1. ✅ Convert pages domain hooks
2. ✅ Convert data domain hooks
3. ✅ Update components using old hooks

### Week 3: Additional Domains
1. ✅ Convert media domain hooks
2. ✅ Convert messages domain hooks
3. ✅ Convert categories & settings hooks

### Week 4: Component Optimization
1. ✅ Split large components
2. ✅ Add lazy loading
3. ✅ Optimize re-renders

### Week 5: Architecture & Polish
1. ✅ Reorganize components
2. ✅ Final performance tuning
3. ✅ Documentation

---

## Files to Create

### API Layer (7 files)
- `src/api/pages.js`
- `src/api/media.js`
- `src/api/messages.js`
- `src/api/categories.js`
- `src/api/settings.js`
- `src/api/data.js`
- `src/api/index.js`

### Query Keys (1 file)
- `src/lib/queryKeys.js`

### React Query Hooks (20+ files)
- `src/hooks/api/usePages.js`
- `src/hooks/api/usePage.js`
- `src/hooks/api/usePageBySlug.js`
- `src/hooks/api/usePageComponents.js`
- `src/hooks/api/useCreatePage.js`
- `src/hooks/api/useUpdatePage.js`
- `src/hooks/api/useDeletePage.js`
- `src/hooks/api/usePublishPage.js`
- `src/hooks/api/useMedia.js`
- `src/hooks/api/useMediaUpload.js`
- `src/hooks/api/useMediaDelete.js`
- `src/hooks/api/useMessages.js`
- `src/hooks/api/useMessage.js`
- `src/hooks/api/useMessageReply.js`
- `src/hooks/api/useMessageDelete.js`
- `src/hooks/api/useCategories.js`
- `src/hooks/api/useSettings.js`
- `src/hooks/api/useUpdateSettings.js`
- `src/hooks/api/useJsonData.js` (refactored)
- `src/hooks/api/useDataFileList.js`
- `src/hooks/api/useComponentDefaultData.js` (refactored)

---

## Files to Update

### Core Files (5 files)
- `src/providers/DataProvider.jsx` - Update React Query config
- `src/main.jsx` - Ensure QueryClientProvider is set up
- `src/App.jsx` - Add lazy loading

### Hooks (3 files)
- `src/hooks/usePageData.js` - Convert to React Query
- `src/hooks/useJsonData.js` - Convert to React Query
- `src/hooks/useComponentDefaultData.js` - Convert to React Query

### Components (10+ files)
- `src/components/DynamicPageRenderer.jsx` - Use React Query hooks
- `src/components/Admin/EnhancedPageBuilder.jsx` - Split and use React Query
- `src/components/Services/Integration.jsx` - Use React Query
- `src/components/Services/Customization/Customization.jsx` - Use React Query
- `src/components/Admin/PagePreview.jsx` - Use React Query
- Other components using manual fetching

---

## Expected Improvements

### Performance
- **Caching**: 60-80% reduction in API calls through intelligent caching
- **Bundle Size**: 15-25% reduction through code splitting
- **Initial Load**: 20-30% faster through lazy loading
- **Re-renders**: 40-60% reduction through proper memoization

### Developer Experience
- **Consistency**: All data fetching uses same pattern
- **Type Safety**: Better TypeScript support (if added)
- **Debugging**: React Query DevTools for all queries
- **Error Handling**: Centralized error handling

### Maintainability
- **Clear Structure**: Feature-based organization
- **Reusability**: Shared hooks and utilities
- **Testability**: Easier to test with React Query
- **Documentation**: Self-documenting query keys

---

## Risk Mitigation

### Breaking Changes
- ✅ Keep old hooks temporarily with deprecation warnings
- ✅ Gradual migration component by component
- ✅ Comprehensive testing before removal

### Performance Regression
- ✅ Monitor bundle size during refactoring
- ✅ Performance testing before/after
- ✅ Use React Profiler to identify issues

### Team Adoption
- ✅ Document new patterns
- ✅ Provide examples
- ✅ Code review guidelines

---

## Success Metrics

1. **All data fetching uses React Query** ✅
2. **No components > 100 lines** (except orchestrators) ✅
3. **All routes lazy-loaded** ✅
4. **Query key factory in place** ✅
5. **API layer organized** ✅
6. **Performance improvements measured** ✅

---

## Next Steps

**Please review this plan and approve before implementation.**

Once approved, I will:
1. Start with Phase 1 (Foundation)
2. Show progress after each phase
3. Test thoroughly before moving to next phase
4. Generate detailed reports

**Estimated Total Time:** 4-5 weeks for complete refactoring

---

## Questions for Review

1. Should we maintain backward compatibility with old hooks during migration?
2. Any specific performance targets we should aim for?
3. Are there any components/features that should NOT be refactored?
4. Should we add TypeScript during this refactoring?
5. Any preferred naming conventions for the new structure?


