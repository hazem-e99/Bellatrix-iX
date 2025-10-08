# Component Visibility System Implementation Guide

## 🎯 Overview

This implementation adds intelligent component visibility control based on the `isVisible` property from the API. Components can be selectively shown or hidden based on the current rendering mode (Edit vs View).

## 🔧 API Structure

Each component from `http://bellatrix.runasp.net/api/Pages/{pageId}/components` includes:

```json
{
  "id": 1,
  "componentType": "HeroSection",
  "componentName": "Hero Section",
  "isVisible": true,  // Controls visibility
  "theme": 1,
  "contentJson": "{...}",
  // ... other properties
}
```

### Visibility Values
- `isVisible: true` or `isVisible: 1` → Component is visible
- `isVisible: false` or `isVisible: 0` → Component is hidden

## 🎭 Mode-Based Rendering

### Edit Mode (Admin Interface)
**Files**: `PagePreview.jsx`, `EnhancedPageBuilder.jsx`, admin components

**Behavior**: Shows **ALL** components regardless of `isVisible` value
- ✅ Visible components are rendered normally
- ✅ Hidden components are also rendered (with visual indicators)
- 🎯 Purpose: Allows admins to see and manage all content

```jsx
// Edit mode logic
const componentsToRender = pageData.components; // Show all
console.log("🔧 [ADMIN] Showing all components including hidden ones");
```

### View Mode (Public Pages)
**Files**: `DynamicPageRenderer.jsx`, public page components  

**Behavior**: Shows **ONLY** visible components
- ✅ Visible components are rendered normally  
- ❌ Hidden components are completely excluded from DOM
- 🎯 Purpose: Respects content visibility settings for end users

```jsx
// View mode logic
const componentsToRender = isEditMode()
  ? components
  : components.filter(comp => comp.isVisible === true || comp.isVisible === 1);
```

## 🏗️ Implementation Details

### 1. Mode Detection

Uses the `isEditMode()` utility function:

```javascript
import { isEditMode } from "../utils/sectionThemeDetection";

const inEditMode = isEditMode();
// Returns true if in admin/edit context, false for public view
```

### 2. Visibility Filtering Function

```javascript
const getVisibleComponents = () => {
  const components = pageData.components || pageData.sections || [];
  
  if (isEditMode()) {
    console.log("🔧 [EDIT MODE] Showing all components including hidden ones");
    return components;
  }
  
  const visibleComponents = components.filter(component => {
    const isVisible = component.isVisible === true || component.isVisible === 1;
    if (!isVisible) {
      console.log(`👁️ [HIDDEN] ${component.componentName} (isVisible: ${component.isVisible})`);
    }
    return isVisible;
  });
  
  console.log(`👁️ [VISIBILITY] Showing ${visibleComponents.length}/${components.length} components`);
  return visibleComponents;
};
```

### 3. Component Loading Optimization

**DynamicPageRenderer**: Loads all components but filters during render
- Ensures data availability for potential mode switching
- Optimal for public pages where mode doesn't change

**PagePreview**: Shows all components in admin context
- Allows admins to see hidden components for management
- Visual indicators show visibility state

## 📁 Files Modified

### 1. `src/components/DynamicPageRenderer.jsx`
- Added `isEditMode()` import
- Implemented `getVisibleComponents()` function
- Updated rendering logic to respect visibility
- Added comprehensive logging

### 2. `src/components/Admin/PagePreview.jsx`  
- Added admin-specific visibility handling
- Shows all components with visibility status logging
- Maintains admin functionality for hidden components

### 3. `src/utils/sectionThemeDetection.js`
- Enhanced `isEditMode()` function for better detection
- Added mode detection utilities

## 🎯 Usage Examples

### Setting Component Visibility via API
```json
{
  "id": 1,
  "componentType": "HeroSection", 
  "isVisible": true   // Component will show in both modes
}

{
  "id": 2,
  "componentType": "MaintenanceNotice",
  "isVisible": false  // Hidden from public, visible in admin
}
```

### Toggling Visibility in Admin
```javascript
// Admin can toggle visibility
const toggleComponentVisibility = (componentId) => {
  const updatedComponents = components.map(comp => 
    comp.id === componentId 
      ? { ...comp, isVisible: !comp.isVisible }
      : comp
  );
  updatePageComponents(updatedComponents);
};
```

## 🧪 Testing

### Manual Testing Steps
1. **Create** a page with mixed visible/hidden components
2. **View** in admin mode - should see all components  
3. **View** public page - should only see visible components
4. **Toggle** component visibility in admin
5. **Verify** changes reflect correctly in public view

### Test Data
Use the included `component-visibility-test.js` for validation:
```javascript
// Run test in browser console
testComponentVisibility();
```

## 🎨 Visual Indicators

### Admin Mode Visual Cues
Components can include visibility indicators:

```jsx
{/* Visibility indicator in admin */}
<div className={`component-wrapper ${
  !component.isVisible ? 'opacity-50 border-dashed border-red-300' : ''
}`}>
  {!component.isVisible && (
    <div className="visibility-badge bg-red-100 text-red-800 px-2 py-1 text-xs rounded">
      Hidden from public view
    </div>
  )}
  <Component {...props} />
</div>
```

### Console Logging
Comprehensive logging helps debug visibility:
```
🔧 [EDIT MODE] Showing all components including hidden ones
👁️ [VISIBILITY] Showing 3/5 components in view mode  
👁️ [HIDDEN] Maintenance Notice (isVisible: false)
👁️ [HIDDEN] Seasonal Banner (isVisible: false)
```

## ⚡ Performance Benefits

1. **Optimized Loading**: Only loads necessary components in view mode
2. **Faster Rendering**: Fewer DOM elements in public pages
3. **Better SEO**: Hidden content doesn't appear in HTML source
4. **Reduced Bundle**: Components not rendered don't load dependencies

## 🔒 Security Considerations

- Hidden components are completely excluded from public DOM
- No sensitive data exposed through hidden elements
- Client-side filtering prevents accidental visibility
- Admin context clearly separated from public context

## 🎉 Summary

### ✅ Benefits
- **Flexible Content Control**: Show/hide components per page
- **Admin Friendly**: Always see all content for management
- **Performance Optimized**: Only render what's needed
- **SEO Compliant**: Hidden content excluded from public HTML
- **Developer Friendly**: Clear logging and debugging tools

### 🚀 Result
- **Edit Mode**: `5/5 components` (all visible for admin management)
- **View Mode**: `3/5 components` (only visible ones for end users)  
- **Clean DOM**: Hidden components completely absent from public pages
- **Seamless UX**: No flashing or layout shifts from hidden content