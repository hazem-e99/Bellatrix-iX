# Page Editor Documentation

## Overview

The Page Editor is a modern, interactive component editor for your React + Tailwind + shadcn/ui project. It provides a split-screen interface with a form editor on the left and live preview on the right, allowing you to edit page components dynamically.

## Features

### ✨ Core Features
- **Split-screen design**: Form editor (left) + Live preview (right)
- **Drag & drop reordering**: Easily reorder components by dragging
- **Collapsible cards**: Each component displays as an expandable card
- **Dynamic form generation**: Forms automatically adapt to your component's content structure
- **Real-time preview**: See changes immediately as you edit
- **Dark mode design**: Beautiful dark theme with smooth animations
- **Save functionality**: Individual component save + global page save
- **Change tracking**: Visual indicators for unsaved changes

### 🎯 Advanced Features
- **Nested object/array support**: Handle complex data structures
- **Auto-save**: Debounced auto-save prevents data loss
- **Type-aware inputs**: Smart input types based on field names (email, URL, etc.)
- **Validation**: Built-in validation for component data
- **Notifications**: Success/error notifications for user feedback
- **Responsive design**: Works on different screen sizes

## File Structure

```
src/
├── pages/
│   └── dashboard/
│       ├── PageEditor.jsx          # Main editor component
│       └── PageEditorExample.jsx   # Example usage
├── hooks/
│   └── usePageEditor.js            # API hooks and utilities
└── components/
    └── UI/
        ├── Button.jsx              # Button component
        ├── Card.jsx                # Card component
        └── Input.jsx               # Input component
```

## Usage

### Basic Implementation

```jsx
import PageEditor from './pages/dashboard/PageEditor';

const App = () => {
  return (
    <div className="App">
      <PageEditor />
    </div>
  );
};
```

### Expected Data Format

The editor expects an array of components with this structure:

```javascript
[
  {
    "id": "unique-id",                    // Unique identifier
    "componentType": "PayrollHeroSection", // Component type
    "componentName": "Payroll Hero Section", // Display name
    "contentJson": "{...}",               // JSON string of content
    "orderIndex": 0                       // Order position
  }
]
```

### Content JSON Examples

#### Hero Section
```json
{
  "title": "Your Amazing Title",
  "subtitle": "A compelling subtitle",
  "description": "Detailed description text",
  "ctaButton": {
    "text": "Get Started",
    "link": "/signup",
    "variant": "primary"
  },
  "backgroundImage": "/images/hero-bg.jpg"
}
```

#### Service Grid
```json
{
  "title": "Our Services",
  "subtitle": "What we offer",
  "description": "Service description",
  "services": [
    {
      "name": "Consulting",
      "description": "Expert advice",
      "icon": "💼",
      "link": "/services/consulting"
    }
  ]
}
```

#### HR Modules
```json
{
  "title": "HR Modules",
  "subtitle": "Management tools",
  "description": "HR description",
  "features": [
    {
      "title": "Employee Management",
      "description": "Manage employees",
      "icon": "👥"
    }
  ]
}
```

## API Integration

### Setting up API endpoints

Update the `usePageEditor.js` hook to connect to your backend:

```javascript
// In src/hooks/usePageEditor.js

const fetchPageData = async (pageId) => {
  const response = await fetch(`/api/pages/${pageId}/components`);
  return response.json();
};

const saveComponent = async (componentId, componentData) => {
  const response = await fetch(`/api/components/${componentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(componentData),
  });
  return response.json();
};
```

### Backend API Requirements

Your backend should support these endpoints:

- `GET /api/pages/{pageId}/components` - Fetch page components
- `PUT /api/components/{componentId}` - Save individual component
- `PUT /api/pages/{pageId}/components` - Save all components
- `PUT /api/pages/{pageId}/reorder` - Reorder components

## Customization

### Adding New Component Types

1. **Add component preview** in the `PreviewPanel` component:

```jsx
case 'YourNewComponent':
  return (
    <div className={baseClasses}>
      {/* Your preview JSX */}
    </div>
  );
```

2. **Add component configuration** in `usePageEditor.js`:

```javascript
export const componentTypeConfigs = {
  YourNewComponent: {
    displayName: 'Your Component',
    fields: {
      title: { type: 'text', required: true },
      // ... more fields
    }
  }
};
```

### Styling Customization

The editor uses Tailwind classes. Key customization points:

- **Colors**: Update `bg-gray-900`, `bg-gray-800` for different themes
- **Spacing**: Modify `p-6`, `gap-4` for different layouts
- **Animations**: Adjust `framer-motion` configurations
- **Responsive**: Update breakpoints (`md:`, `lg:`, etc.)

### Form Field Types

The dynamic form system supports:

- `text` - Text input
- `textarea` - Multi-line text
- `email` - Email input
- `url` - URL input
- `number` - Number input
- `select` - Dropdown select
- `array` - Dynamic array of items
- `object` - Nested object fields

## Best Practices

### Performance
- **Debounced saves**: Auto-save is debounced to prevent excessive API calls
- **Lazy loading**: Consider lazy loading for large component lists
- **Memoization**: Use `React.memo` for component cards if needed

### UX Guidelines
- **Visual feedback**: Always show loading/saving states
- **Error handling**: Provide clear error messages
- **Validation**: Validate data before saving
- **Keyboard shortcuts**: Consider adding common shortcuts

### Data Management
- **Backup**: Implement automatic backups
- **Version control**: Consider versioning for component changes
- **Conflict resolution**: Handle concurrent editing scenarios

## Troubleshooting

### Common Issues

1. **Components not dragging**
   - Ensure `@dnd-kit` packages are properly installed
   - Check that drag sensors are configured correctly

2. **Form fields not updating**
   - Verify the `contentJson` is valid JSON
   - Check that field paths are correct in `setValueAtPath`

3. **Preview not updating**
   - Ensure component types match in the preview switch statement
   - Check that `contentJson` is being parsed correctly

4. **Save not working**
   - Verify API endpoints are configured correctly
   - Check network requests in browser dev tools

### Debug Mode

Enable debug logging by adding this to your component:

```javascript
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('Components:', components);
  console.log('Changed components:', changedComponents);
}
```

## Dependencies

Required packages:
- `@dnd-kit/core` - Drag and drop functionality
- `@dnd-kit/sortable` - Sortable list support
- `@dnd-kit/utilities` - DnD utilities
- `framer-motion` - Animations
- `@heroicons/react` - Icons
- `react`, `react-dom` - React framework

## Contributing

When adding features:

1. Follow the existing code style
2. Add TypeScript types if using TypeScript
3. Update this documentation
4. Add tests for new functionality
5. Ensure accessibility compliance

## License

This component is part of your project and follows your project's license.