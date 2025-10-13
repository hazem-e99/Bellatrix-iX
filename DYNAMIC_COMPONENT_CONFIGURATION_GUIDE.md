# Dynamic Component Configuration System

## Overview

The Dynamic Component Configuration panel has been enhanced to automatically generate input fields based on the component's data structure, eliminating the need for static placeholders like "Title", "Description", and "Content".

## Key Features

✅ **Automatic Schema Generation**: Analyzes component data and creates appropriate form fields
✅ **Smart Field Type Detection**: Detects text, textarea, checkbox, number, email, URL, media, array, and object fields
✅ **Real-time Updates**: Changes in the configuration panel update the preview immediately
✅ **Nested Object Support**: Handles complex nested data structures
✅ **Array Management**: Dynamic array fields with add/remove/reorder capabilities
✅ **Media Field Types**: Specialized inputs for images and videos with previews

## How It Works

### 1. Schema Generation Process

When a component is selected in the Component Configuration panel, the system:

1. **Checks for predefined schema** - First looks for existing component schemas
2. **Analyzes existing data** - If no schema exists, analyzes the component's `contentJson`
3. **Generates dynamic schema** - Creates form fields based on data structure and types
4. **Renders appropriate inputs** - Uses the DynamicFormGenerator to create the UI

### 2. Field Type Detection

The system automatically detects field types based on:

- **Key names**: `email`, `image`, `video`, `url`, `description`, `color`, etc.
- **Data types**: `string`, `number`, `boolean`, `array`, `object`
- **Content patterns**: URLs, email addresses, hex colors, file extensions
- **Value length**: Long strings become textareas

### 3. Field Type Examples

| Data Type                           | Example Value            | Generated Field Type |
| ----------------------------------- | ------------------------ | -------------------- |
| `title: "Welcome"`                  | Text Input               |
| `description: "Long text..."`       | Textarea                 |
| `isActive: true`                    | Checkbox                 |
| `maxCount: 10`                      | Number Input             |
| `email: "user@example.com"`         | Email Input              |
| `website: "https://example.com"`    | URL Input                |
| `primaryColor: "#ff6b35"`           | Color Picker             |
| `backgroundImage: "/images/bg.jpg"` | Image Input with Preview |
| `heroVideo: "/videos/intro.mp4"`    | Video Input              |
| `tags: ["tag1", "tag2"]`            | Array Field              |
| `settings: { theme: "dark" }`       | Object Field (nested)    |

## Implementation Details

### Core Files

1. **`/src/utils/dynamicSchemaGenerator.js`** - Main utility for schema generation
2. **`/src/components/Admin/EnhancedPageBuilder.jsx`** - Updated to use dynamic schemas
3. **`/src/components/UI/DynamicFormGenerator.jsx`** - Enhanced with new field types

### Key Functions

```javascript
// Generate schema from component data
const schema = generateDynamicSchema(componentData, componentType);

// Detect field type from value and key
const fieldType = detectFieldType(value, key);

// Generate human-readable labels
const label = generateFieldLabel("firstName"); // → "First Name"
```

### Usage in EnhancedPageBuilder

```javascript
// Enhanced fallback logic
if (componentSchema) {
  // Use predefined schema
  return <DynamicFormGenerator schema={componentSchema} ... />;
} else {
  // Generate dynamic schema
  const existingData = JSON.parse(component.contentJson || "{}");
  const dynamicSchema = generateDynamicSchema(existingData, component.componentType);
  return <DynamicFormGenerator schema={dynamicSchema.schema} ... />;
}
```

## Example Schema Generation

### Input Component Data:

```json
{
  "title": "Meet Our Team",
  "description": "Our experts are here to help you succeed",
  "backgroundImage": "/images/team-bg.jpg",
  "showStats": true,
  "teamMembers": [
    {
      "name": "John Doe",
      "position": "CEO",
      "email": "john@example.com",
      "image": "/images/team/john.jpg"
    }
  ]
}
```

### Generated Schema:

```javascript
{
  schema: {
    type: "object",
    properties: {
      title: {
        type: "string",
        label: "Title",
        formField: "text",
        required: true,
        placeholder: "Enter title..."
      },
      description: {
        type: "string",
        label: "Description",
        formField: "textarea",
        placeholder: "Enter description..."
      },
      backgroundImage: {
        type: "string",
        label: "Background Image",
        formField: "media-image",
        placeholder: "/images/example.jpg"
      },
      showStats: {
        type: "boolean",
        label: "Show Stats",
        formField: "checkbox"
      },
      teamMembers: {
        type: "array",
        label: "Team Members",
        formField: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", label: "Name", formField: "text" },
            position: { type: "string", label: "Position", formField: "text" },
            email: { type: "string", label: "Email", formField: "email" },
            image: { type: "string", label: "Image", formField: "media-image" }
          }
        }
      }
    }
  }
}
```

## Benefits

1. **No More Static Fields**: Every component shows its actual editable properties
2. **Type-Safe Inputs**: Appropriate input types prevent data entry errors
3. **Better UX**: Users see exactly what they can edit for each component
4. **Extensible**: New component types work automatically without schema definitions
5. **Consistent**: All components use the same dynamic configuration system

## Testing the System

1. **Navigate to**: `/admin/pages/enhanced-create`
2. **Add any component** to the page
3. **Check Component Configuration panel** - it now shows dynamic fields based on the component's data structure
4. **Edit field values** - changes update the preview in real-time
5. **Add components without predefined schemas** - they automatically generate appropriate form fields

## Future Enhancements

- **Field validation** based on detected types
- **Conditional fields** that show/hide based on other field values
- **Field grouping** for better organization of complex forms
- **Custom field type plugins** for specialized input requirements
- **Schema caching** to improve performance for frequently used components
