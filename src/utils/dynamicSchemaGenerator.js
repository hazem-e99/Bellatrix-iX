/**
 * Dynamic Schema Generator Utility
 * Automatically generates component schemas based on existing data structure
 * This enables the Component Configuration panel to be truly dynamic
 */

/**
 * Analyzes a value and determines the appropriate field type
 * @param {any} value - The value to analyze
 * @param {string} key - The field key for context
 * @returns {string} - The field type
 */
export const detectFieldType = (value, key) => {
  const keyLower = key.toLowerCase();

  // URL/Media detection
  if (typeof value === "string") {
    // Video files
    if (
      keyLower.includes("video") ||
      value.includes(".mp4") ||
      value.includes(".webm") ||
      value.includes(".ogg")
    ) {
      return "media-video";
    }
    // Image files
    if (
      keyLower.includes("image") ||
      keyLower.includes("img") ||
      keyLower.includes("photo") ||
      keyLower.includes("avatar") ||
      value.includes(".jpg") ||
      value.includes(".jpeg") ||
      value.includes(".png") ||
      value.includes(".gif") ||
      value.includes(".webp") ||
      value.includes(".svg")
    ) {
      return "media-image";
    }
    // URLs/Links
    if (
      keyLower.includes("url") ||
      keyLower.includes("link") ||
      keyLower.includes("href") ||
      value.startsWith("http") ||
      value.startsWith("/") ||
      value.startsWith("#")
    ) {
      return "url";
    }
    // Long text content (description, content, etc.)
    if (
      keyLower.includes("description") ||
      keyLower.includes("content") ||
      keyLower.includes("text") ||
      keyLower.includes("bio") ||
      keyLower.includes("summary") ||
      value.length > 100
    ) {
      return "textarea";
    }
    // Color values
    if (
      keyLower.includes("color") ||
      keyLower.includes("background") ||
      /^#[0-9A-F]{6}$/i.test(value) ||
      /^rgb\(/.test(value) ||
      /^rgba\(/.test(value)
    ) {
      return "color";
    }
    // Email
    if (
      keyLower.includes("email") ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      return "email";
    }
    // Default string
    return "text";
  }

  // Boolean values
  if (typeof value === "boolean") {
    return "checkbox";
  }

  // Number values
  if (typeof value === "number") {
    return "number";
  }

  // Array values
  if (Array.isArray(value)) {
    return "array";
  }

  // Object values
  if (typeof value === "object" && value !== null) {
    return "object";
  }

  // Default fallback
  return "text";
};

/**
 * Generates a human-readable label from a field key
 * @param {string} key - The field key
 * @returns {string} - The formatted label
 */
export const generateFieldLabel = (key) => {
  return (
    key
      // Split camelCase and PascalCase
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Split words separated by underscores or hyphens
      .replace(/[_-]/g, " ")
      // Capitalize first letter of each word
      .replace(/\b\w/g, (char) => char.toUpperCase())
      // Handle common abbreviations
      .replace(/\bUrl\b/g, "URL")
      .replace(/\bApi\b/g, "API")
      .replace(/\bHtml\b/g, "HTML")
      .replace(/\bCss\b/g, "CSS")
      .replace(/\bId\b/g, "ID")
      .replace(/\bCta\b/g, "CTA")
      .replace(/\bSeo\b/g, "SEO")
      .replace(/\bHr\b/g, "HR")
  );
};

/**
 * Generates a placeholder text for a field
 * @param {string} key - The field key
 * @param {string} fieldType - The field type
 * @returns {string} - The placeholder text
 */
export const generatePlaceholder = (key, fieldType) => {
  const keyLower = key.toLowerCase();

  switch (fieldType) {
    case "text":
      if (keyLower.includes("title")) return "Enter title...";
      if (keyLower.includes("name")) return "Enter name...";
      if (keyLower.includes("label")) return "Enter label...";
      return `Enter ${generateFieldLabel(key).toLowerCase()}...`;

    case "textarea":
      return `Enter ${generateFieldLabel(key).toLowerCase()}...`;

    case "email":
      return "Enter email address...";

    case "url":
      if (keyLower.includes("image") || keyLower.includes("img"))
        return "/images/example.jpg";
      if (keyLower.includes("video")) return "/videos/example.mp4";
      if (keyLower.includes("link")) return "https://example.com or /page-url";
      return "https://example.com or /page-url";

    case "media-image":
      return "/images/example.jpg";

    case "media-video":
      return "/videos/example.mp4";

    case "color":
      return "#000000";

    case "number":
      return "Enter number...";

    default:
      return `Enter ${generateFieldLabel(key).toLowerCase()}...`;
  }
};

/**
 * Generates a schema for an array field based on its items
 * @param {Array} arrayValue - The array to analyze
 * @param {string} key - The field key
 * @returns {Object} - The array schema
 */
export const generateArraySchema = (arrayValue, key) => {
  if (!Array.isArray(arrayValue) || arrayValue.length === 0) {
    return {
      type: "array",
      label: generateFieldLabel(key),
      items: {
        type: "object",
        properties: {
          id: { type: "string", label: "ID", formField: "text" },
          title: { type: "string", label: "Title", formField: "text" },
          description: {
            type: "string",
            label: "Description",
            formField: "textarea",
          },
        },
      },
      formField: "array",
    };
  }

  // Analyze the first item to determine structure
  const firstItem = arrayValue[0];

  if (typeof firstItem === "string") {
    return {
      type: "array",
      label: generateFieldLabel(key),
      items: {
        type: "string",
        formField: "text",
      },
      formField: "array",
    };
  }

  if (typeof firstItem === "object" && firstItem !== null) {
    const properties = {};

    // Analyze all properties from all items to get complete schema
    arrayValue.forEach((item) => {
      if (typeof item === "object" && item !== null) {
        Object.keys(item).forEach((itemKey) => {
          if (!properties[itemKey]) {
            const fieldType = detectFieldType(item[itemKey], itemKey);
            properties[itemKey] = {
              type: typeof item[itemKey],
              label: generateFieldLabel(itemKey),
              placeholder: generatePlaceholder(itemKey, fieldType),
              formField: fieldType,
            };
          }
        });
      }
    });

    return {
      type: "array",
      label: generateFieldLabel(key),
      items: {
        type: "object",
        properties,
      },
      formField: "array",
    };
  }

  // Fallback for primitive arrays
  return {
    type: "array",
    label: generateFieldLabel(key),
    items: {
      type: typeof firstItem,
      formField: detectFieldType(firstItem, key),
      // Add safety properties for undefined items
      ...(typeof firstItem === "object" && firstItem !== null ? {
        properties: {
          id: { type: "string", label: "ID", formField: "text" },
          title: { type: "string", label: "Title", formField: "text" },
          description: { type: "string", label: "Description", formField: "textarea" }
        }
      } : {})
    },
    formField: "array",
  };
};

/**
 * Generates a schema for an object field based on its properties
 * @param {Object} objectValue - The object to analyze
 * @param {string} key - The field key
 * @returns {Object} - The object schema
 */
export const generateObjectSchema = (objectValue, key) => {
  if (!objectValue || typeof objectValue !== "object") {
    return {
      type: "object",
      label: generateFieldLabel(key),
      properties: {},
      formField: "object",
    };
  }

  const properties = {};

  Object.keys(objectValue).forEach((objKey) => {
    const value = objectValue[objKey];
    const fieldType = detectFieldType(value, objKey);

    if (Array.isArray(value)) {
      properties[objKey] = generateArraySchema(value, objKey);
    } else if (typeof value === "object" && value !== null) {
      properties[objKey] = generateObjectSchema(value, objKey);
    } else {
      properties[objKey] = {
        type: typeof value,
        label: generateFieldLabel(objKey),
        placeholder: generatePlaceholder(objKey, fieldType),
        required: false,
        formField: fieldType,
      };
    }
  });

  return {
    type: "object",
    label: generateFieldLabel(key),
    properties,
    formField: "object",
  };
};

/**
 * Main function to generate a complete schema from component data
 * @param {Object} componentData - The component data to analyze
 * @param {string} componentType - The component type for context
 * @returns {Object} - The generated schema
 */
export const generateDynamicSchema = (
  componentData,
  componentType = "Generic"
) => {
  if (!componentData || typeof componentData !== "object") {
    // Return basic schema for empty/invalid data
    return {
      componentName: componentType,
      category: "dynamic",
      icon: "📄",
      displayName: componentType.replace(/([A-Z])/g, " $1").trim(),
      description: `Dynamically generated schema for ${componentType}`,
      schema: {
        type: "object",
        properties: {
          title: {
            type: "string",
            label: "Title",
            placeholder: "Enter title...",
            required: true,
            formField: "text",
          },
          description: {
            type: "string",
            label: "Description",
            placeholder: "Enter description...",
            required: false,
            formField: "textarea",
          },
          content: {
            type: "string",
            label: "Content",
            placeholder: "Enter content...",
            required: false,
            formField: "textarea",
          },
        },
      },
      defaultData: {
        title: "",
        description: "",
        content: "",
      },
    };
  }

  const properties = {};

  // Analyze each property in the component data
  Object.keys(componentData).forEach((key) => {
    const value = componentData[key];
    const fieldType = detectFieldType(value, key);

    if (Array.isArray(value)) {
      const arraySchema = generateArraySchema(value, key);
      // Ensure items schema has required properties
      if (arraySchema.items && !arraySchema.items.type) {
        arraySchema.items.type = "object";
        arraySchema.items.properties = arraySchema.items.properties || {
          id: { type: "string", label: "ID", formField: "text" },
          title: { type: "string", label: "Title", formField: "text" },
          description: { type: "string", label: "Description", formField: "textarea" }
        };
      }
      properties[key] = arraySchema;
    } else if (typeof value === "object" && value !== null) {
      properties[key] = generateObjectSchema(value, key);
    } else {
      // Determine if field is likely required
      const isRequired = ["title", "name", "label"].some((reqKey) =>
        key.toLowerCase().includes(reqKey.toLowerCase())
      );

      properties[key] = {
        type: typeof value,
        label: generateFieldLabel(key),
        placeholder: generatePlaceholder(key, fieldType),
        required: isRequired,
        formField: fieldType,
      };
    }
  });

  return {
    componentName: componentType,
    category: "dynamic",
    icon: "📄",
    displayName: componentType.replace(/([A-Z])/g, " $1").trim(),
    description: `Dynamically generated schema for ${componentType}`,
    schema: {
      type: "object",
      properties,
    },
    defaultData: componentData,
  };
};

/**
 * Helper function to merge dynamic schema with existing partial schema
 * @param {Object} existingSchema - Existing schema (partial)
 * @param {Object} componentData - Component data
 * @param {string} componentType - Component type
 * @returns {Object} - Merged complete schema
 */
export const mergeDynamicSchema = (
  existingSchema,
  componentData,
  componentType
) => {
  const dynamicSchema = generateDynamicSchema(componentData, componentType);

  if (!existingSchema) {
    return dynamicSchema;
  }

  // Merge properties, keeping existing schema properties and adding missing ones
  const mergedProperties = {
    ...dynamicSchema.schema.properties,
    ...existingSchema.schema?.properties,
  };

  return {
    ...dynamicSchema,
    ...existingSchema,
    schema: {
      ...dynamicSchema.schema,
      ...existingSchema.schema,
      properties: mergedProperties,
    },
  };
};

export default {
  generateDynamicSchema,
  mergeDynamicSchema,
  detectFieldType,
  generateFieldLabel,
  generatePlaceholder,
  generateArraySchema,
  generateObjectSchema,
};
