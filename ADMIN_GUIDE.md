# Bellatrix Admin Dashboard

## Overview
A comprehensive admin dashboard for managing your Bellatrix website content. Built with React, MUI, and Tailwind CSS, featuring a modern interface with drag-and-drop functionality.

## Features

### ✅ Completed Features

1. **Admin Dashboard Layout**
   - Responsive sidebar navigation
   - Modern header with user menu
   - Dashboard overview with statistics
   - Quick action buttons

2. **Page Management**
   - View all pages from JSON data files
   - Create new pages with templates
   - Edit existing pages
   - Duplicate pages
   - SEO settings per page
   - Status management (Draft/Published)

3. **Section Management**
   - Drag-and-drop section reordering
   - Add sections from template library
   - Edit section content with dynamic forms
   - Real-time JSON preview
   - Support for complex nested data

4. **Template System**
   - Page templates (Landing, Service, About)
   - Section templates (Hero, Features, Testimonials, etc.)
   - Template creation and editing
   - Field configuration

5. **Settings Management**
   - General site settings
   - API configuration
   - UI preferences
   - SEO defaults
   - Data file management

6. **Data Management**
   - Context API for state management
   - Mock API with full CRUD operations
   - Automatic JSON file mapping
   - Real-time data updates

## Getting Started

### Access the Admin Dashboard
1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:5175/admin`

### Main Navigation
- **Dashboard**: Overview and quick stats
- **Pages**: Manage all website pages
- **Templates**: Create and edit templates
- **Settings**: Configure system settings

## Usage Guide

### Managing Pages

1. **View Pages**
   - Go to `/admin/pages`
   - See all pages generated from JSON files
   - View page status, sections count, and last modified date

2. **Create New Page**
   - Click "New Page" button
   - Enter page details (name, template, SEO)
   - Save to create new JSON file

3. **Edit Page Sections**
   - Click "Edit" on any page
   - Use drag-and-drop to reorder sections
   - Add new sections from template library
   - Edit section content with dynamic forms

### Working with Templates

1. **Page Templates**
   - Pre-built layouts for different page types
   - Configure sections and fields
   - Reusable across multiple pages

2. **Section Templates**
   - Individual components (Hero, Features, etc.)
   - Configurable fields and content
   - Drag-and-drop into pages

### Section Editor Features

- **Dynamic Form Generation**: Automatically creates forms based on JSON structure
- **Nested Object Support**: Edit complex nested data structures
- **Array Management**: Add/remove items from arrays
- **Real-time Preview**: See JSON changes instantly
- **Type Detection**: Automatically handles strings, objects, arrays

## Technical Architecture

### File Structure
```
src/
├── components/Admin/
│   ├── AdminLayout.jsx      # Main layout with sidebar
│   ├── PageManager.jsx      # Page CRUD operations
│   ├── SectionBuilder.jsx   # Drag-and-drop section editor
│   ├── SectionEditor.jsx    # Dynamic form for section content
│   ├── TemplateManager.jsx  # Template CRUD operations
│   └── SettingsManager.jsx  # System settings
├── contexts/
│   └── AdminContext.jsx     # Global state management
├── hooks/
│   └── useAdmin.js          # Admin context hook
└── pages/Admin/
    └── AdminDashboard.jsx   # Main dashboard component
```

### Data Flow
1. **AdminContext** provides global state and API functions
2. **Mock API** simulates backend operations
3. **Components** use context for data operations
4. **Real-time updates** through React state management

### State Management
- **Context API** for global admin state
- **Local state** for component-specific data
- **Mock API** functions for CRUD operations
- **Automatic data persistence** simulation

## API Functions

### Pages
- `api.fetchPages()` - Load all pages
- `api.createPage(data)` - Create new page
- `api.updatePage(id, data)` - Update existing page
- `api.deletePage(id)` - Delete page
- `api.fetchPageData(fileName)` - Load JSON data

### Templates
- `api.fetchTemplates()` - Load all templates
- `api.createTemplate(data)` - Create new template
- `api.updateTemplate(id, data)` - Update template
- `api.deleteTemplate(id)` - Delete template

### Files
- `api.saveDataFile(fileName, data)` - Save JSON file
- `api.createDataFile(fileName, data)` - Create new file
- `api.deleteDataFile(fileName)` - Delete file

## Extending the System

### Adding New Section Templates
1. Go to Templates management
2. Create new section template
3. Define fields and structure
4. Use in Section Builder

### Adding Custom Field Types
1. Modify `SectionEditor.jsx`
2. Add new field rendering logic
3. Update form handling

### Integrating with Real Backend
1. Replace mock API functions in `AdminContext.jsx`
2. Update API calls to use real endpoints
3. Add authentication/authorization
4. Handle file uploads and storage

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Features
- **Lazy loading** for large data sets
- **Optimized re-renders** with React memo
- **Efficient drag-and-drop** with @dnd-kit
- **Responsive design** for all screen sizes

## Security Notes
This is a frontend-only implementation with mock APIs. For production:
- Add authentication and authorization
- Implement server-side validation
- Use secure API endpoints
- Add input sanitization
- Implement role-based access control

## Troubleshooting

### Common Issues
1. **Import errors**: Check file paths and component exports
2. **State not updating**: Verify context provider wrapping
3. **Drag-and-drop not working**: Ensure @dnd-kit dependencies are installed
4. **Styling issues**: Check Tailwind CSS configuration

### Development Tips
- Use React DevTools for debugging
- Check browser console for errors
- Verify JSON data structure matches expected format
- Test responsive design on different screen sizes

## Future Enhancements
- Real-time collaboration
- Version control for content
- Advanced permissions system
- Content scheduling
- Multi-language support
- Advanced analytics dashboard
- Backup and restore functionality