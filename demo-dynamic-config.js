/**
 * Dynamic Component Configuration Demo
 * 
 * This file demonstrates how the new dynamic component configuration system works.
 * It shows how different data structures are automatically analyzed and converted
 * into appropriate form fields.
 */

import { generateDynamicSchema, detectFieldType, generateFieldLabel } from '../src/utils/dynamicSchemaGenerator.js';

console.log("🚀 Dynamic Component Configuration System Demo\n");

// Test data structures representing different component types
const testComponents = {
  // Simple text-based component
  SimpleHero: {
    title: "Welcome to Our Platform",
    subtitle: "Transform your business today", 
    description: "Our platform provides comprehensive solutions for modern businesses looking to streamline operations and maximize efficiency.",
    buttonText: "Get Started",
    buttonLink: "/signup"
  },

  // Component with media and arrays
  TeamSection: {
    title: "Meet Our Team",
    description: "Our experts are here to help you succeed",
    backgroundImage: "/images/team-background.jpg",
    showStats: true,
    teamMembers: [
      {
        name: "John Doe",
        position: "CEO", 
        image: "/images/team/john.jpg",
        email: "john@example.com",
        bio: "John has over 15 years of experience in leading technology companies."
      },
      {
        name: "Jane Smith",
        position: "CTO",
        image: "/images/team/jane.jpg", 
        email: "jane@example.com",
        bio: "Jane specializes in system architecture and cloud solutions."
      }
    ],
    stats: [
      { value: "500+", label: "Projects Completed" },
      { value: "15+", label: "Years Experience" }
    ]
  },

  // Component with complex nested objects
  PricingCard: {
    title: "Professional Plan",
    price: 99,
    currency: "USD",
    isPopular: true,
    features: [
      "Advanced Analytics",
      "Priority Support", 
      "Custom Integration"
    ],
    theme: {
      backgroundColor: "#1a365d",
      textColor: "#ffffff",
      accentColor: "#3182ce"
    },
    contactInfo: {
      phone: "+1-555-0123",
      email: "sales@example.com", 
      website: "https://example.com"
    }
  },

  // Media-heavy component
  VideoShowcase: {
    title: "Product Demo",
    description: "See our product in action with this comprehensive demonstration video.",
    mainVideo: "/videos/product-demo.mp4",
    thumbnail: "/images/video-thumb.jpg",
    duration: "5:30",
    autoplay: false,
    showControls: true,
    chapters: [
      { title: "Introduction", timestamp: "0:00" },
      { title: "Features Overview", timestamp: "1:30" },
      { title: "Advanced Usage", timestamp: "3:15" }
    ]
  }
};

// Test the schema generation for each component type
Object.entries(testComponents).forEach(([componentType, componentData]) => {
  console.log(`\n📦 Testing Component: ${componentType}`);
  console.log("=" .repeat(50));
  
  // Generate dynamic schema
  const schema = generateDynamicSchema(componentData, componentType);
  
  console.log("📋 Generated Schema:");
  console.log("  Component Name:", schema.componentName);
  console.log("  Display Name:", schema.displayName);
  console.log("  Description:", schema.description);
  console.log("  Category:", schema.category);
  
  console.log("\n🏗️ Field Analysis:");
  Object.entries(schema.schema.properties).forEach(([fieldKey, fieldSchema]) => {
    const originalValue = componentData[fieldKey];
    console.log(`  • ${fieldKey}:`);
    console.log(`    - Label: ${fieldSchema.label}`);
    console.log(`    - Type: ${fieldSchema.type}`);
    console.log(`    - Field Type: ${fieldSchema.formField}`);
    console.log(`    - Required: ${fieldSchema.required ? 'Yes' : 'No'}`);
    console.log(`    - Original Value: ${JSON.stringify(originalValue)}`);
    if (fieldSchema.placeholder) {
      console.log(`    - Placeholder: ${fieldSchema.placeholder}`);
    }
  });
});

// Test field type detection
console.log("\n\n🔍 Field Type Detection Tests");
console.log("=" .repeat(50));

const detectionTests = [
  { value: "Welcome to our platform", key: "title", expected: "text" },
  { value: "This is a long description that contains detailed information about our services and capabilities.", key: "description", expected: "textarea" },
  { value: "/images/hero-background.jpg", key: "backgroundImage", expected: "media-image" },
  { value: "/videos/intro.mp4", key: "heroVideo", expected: "media-video" },
  { value: "https://example.com", key: "websiteUrl", expected: "url" },
  { value: "contact@example.com", key: "email", expected: "email" },
  { value: "#ff6b35", key: "primaryColor", expected: "color" },
  { value: true, key: "isActive", expected: "checkbox" },
  { value: 42, key: "maxItems", expected: "number" },
  { value: ["item1", "item2"], key: "tags", expected: "array" },
  { value: { name: "John", age: 30 }, key: "userInfo", expected: "object" }
];

detectionTests.forEach(test => {
  const detected = detectFieldType(test.value, test.key);
  const status = detected === test.expected ? "✅" : "❌";
  console.log(`${status} ${test.key}: ${detected} (expected: ${test.expected})`);
});

// Test label generation
console.log("\n\n🏷️ Label Generation Tests");
console.log("=" .repeat(50));

const labelTests = [
  "firstName",
  "backgroundImage", 
  "isActive",
  "maxRetryCount",
  "api_key",
  "user-email",
  "ctaButton",
  "seoTitle",
  "htmlContent"
];

labelTests.forEach(key => {
  const label = generateFieldLabel(key);
  console.log(`${key} → "${label}"`);
});

console.log("\n✅ Dynamic Component Configuration Demo Complete!");
console.log("\n📝 Summary:");
console.log("• The system can automatically detect field types from data");
console.log("• Labels are generated with proper formatting and capitalization"); 
console.log("• Schemas support text, textarea, media, URL, email, color, checkbox, number, array, and object fields");
console.log("• Complex nested structures (arrays and objects) are properly analyzed");
console.log("• The Component Configuration panel will now show relevant fields for any component!");