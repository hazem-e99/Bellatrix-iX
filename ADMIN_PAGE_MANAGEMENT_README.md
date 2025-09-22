# Admin Dashboard Page Management System

A comprehensive React-based page management system for the Bellatrix-iX admin dashboard, built with **REST API integration only** and modern UI components.

**API Base URL:** `http://bellatrix.runasp.net`

## 🚀 Features

### Page Management
- ✅ Create, Read, Update, Delete pages
- ✅ Publish/Unpublish pages
- ✅ Duplicate pages
- ✅ Set homepage
- ✅ Search and filter pages
- ✅ Bulk operations (publish, delete)
- ✅ Slug validation and auto-generation
- ✅ SEO meta fields management

### Component Management
- ✅ Add, edit, delete page components
- ✅ Reorder components (drag & drop support)
- ✅ Duplicate components
- ✅ Component type management
- ✅ Content JSON validation
- ✅ Bulk component operations

### UI/UX Features
- ✅ Responsive design with Tailwind CSS
- ✅ Loading states and error handling
- ✅ Real-time validation
- ✅ Statistics dashboard
- ✅ Advanced filtering and sorting
- ✅ Pagination support

## 📁 File Structure

```
src/
├── services/
│   └── pagesService.js          # API service layer
├── contexts/
│   └── PageContext.jsx          # React context for state management
├── hooks/
│   ├── usePages.js             # Custom hook for page operations
│   └── usePageComponents.js     # Custom hook for component operations
├── components/
│   ├── AdminDashboard.jsx       # Main dashboard wrapper
│   ├── PageManagement.jsx       # Page list and management UI
│   ├── PageEditor.jsx          # Page editing form
│   └── ComponentManager.jsx     # Component management UI
└── ...
```

## 🛠️ Installation & Setup

### 1. Install Dependencies

Make sure you have the required dependencies in your `package.json`:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "axios": "^1.0.0"
  }
}
```

### 2. Add to Your App

#### Option A: Direct Integration

```jsx
// In your main App.jsx or router setup
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <div className="App">
      {/* Your existing routes */}
      <Route path="/admin/pages" element={<AdminDashboard />} />
    </div>
  );
}
```

#### Option B: Standalone Usage

```jsx
// In any component where you want to use page management
import { PageProvider } from './contexts/PageContext';
import PageManagement from './components/PageManagement';

function MyAdminComponent() {
  return (
    <PageProvider>
      <PageManagement />
    </PageProvider>
  );
}
```

### 3. Configure API Base URL

The system uses `http://bellatrix.runasp.net` as the base URL. To change this, update the `BASE_URL` constant in `src/services/pagesService.js`:

```javascript
const BASE_URL = 'https://your-api-domain.com';
```

## 📖 Usage Examples

### Basic Page Operations

```jsx
import { usePages } from './hooks/usePages';

function MyComponent() {
  const {
    pages,
    loading,
    error,
    createPageWithSlug,
    updatePageWithSlug,
    deletePage,
    publishPage,
    unpublishPage
  } = usePages();

  // Create a new page
  const handleCreatePage = async () => {
    try {
      await createPageWithSlug({
        name: 'My New Page',
        categoryId: 1,
        slug: 'my-new-page',
        metaTitle: 'My New Page Title',
        metaDescription: 'Description for SEO',
        isPublished: true
      });
    } catch (error) {
      console.error('Error creating page:', error);
    }
  };

  // Update a page
  const handleUpdatePage = async (pageId) => {
    try {
      await updatePageWithSlug({
        id: pageId,
        name: 'Updated Page Name',
        categoryId: 1,
        isPublished: true
      });
    } catch (error) {
      console.error('Error updating page:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCreatePage}>Create Page</button>
      {/* Your UI components */}
    </div>
  );
}
```

### Component Management

```jsx
import { usePageComponents } from './hooks/usePageComponents';

function MyComponentManager() {
  const {
    pageComponents,
    addComponentWithName,
    updateComponent,
    deletePageComponent,
    reorderPageComponents
  } = usePageComponents();

  // Add a new component
  const handleAddComponent = async (pageId) => {
    try {
      await addComponentWithName(pageId, {
        componentType: 'text',
        componentName: 'My Text Component',
        contentJson: JSON.stringify({
          text: 'Hello World',
          style: 'default'
        })
      });
    } catch (error) {
      console.error('Error adding component:', error);
    }
  };

  // Reorder components
  const handleReorder = async (pageId, componentIds) => {
    try {
      await reorderPageComponents(pageId, componentIds);
    } catch (error) {
      console.error('Error reordering components:', error);
    }
  };

  return (
    <div>
      {/* Your component management UI */}
    </div>
  );
}
```

### Advanced Filtering and Search

```jsx
import { usePages } from './hooks/usePages';

function AdvancedPageList() {
  const {
    pages,
    setFilters,
    searchPagesLocally,
    getPublishedPages,
    getUnpublishedPages,
    getPagesByCategory
  } = usePages();

  // Search pages locally
  const searchResults = searchPagesLocally('search term');

  // Get published pages only
  const publishedPages = getPublishedPages();

  // Get pages by category
  const categoryPages = getPagesByCategory(1);

  // Set advanced filters
  const handleSetFilters = () => {
    setFilters({
      publishedOnly: true,
      categoryId: 1,
      searchTerm: 'example'
    });
  };

  return (
    <div>
      {/* Your filtered page list */}
    </div>
  );
}
```

## 🔧 API Integration

### Authentication

The system automatically includes authentication tokens from localStorage. Make sure to set the token:

```javascript
localStorage.setItem('authToken', 'your-jwt-token');
```

### Error Handling

All API operations include comprehensive error handling:

```jsx
try {
  await createPageWithSlug(pageData);
} catch (error) {
  // Error is automatically displayed in the UI
  // You can also access the error message: error.message
}
```

### Custom API Configuration

You can customize the API client in `pagesService.js`:

```javascript
// Add custom headers
apiClient.defaults.headers.common['X-Custom-Header'] = 'value';

// Add request/response interceptors
apiClient.interceptors.request.use((config) => {
  // Custom request logic
  return config;
});
```

## 🎨 Customization

### Styling

The components use Tailwind CSS classes. You can customize the appearance by:

1. Modifying the className props in components
2. Adding custom CSS classes
3. Updating the Tailwind configuration

### Component Types

Add new component types in `ComponentManager.jsx`:

```jsx
<option value="custom">Custom Component</option>
```

### Validation Rules

Customize validation rules in `pagesService.js`:

```javascript
validatePageData: (pageData) => {
  const errors = [];
  // Add your custom validation logic
  return errors;
}
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check the BASE_URL in `pagesService.js`
   - Verify your API endpoints are accessible
   - Check authentication token

2. **Component Not Rendering**
   - Ensure PageProvider wraps your components
   - Check for JavaScript errors in console
   - Verify all dependencies are installed

3. **Validation Errors**
   - Check the validation rules in `pagesService.js`
   - Ensure required fields are provided
   - Verify data types match API expectations

### Debug Mode

Enable debug logging by adding this to your component:

```jsx
useEffect(() => {
  console.log('Pages:', pages);
  console.log('Loading:', loading);
  console.log('Error:', error);
}, [pages, loading, error]);
```

## 📚 API Reference

### Pages API Endpoints

- `POST /api/Pages` - Create page
- `GET /api/Pages` - Get all pages
- `PUT /api/Pages` - Update page
- `GET /api/Pages/{id}` - Get page by ID
- `DELETE /api/Pages/{id}` - Delete page
- `POST /api/Pages/{id}/publish` - Publish page
- `POST /api/Pages/{id}/unpublish` - Unpublish page
- `POST /api/Pages/{id}/duplicate` - Duplicate page
- `POST /api/Pages/{id}/set-homepage` - Set as homepage
- `GET /api/Pages/search` - Search pages
- `GET /api/Pages/slug-exists` - Check slug availability

### Components API Endpoints

- `POST /api/Pages/{pageId}/components` - Add component
- `GET /api/Pages/{pageId}/components` - Get page components
- `PUT /api/Pages/components/{componentId}` - Update component
- `DELETE /api/Pages/components/{componentId}` - Delete component
- `POST /api/Pages/{pageId}/components/reorder` - Reorder components

## 🤝 Contributing

When extending this system:

1. Follow the existing patterns for API calls
2. Add proper error handling
3. Include loading states
4. Update this documentation
5. Test with the actual API endpoints

## 📄 License

This system is part of the Bellatrix-iX project and follows the same licensing terms.
