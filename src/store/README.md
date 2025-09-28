# Bellatrix Redux Toolkit Data Layer

A comprehensive, production-ready Redux Toolkit implementation for the Bellatrix API, supporting all endpoints from the Postman collection with advanced features like caching, error normalization, and request cancellation.

## 🚀 Features

- **Complete API Coverage**: All endpoints from Postman collection implemented
- **Advanced Caching**: 5-minute TTL with force refresh capability
- **Request Cancellation**: AbortController integration for all async thunks
- **Error Normalization**: Consistent error handling across all slices
- **TypeScript Ready**: JSDoc types with easy TypeScript migration path
- **Comprehensive Testing**: Jest test suites for critical functionality
- **Global Selectors**: Cross-slice state access and loading indicators
- **Authentication Integration**: JWT token management with localStorage persistence

## 📁 Architecture

```
src/
├── lib/
│   └── api.js                    # Axios client with interceptors
├── store/
│   ├── index.js                  # Store configuration
│   ├── globalSelectors.js        # Cross-slice selectors
│   ├── auth/
│   │   ├── authSlice.js          # Authentication & file upload
│   │   └── authSlice.test.js     # Comprehensive tests
│   ├── hero/
│   │   └── heroSlice.js          # Landing hero section
│   ├── landing/
│   │   ├── servicesSlice.js      # Landing services
│   │   ├── testimonialsSlice.js  # Testimonials
│   │   └── industriesSlice.js    # Industries
│   ├── content/
│   │   └── contentSlice.js       # Modal, CTA, Pricing, Process, Why-Choose
│   ├── training/
│   │   └── trainingSlice.js      # Training resources
│   ├── about/
│   │   └── aboutSlice.js         # About page data
│   ├── implementation/
│   │   └── implementationSlice.js # Implementation services
│   └── TEMPLATE_slice.js         # Template for new slices
└── components/
    └── LandingAdminPanel.jsx     # Example admin interface
```

## 🛠 API Client (`src/lib/api.js`)

Centralized Axios instance with:
- Base URL: `http://localhost:5005`
- 10-second timeout
- Error normalization interceptors
- File upload helper (`uploadForm`)
- Auth token helper (`getAuthTokenFromState`)

```javascript
import api, { uploadForm, getAuthTokenFromState } from '../lib/api';

// Standard API call
const response = await api.get('/api/endpoint');

// File upload
await uploadForm(formData, '/api/auth/upload-image', {
  headers: { Authorization: `Bearer ${token}` }
});
```

## 🔐 Authentication (`src/store/auth/authSlice.js`)

Complete auth flow with localStorage persistence:

```javascript
import { login, createAdmin, uploadImage, getProfile, logout } from '../store/auth/authSlice';

// Login
dispatch(login({ payload: { email, password } }));

// Create admin
dispatch(createAdmin({ payload: { username, email, password, isAdmin: true } }));

// Upload image (requires auth)
dispatch(uploadImage({ payload: { image: fileObject } }));

// Get profile (with caching)
dispatch(getProfile({ force: false })); // Uses cache if fresh
dispatch(getProfile({ force: true }));  // Forces API call
```

## 📊 State Shape

Each slice follows a consistent pattern:

```javascript
// For list resources (services, testimonials, industries, training)
{
  items: [],
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
  lastFetchedAt: number | null,
  cacheTTLms: number // default 5 minutes
}

// For single resources (hero, about)
{
  item: object | null,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
  lastFetchedAt: number | null,
  cacheTTLms: number
}

// Content slice (modal, CTA, pricing, process, whyChoose)
{
  modal: { item, status, error, lastFetchedAt },
  cta: { item, status, error, lastFetchedAt },
  pricing: { item, status, error, lastFetchedAt },
  process: { item, status, error, lastFetchedAt },
  whyChoose: { item, status, error, lastFetchedAt },
  cacheTTLms: number
}
```

## 🎯 Usage Examples

### Basic CRUD Operations

```javascript
import { fetchServices, createService, updateService, deleteService } from '../store/landing/servicesSlice';

// Fetch with caching
dispatch(fetchServices()); // Uses cache if fresh
dispatch(fetchServices({ force: true })); // Forces API call

// Create
dispatch(createService({ 
  payload: { name: 'New Service', description: 'Service description' }
}));

// Update
dispatch(updateService({ 
  payload: { id: 1, name: 'Updated Service' }
}));

// Delete
dispatch(deleteService({ serviceId: 1 }));
```

### Global Loading & Error States

```javascript
import {
  selectIsAnyLoading,
  selectAllErrors,
  selectIsAuthenticated,
  selectLandingPageData
} from '../store/globalSelectors';

const isLoading = useSelector(selectIsAnyLoading);
const errors = useSelector(selectAllErrors);
const isAuth = useSelector(selectIsAuthenticated);
const landingData = useSelector(selectLandingPageData);

// Show global loading spinner
if (isLoading) return <Spinner />;

// Display all errors with retry buttons
Object.entries(errors).map(([resource, error]) => (
  <ErrorMessage key={resource} resource={resource} error={error} />
));
```

### Content Management

```javascript
import { modal, cta, pricing } from '../store/content/contentSlice';

// Fetch content sections
dispatch(modal.fetch());
dispatch(cta.fetch({ force: true }));
dispatch(pricing.fetch());

// Create/update content
dispatch(modal.create({ payload: { title: 'New Modal', content: '...' } }));
dispatch(cta.update({ payload: { title: 'Updated CTA', buttonText: 'Click Me' } }));
dispatch(pricing.remove());
```

## 🧪 Testing

Comprehensive test suite included:

```bash
# Run tests
npm test src/store/auth/authSlice.test.js

# Test coverage includes:
# - Initial state
# - Successful/failed thunks
# - Cache behavior
# - Abort signal handling
# - localStorage integration
```

## 🔄 Request Cancellation

All thunks support AbortController:

```javascript
const controller = new AbortController();

// Dispatch with signal
const promise = dispatch(fetchServices());

// Cancel if needed
controller.abort();

// In components, auto-cancel on unmount
useEffect(() => {
  const controller = new AbortController();
  dispatch(fetchServices()).catch(err => {
    if (err.name !== 'AbortError') {
      console.error('Fetch failed:', err);
    }
  });
  
  return () => controller.abort();
}, []);
```

## 📝 Adding New Slices

1. Copy `TEMPLATE_slice.js`
2. Replace `RESOURCE_NAME` and `API_ENDPOINT`
3. Adjust state shape (items[] vs item{})
4. Add to `store/index.js`:

```javascript
import newResourceReducer from './newResource/newResourceSlice';

const store = configureStore({
  reducer: {
    // ...existing
    newResource: newResourceReducer,
  },
});
```

## 🔍 Selector Patterns

Each slice provides standard selectors:

```javascript
// Items/Item
export const selectResourceItems = createSelector(selectResource, r => r.items);
export const selectResourceItem = createSelector(selectResource, r => r.item);

// Status & Loading
export const selectResourceStatus = createSelector(selectResource, r => r.status);
export const selectIsResourceLoading = createSelector(selectResource, r => r.status === 'loading');

// Error handling
export const selectResourceError = createSelector(selectResource, r => r.error);

// Data availability
export const selectHasResourceData = createSelector(selectResource, r => r.items.length > 0);

// Cache staleness
export const selectIsResourceStale = createSelector(selectResource, r => 
  !isCacheValid(r.lastFetchedAt, r.cacheTTLms)
);
```

## 🚨 Error Handling

Normalized error structure across all slices:

```javascript
// API errors are normalized to:
{
  message: string,    // Human-readable message
  status: number,     // HTTP status code
  details: object     // Raw error response
}

// Usage in components:
const errors = useSelector(selectAllErrors);
if (errors.services) {
  console.error('Services error:', errors.services);
  // Show retry button, etc.
}
```

## 🎨 Example Admin Panel

`LandingAdminPanel.jsx` demonstrates:
- Authentication flow
- File upload
- CRUD operations
- Error handling with retry
- Loading states
- Stale data detection

## 🔧 Configuration

Default cache TTL is 5 minutes, configurable per slice:

```javascript
// Change cache duration
dispatch(setCacheTTL(10 * 60 * 1000)); // 10 minutes

// Force refresh ignoring cache
dispatch(fetchResource({ force: true }));
```

## 📚 API Endpoints Covered

### Authentication
- `POST /api/auth/create-admin`
- `POST /api/auth/login`
- `POST /api/auth/upload-image` (multipart/form-data)
- `GET /api/auth/profile`

### Landing Sections
- `GET/POST/PATCH/DELETE /api/landing/hero`
- `GET/POST/PATCH/DELETE /api/landing/services`
- `GET/POST/PATCH/DELETE /api/landing/testimonials`
- `GET/POST/PATCH/DELETE /api/landing/industries`

### Content Sections
- `GET/POST/PATCH/DELETE /api/modal-content`
- `GET/POST/PATCH/DELETE /api/cta-section`
- `GET/POST/PATCH/DELETE /api/pricing-section`
- `GET/POST/PATCH/DELETE /api/process-section`
- `GET/POST/PATCH/DELETE /api/why-choose-section`

### Resources
- `GET/POST/PATCH/DELETE /api/training`
- `GET/POST/PATCH/DELETE /api/about`
- `GET/POST/PATCH/DELETE /api/implementation/hero`

## 🚀 Migration from Existing Code

If migrating from existing Redux code:

1. **Update imports**: Change from old slice paths to new structure
2. **Selector updates**: Use new memoized selectors
3. **Error handling**: Update to use normalized error structure
4. **Loading states**: Use global `selectIsAnyLoading` or slice-specific selectors
5. **Authentication**: Update to use new auth slice with localStorage persistence

## 🏗 Production Considerations

- Enable Redux DevTools only in development
- Configure cache TTL based on data volatility
- Implement proper error boundaries in React
- Add request retry logic for failed API calls
- Monitor bundle size with multiple slices

---

This implementation provides a robust, scalable foundation for the Bellatrix frontend data layer, following Redux Toolkit best practices with comprehensive error handling and caching strategies.
