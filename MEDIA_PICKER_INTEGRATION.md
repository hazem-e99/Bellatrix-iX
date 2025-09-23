# MediaPicker Integration Guide

This guide shows how to integrate the MediaPicker component with your Enhanced Page Builder inputs.

## Quick Start

### 1. Basic Integration

Add the `media-input` class to any input field:

```html
<input 
  type="text" 
  class="media-input"
  placeholder="Click to choose media..." 
/>
```

### 2. Advanced Configuration

Use data attributes for more control:

```html
<input 
  type="text" 
  data-media="true"
  data-media-accept="image"
  data-media-title="Choose Background Image"
  data-media-open-on-focus="true"
  placeholder="Select background image..." 
/>
```

### 3. React Integration

```jsx
import MediaPicker from './components/ui/MediaPicker';
import { useMediaInput } from './hooks/useMediaInput';

function MyPageBuilder() {
  const {
    isMediaPickerOpen,
    closeMediaPicker,
    handleMediaSelect,
    currentOptions
  } = useMediaInput({
    accept: "all",
    onSelect: (url, mediaItem, input) => {
      console.log('Media selected:', url);
      // Handle the selection
    }
  });

  return (
    <>
      {/* Your page builder inputs */}
      <input className="media-input" placeholder="Choose media..." />
      
      {/* MediaPicker Modal */}
      <MediaPicker
        isOpen={isMediaPickerOpen}
        onClose={closeMediaPicker}
        onSelect={handleMediaSelect}
        {...currentOptions}
      />
    </>
  );
}
```

## Configuration Options

### Data Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-media` | boolean | false | Enable media picker for this input |
| `data-media-accept` | string | "all" | Accepted media types: "all", "image", "video" |
| `data-media-title` | string | "Choose Media" | Modal title |
| `data-media-max-selection` | number | 1 | Maximum items to select |
| `data-media-open-on-focus` | boolean | false | Auto-open on input focus |
| `data-media-drag-drop` | boolean | true | Enable drag & drop |

### Hook Options

```js
useMediaInput({
  accept: "all",           // "all", "image", "video"
  maxSelection: 1,         // Maximum items to select
  onSelect: (url, item, input) => {}, // Selection callback
  onError: (error, input) => {}       // Error callback
})
```

## API Endpoints

The MediaPicker uses these API endpoints:

- **GET** `/api/Media` - Fetch media list
- **POST** `/api/Media/upload` - Upload new media files

### Query Parameters for GET /api/Media

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `pageSize` | number | Items per page (default: 24) |
| `type` | string | Filter by type: "image", "video" |
| `searchTerm` | string | Search in filenames |
| `role` | string | Filter by media role |

### Expected Response Format

```json
{
  "data": [
    {
      "id": 1,
      "fileUrl": "/uploads/image/example.jpg",
      "fileName": "example.jpg",
      "contentType": "image/jpeg",
      "fileSize": 1024000,
      "role": "hero",
      "createdAt": "2025-09-23T10:00:00Z"
    }
  ],
  "count": 1,
  "success": true,
  "message": "Success"
}
```

## URL Building

The component automatically builds full URLs from the API's `fileUrl`:

```js
// API returns: fileUrl: "/uploads/image/example.jpg"
// Component builds: "http://bellatrix.runasp.net/uploads/image/example.jpg"
```

## Input Value Structure

When media is selected, the input gets:

- `value`: Full URL for use in `<img src>` or `<video src>`
- `data-file-url`: Original fileUrl from API
- `data-media-id`: Media item ID

```html
<input 
  value="http://bellatrix.runasp.net/uploads/image/example.jpg"
  data-file-url="/uploads/image/example.jpg"
  data-media-id="123"
/>
```

## Preview Updates

The component automatically creates preview elements next to inputs:

- **Images**: `<img>` with the selected image
- **Videos**: `<video controls>` with the selected video
- **Other files**: File info card with name, type, size

## Error Handling

The MediaPicker handles these error scenarios:

- Network failures
- Authentication errors
- Invalid file types
- Upload failures
- Missing media

Errors are shown as toast notifications and logged to console.

## Styling

The MediaPicker uses Tailwind CSS classes. Key elements:

- `.media-input-wrapper`: Container for input + browse button
- `.media-preview`: Container for media previews
- `.drag-over`: Applied during drag & drop

## Browser Support

- Modern browsers with ES6+ support
- File API for uploads
- Drag & drop API
- Intersection Observer for infinite scroll

## Performance Considerations

- Lazy loading for images
- Pagination for large media libraries
- Debounced search
- Request caching
- Thumbnail generation (backend dependent)

## Accessibility

- Keyboard navigation (Tab, Arrow keys, Esc)
- Screen reader support
- Focus management
- ARIA labels
- Color contrast compliance

## Troubleshooting

### Common Issues

1. **Modal doesn't open**: Check if `useMediaInput` hook is properly initialized
2. **No media shown**: Verify API endpoint and authentication
3. **Upload fails**: Check file size limits and supported formats
4. **Styling issues**: Ensure Tailwind CSS is loaded

### Debug Steps

1. Open browser dev tools
2. Check console for errors
3. Verify network requests in Network tab
4. Check if inputs have correct classes/attributes

## Example Implementation

See `src/components/examples/MediaPickerExample.jsx` for complete examples of all integration patterns.