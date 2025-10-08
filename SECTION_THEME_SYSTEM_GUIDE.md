# Section-Level Theme System Implementation Guide

## 🎯 Overview

This implementation provides a comprehensive section-level theme system that synchronizes the Navbar with individual component themes. Each component can have its own theme (light or dark), and the Navbar automatically adapts its logo and styling based on the currently visible section.

## 🏗️ Architecture

### 1. **Component Theme Mapping**
- **API Data**: Each component from `http://bellatrix.runasp.net/api/Pages/{pageId}/components` includes:
  ```json
  {
    "theme": 1,  // Light theme
    "theme": 2   // Dark theme
  }
  ```

- **Theme Attribute Mapping**:
  - `theme: 1` → `data-theme="light"`
  - `theme: 2` → `data-theme="dark"`

### 2. **Section Wrapper Implementation**

#### Public Pages (`DynamicPageRenderer.jsx`)
```jsx
// Each component is wrapped in a section with theme attribute
<section data-theme={mapThemeValue(section.theme)}>
  <Component {...props} />
</section>
```

#### Admin Preview (`PagePreview.jsx`)
```jsx
// Admin preview also includes theme attributes for testing
<section data-theme={mapThemeValue(component.theme)}>
  <Component {...props} />
</section>
```

### 3. **Navbar Theme Detection**

The `Navbar.jsx` uses an enhanced detection system:

```jsx
import { setupSectionThemeDetection } from "../utils/sectionThemeDetection";

useEffect(() => {
  const cleanup = setupSectionThemeDetection((newTheme) => {
    setNavbarTheme(newTheme);
  }, 60); // 60px navbar height

  return cleanup;
}, []);
```

### 4. **Logo Switching Logic**

The Navbar automatically switches logos based on the detected theme:

```jsx
<AnimatePresence mode="wait">
  {navbarTheme === "light" ? (
    <motion.img
      key="logoThree"
      src="/images/logoThree.png" // Light logo
      alt="Bellatrix Logo Three"
      // Smooth transitions...
    />
  ) : scrolled ? (
    <motion.img
      key="logoTwo"
      src="/images/logoTwo.png" // Dark scrolled logo
      alt="Bellatrix Logo Two"
      // Smooth transitions...
    />
  ) : (
    <motion.img
      key="logoOne"
      src="/images/logoOne.png" // Dark initial logo
      alt="Bellatrix Logo One"
      // Smooth transitions...
    />
  )}
</AnimatePresence>
```

## 🔧 Implementation Details

### Files Modified

1. **`src/components/DynamicPageRenderer.jsx`**
   - Added section wrapper with `data-theme` attribute
   - Integrated theme value mapping utility

2. **`src/components/Admin/PagePreview.jsx`**
   - Added section wrapper for admin preview consistency
   - Ensures theme detection works in edit mode

3. **`src/components/Navbar.jsx`**
   - Enhanced theme detection with improved utility
   - Maintained existing logo switching animations

4. **`src/utils/sectionThemeDetection.js`** (NEW)
   - Comprehensive theme detection utility
   - Scroll and mutation observers
   - Mode detection helpers

### Key Features

#### 🎨 **Automatic Theme Detection**
- Uses intersection detection to find visible sections
- 60px offset for navbar height consideration
- Smooth transitions between themes

#### 🔄 **Dynamic Content Support**
- MutationObserver detects new sections
- Handles component additions/removals
- Real-time theme updates

#### 📱 **Responsive Design**
- Works on all screen sizes
- Handles window resize events
- Optimized performance

#### 🛠️ **Admin Compatibility**
- Functions in both edit and view modes
- Preserves admin interface functionality
- Debug-friendly implementation

## 🚀 Usage Examples

### Setting Component Theme in API
```json
{
  "id": 1,
  "componentType": "HeroSection",
  "theme": 1,  // Light theme
  "contentJson": "...",
  // other properties
}
```

### Testing Theme Switching
1. Create a page with components having different themes
2. Navigate to the public page
3. Scroll between sections
4. Observe navbar logo changes automatically

### Utility Functions
```javascript
import { 
  mapThemeValue, 
  isEditMode, 
  isViewMode 
} from "../utils/sectionThemeDetection";

// Convert theme value
const themeString = mapThemeValue(1); // "light"
const themeString = mapThemeValue(2); // "dark"

// Mode detection
const inEditMode = isEditMode(); // true if admin/edit
const inViewMode = isViewMode(); // true if public view
```

## 🧪 Testing

### Manual Testing
1. **Open** `test-section-theme-system.html` in browser
2. **Scroll** through sections with different themes
3. **Observe** navbar background and theme indicator changes

### Integration Testing
1. **Create** a page with mixed light/dark components
2. **Preview** in admin interface
3. **Publish** and view public page
4. **Verify** theme synchronization works in both modes

## 🎭 Visual Behavior

### Light Section Active
- Navbar shows light logo (`logoThree.png`)
- Navbar adapts to light theme styling
- Smooth fade transition (0.25s)

### Dark Section Active
- **Not Scrolled**: Shows `logoOne.png` (initial dark logo)
- **Scrolled**: Shows `logoTwo.png` (scrolled dark logo)
- Navbar adapts to dark theme styling
- Smooth fade transition (0.25s)

## 🔧 Configuration

### Navbar Height
Default: 60px
```javascript
setupSectionThemeDetection(callback, 60);
```

### Detection Offset
Default: 10px buffer below navbar
```javascript
const checkY = navbarHeight + 10;
```

### Theme Default
Default: "dark" when no sections detected
```javascript
let foundTheme = "dark";
```

## 🚨 Important Notes

1. **Performance**: Uses optimized intersection detection
2. **Compatibility**: Works with existing codebase without breaking changes  
3. **Fallbacks**: Graceful fallback to dark theme if no sections found
4. **Memory**: Proper cleanup prevents memory leaks
5. **Accessibility**: Maintains smooth transitions for better UX

## 🎉 Result

✅ Each section gets its own theme attribute  
✅ Navbar updates logo automatically when scrolling  
✅ Works seamlessly with dynamic component additions  
✅ Maintains smooth transitions and visual contrast  
✅ Compatible with both edit and view modes  
✅ Performance optimized with proper cleanup