# Templates Dashboard

A modern, comprehensive dashboard for browsing and managing all shared/reusable components across your Bellatrix project.

## Overview

The Templates Dashboard provides a centralized view of all your reusable components, organized by categories with modern search, filtering, and preview capabilities.

## Features

### 🎯 **Component Discovery**
- **Automatic Scanning**: Discovers all shared components across your project
- **Smart Categorization**: Organizes components into logical categories
- **Usage Tracking**: Shows where each component is being used
- **Version Tracking**: Displays component versions and last modified dates

### 🔍 **Search & Filtering**
- **Full-text Search**: Search by component name, description, tags, or author
- **Category Filtering**: Filter by component categories (Hero Sections, Cards, Layout, etc.)
- **Status Filtering**: Filter by component status (active, deprecated, etc.)
- **Advanced Sorting**: Sort by name, date, category, or version

### 📱 **Modern Interface**
- **Grid/List Views**: Toggle between grid cards and compact list view
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Smooth Animations**: Framer Motion animations for smooth interactions
- **Interactive Previews**: Hover effects and detailed component previews

### 🎨 **Component Categories**

1. **Hero Sections**
   - Main Hero Section (Homepage)
   - Services Hero Section (Implementation, Training, etc.)
   - Solution Hero Section (HR, Payroll)
   - Industry Hero Section (Retail, Manufacturing)

2. **Cards & Features**
   - Feature Cards (Grid/List layouts)
   - Service Cards (Professional showcase)

3. **Layout & Navigation**
   - Navigation Bar (Responsive with dropdowns)
   - Footer Section (Multi-column with links)

4. **Content Sections**
   - About Sections (Values, Team, Mission, Journey)
   - Testimonials Section (Carousel/Grid views)
   - FAQ Sections (Accordion style)

5. **Forms & Interaction**
   - Contact Form (Multi-purpose with validation)
   - Modal Components (Demo, Contact, Confirmation)

6. **Dashboard & Admin**
   - Dashboard Cards (Stats, charts, widgets)
   - Data Tables (Sortable with filtering)

7. **UI Elements**
   - Button Components (Comprehensive variant system)
   - Input Components (Forms with validation)

8. **Marketing & CTA**
   - Call-to-Action Sections (Various conversion designs)

## Usage

### Accessing the Dashboard

1. Navigate to the admin dashboard: `http://localhost:5176/admin`
2. Click on "Templates" in the sidebar
3. Browse your component library

### Component Information

Each component card displays:
- **Component Name & Category**
- **Description & Variations**
- **Usage Information** (which pages use it)
- **Author & Version Info**
- **Last Modified Date**
- **Status Badge** (Active/Deprecated)

### Actions Available

- **👁️ View**: Preview component details and usage
- **✏️ Edit**: Navigate to component editor (customizable)
- **📋 Duplicate**: Create a copy of the component

### Search & Filter

- **Search Bar**: Type to search across all component metadata
- **Category Dropdown**: Filter by specific categories
- **Sort Options**: Order by date, name, category, or version
- **View Toggle**: Switch between grid and list layouts

## Technical Details

### File Structure

```
src/
├── pages/Templates/
│   └── TemplatesDashboard.jsx     # Main dashboard component
├── utils/
│   └── componentDiscovery.js      # Component discovery utility
└── components/UI/
    └── components.jsx             # Reusable UI components
```

### Component Discovery

The dashboard uses a smart discovery system that catalogs:
- Component locations and paths
- Usage patterns across pages
- Component variations and themes
- Dependencies and relationships

### Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoint Aware**: Adapts to different screen sizes
- **Touch Friendly**: Large touch targets and gestures

## Customization

### Adding New Components

To add a new component to the dashboard:

1. Edit `src/utils/componentDiscovery.js`
2. Add your component to the `getSharedComponents()` function
3. Include metadata: name, category, description, variations, etc.

### Custom Categories

Add new categories in the `getComponentCategories()` function:

```javascript
{
  value: 'new-category',
  label: 'New Category',
  count: 0
}
```

### Component Actions

Customize component actions by modifying the handlers in `TemplatesDashboard.jsx`:

- `handleViewComponent()`: Preview functionality
- `handleEditComponent()`: Edit navigation
- `handleDuplicateComponent()`: Duplication logic

## Integration

### Admin Dashboard

The Templates Dashboard is integrated into the main admin system:
- Route: `/admin/templates`
- Navigation: Accessible via admin sidebar
- Permissions: Uses existing admin authentication

### Future Enhancements

- **Live Preview**: Real-time component rendering
- **Code Export**: Export component code and dependencies
- **Usage Analytics**: Track component usage patterns
- **Collaborative Features**: Comments and annotations
- **Version Control**: Track component changes over time

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance

- **Lazy Loading**: Components load on demand
- **Virtual Scrolling**: Handles large component lists
- **Optimized Renders**: React.memo and useMemo optimization
- **Image Optimization**: Responsive images with proper sizing

---

*Built with React, Tailwind CSS, and Framer Motion*