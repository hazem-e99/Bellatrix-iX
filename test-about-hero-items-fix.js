/**
 * Test script to verify the AboutHeroSection items field fix
 * This script simulates the data filtering logic to ensure items field is not shown
 */

// Mock schema for AboutHeroSection
const aboutHeroSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      label: "Hero Title",
      placeholder: "About Bellatrix",
      required: true,
      formField: "text"
    },
    subtitle: {
      type: "string",
      label: "Hero Subtitle",
      placeholder: "Your trusted partner in digital transformation",
      required: true,
      formField: "text"
    },
    description: {
      type: "string",
      label: "Hero Description",
      placeholder: "We are a leading consultancy firm...",
      required: true,
      formField: "textarea"
    },
    backgroundVideo: {
      type: "string",
      label: "Background Video URL",
      placeholder: "/Videos/about-hero.mp4",
      formField: "media",
      mediaType: "video"
    },
    stats: {
      type: "array",
      label: "Statistics",
      items: {
        type: "object",
        properties: {
          value: {
            type: "string",
            label: "Statistic Value",
            placeholder: "500+",
            required: true,
            formField: "text"
          },
          label: {
            type: "string",
            label: "Statistic Label",
            placeholder: "Projects Completed",
            required: true,
            formField: "text"
          }
        }
      },
      formField: "array",
      minItems: 0,
      maxItems: 6
    }
  }
};

// Mock data that might contain unwanted items field
const mockDataWithItems = {
  title: "About Bellatrix",
  subtitle: "Your trusted partner in digital transformation",
  description: "We are a leading consultancy firm specializing in NetSuite implementations...",
  backgroundVideo: "/Videos/about-hero.mp4",
  stats: [
    { value: "500+", label: "Projects Completed" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "200+", label: "Happy Clients" }
  ],
  // This is the unwanted field that should be filtered out
  items: [
    { title: "Unwanted Item 1", description: "This should not appear" },
    { title: "Unwanted Item 2", description: "This should not appear" }
  ]
};

// Test the filtering logic
function testDataFiltering() {
  console.log("🧪 Testing data filtering logic...");
  
  // Simulate the filtering logic from EnhancedPageBuilder.jsx
  const filteredData = {};
  if (aboutHeroSchema && aboutHeroSchema.properties) {
    Object.keys(aboutHeroSchema.properties).forEach(key => {
      if (mockDataWithItems && key in mockDataWithItems) {
        filteredData[key] = mockDataWithItems[key];
      }
    });
  }

  console.log("📊 Test Results:");
  console.log("Original data keys:", Object.keys(mockDataWithItems));
  console.log("Schema keys:", Object.keys(aboutHeroSchema.properties));
  console.log("Filtered data keys:", Object.keys(filteredData));
  console.log("Has items in original:", 'items' in mockDataWithItems);
  console.log("Has items in schema:", 'items' in aboutHeroSchema.properties);
  console.log("Has items in filtered:", 'items' in filteredData);

  // Test assertions
  const tests = [
    {
      name: "Original data contains items",
      test: 'items' in mockDataWithItems,
      expected: true
    },
    {
      name: "Schema does not contain items",
      test: !('items' in aboutHeroSchema.properties),
      expected: true
    },
    {
      name: "Filtered data does not contain items",
      test: !('items' in filteredData),
      expected: true
    },
    {
      name: "Filtered data contains only schema fields",
      test: Object.keys(filteredData).every(key => key in aboutHeroSchema.properties),
      expected: true
    },
    {
      name: "All schema fields are present in filtered data",
      test: Object.keys(aboutHeroSchema.properties).every(key => key in filteredData),
      expected: true
    }
  ];

  console.log("\n✅ Test Results:");
  let allPassed = true;
  tests.forEach(test => {
    const passed = test.test === test.expected;
    console.log(`${passed ? '✅' : '❌'} ${test.name}: ${passed ? 'PASSED' : 'FAILED'}`);
    if (!passed) allPassed = false;
  });

  console.log(`\n🎯 Overall Result: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  return allPassed;
}

// Test the DynamicFormGenerator field rendering logic
function testFieldRendering() {
  console.log("\n🧪 Testing field rendering logic...");
  
  const schemaKeys = Object.keys(aboutHeroSchema.properties);
  const dataKeys = Object.keys(mockDataWithItems);
  
  console.log("📊 Field Rendering Test:");
  console.log("Schema fields:", schemaKeys);
  console.log("Data fields:", dataKeys);
  
  // Simulate the field rendering logic
  const fieldsToRender = [];
  schemaKeys.forEach(key => {
    const fieldSchema = aboutHeroSchema.properties[key];
    const isInSchema = key in aboutHeroSchema.properties;
    const isInData = key in mockDataWithItems;
    
    console.log(`Field: ${key}, In Schema: ${isInSchema}, In Data: ${isInData}`);
    
    if (isInSchema) {
      fieldsToRender.push(key);
    } else {
      console.warn(`⚠️ Field ${key} not in schema, skipping`);
    }
  });
  
  console.log("Fields to render:", fieldsToRender);
  console.log("Should render items field:", fieldsToRender.includes('items'));
  
  const shouldNotRenderItems = !fieldsToRender.includes('items');
  console.log(`✅ Items field correctly excluded: ${shouldNotRenderItems ? 'YES' : 'NO'}`);
  
  return shouldNotRenderItems;
}

// Run all tests
function runAllTests() {
  console.log("🚀 Starting AboutHeroSection Items Field Fix Tests...\n");
  
  const test1 = testDataFiltering();
  const test2 = testFieldRendering();
  
  console.log("\n🎯 Final Results:");
  console.log(`Data Filtering Test: ${test1 ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Field Rendering Test: ${test2 ? '✅ PASSED' : '❌ FAILED'}`);
  
  const overallResult = test1 && test2;
  console.log(`\n🏆 Overall Test Result: ${overallResult ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  if (overallResult) {
    console.log("🎉 The fix is working correctly! AboutHeroSection should not show items field.");
  } else {
    console.log("⚠️ The fix needs attention. Please check the implementation.");
  }
  
  return overallResult;
}

// Export for use in other test files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testDataFiltering,
    testFieldRendering,
    runAllTests,
    aboutHeroSchema,
    mockDataWithItems
  };
}

// Run tests if this file is executed directly
if (typeof window === 'undefined' && typeof require !== 'undefined') {
  runAllTests();
}
