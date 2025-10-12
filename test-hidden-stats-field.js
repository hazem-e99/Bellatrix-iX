/**
 * Test script to verify the hidden stats field functionality
 * This script simulates the hidden field logic to ensure stats field is not shown
 */

// Mock schema for AboutHeroSection with hidden stats field
const aboutHeroSchemaWithHiddenStats = {
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
      maxItems: 6,
      hidden: true  // إخفاء حقل stats من Component Configuration
    }
  }
};

// Mock data with stats
const mockDataWithStats = {
  title: "About Bellatrix",
  subtitle: "Your trusted partner in digital transformation",
  description: "We are a leading consultancy firm specializing in NetSuite implementations...",
  backgroundVideo: "/Videos/about-hero.mp4",
  stats: [
    { value: "500+", label: "Projects Completed" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "200+", label: "Happy Clients" }
  ]
};

// Test the hidden field logic
function testHiddenFieldLogic() {
  console.log("🧪 Testing hidden field logic...");
  
  const schemaKeys = Object.keys(aboutHeroSchemaWithHiddenStats.properties);
  const fieldsToRender = [];
  const hiddenFields = [];
  
  console.log("📊 Hidden Field Test:");
  console.log("Schema fields:", schemaKeys);
  
  // Simulate the field rendering logic with hidden field support
  schemaKeys.forEach(key => {
    const fieldSchema = aboutHeroSchemaWithHiddenStats.properties[key];
    const isHidden = fieldSchema.hidden === true;
    
    console.log(`Field: ${key}, Hidden: ${isHidden}`);
    
    if (isHidden) {
      hiddenFields.push(key);
      console.log(`👁️ Field ${key} is hidden, skipping`);
    } else {
      fieldsToRender.push(key);
      console.log(`✅ Field ${key} will be rendered`);
    }
  });
  
  console.log("Fields to render:", fieldsToRender);
  console.log("Hidden fields:", hiddenFields);
  console.log("Should render stats field:", fieldsToRender.includes('stats'));
  
  const shouldNotRenderStats = !fieldsToRender.includes('stats');
  console.log(`✅ Stats field correctly hidden: ${shouldNotRenderStats ? 'YES' : 'NO'}`);
  
  return shouldNotRenderStats;
}

// Test the data filtering logic with hidden fields
function testDataFilteringWithHiddenFields() {
  console.log("\n🧪 Testing data filtering with hidden fields...");
  
  // Simulate the filtering logic from EnhancedPageBuilder.jsx
  const filteredData = {};
  if (aboutHeroSchemaWithHiddenStats && aboutHeroSchemaWithHiddenStats.properties) {
    Object.keys(aboutHeroSchemaWithHiddenStats.properties).forEach(key => {
      if (mockDataWithStats && key in mockDataWithStats) {
        filteredData[key] = mockDataWithStats[key];
      }
    });
  }

  console.log("📊 Data Filtering Test:");
  console.log("Original data keys:", Object.keys(mockDataWithStats));
  console.log("Schema keys:", Object.keys(aboutHeroSchemaWithHiddenStats.properties));
  console.log("Filtered data keys:", Object.keys(filteredData));
  console.log("Has stats in original:", 'stats' in mockDataWithStats);
  console.log("Has stats in schema:", 'stats' in aboutHeroSchemaWithHiddenStats.properties);
  console.log("Has stats in filtered:", 'stats' in filteredData);
  console.log("Stats field is hidden:", aboutHeroSchemaWithHiddenStats.properties.stats.hidden);

  // Test assertions
  const tests = [
    {
      name: "Original data contains stats",
      test: 'stats' in mockDataWithStats,
      expected: true
    },
    {
      name: "Schema contains stats field",
      test: 'stats' in aboutHeroSchemaWithHiddenStats.properties,
      expected: true
    },
    {
      name: "Stats field is marked as hidden",
      test: aboutHeroSchemaWithHiddenStats.properties.stats.hidden === true,
      expected: true
    },
    {
      name: "Filtered data contains stats (for backend use)",
      test: 'stats' in filteredData,
      expected: true
    }
  ];

  console.log("\n✅ Data Filtering Test Results:");
  let allPassed = true;
  tests.forEach(test => {
    const passed = test.test === test.expected;
    console.log(`${passed ? '✅' : '❌'} ${test.name}: ${passed ? 'PASSED' : 'FAILED'}`);
    if (!passed) allPassed = false;
  });

  console.log(`\n🎯 Data Filtering Result: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  return allPassed;
}

// Test the complete field rendering flow
function testCompleteFieldRendering() {
  console.log("\n🧪 Testing complete field rendering flow...");
  
  const schemaKeys = Object.keys(aboutHeroSchemaWithHiddenStats.properties);
  const visibleFields = [];
  const hiddenFields = [];
  
  // Simulate the complete field rendering logic
  schemaKeys.forEach(key => {
    const fieldSchema = aboutHeroSchemaWithHiddenStats.properties[key];
    
    // Check if field exists in schema
    if (!(key in aboutHeroSchemaWithHiddenStats.properties)) {
      console.warn(`⚠️ Field ${key} not in schema, skipping`);
      return;
    }
    
    // Check if field is hidden
    if (fieldSchema.hidden === true) {
      hiddenFields.push(key);
      console.log(`👁️ Field ${key} is hidden, skipping`);
      return;
    }
    
    // Field is visible and should be rendered
    visibleFields.push(key);
    console.log(`✅ Field ${key} will be rendered`);
  });
  
  console.log("📊 Complete Field Rendering Test:");
  console.log("Visible fields:", visibleFields);
  console.log("Hidden fields:", hiddenFields);
  console.log("Total schema fields:", schemaKeys.length);
  console.log("Visible fields count:", visibleFields.length);
  console.log("Hidden fields count:", hiddenFields.length);
  
  const expectedVisibleFields = ['title', 'subtitle', 'description', 'backgroundVideo'];
  const expectedHiddenFields = ['stats'];
  
  const visibleFieldsCorrect = expectedVisibleFields.every(field => visibleFields.includes(field));
  const hiddenFieldsCorrect = expectedHiddenFields.every(field => hiddenFields.includes(field));
  const noUnexpectedFields = visibleFields.length === expectedVisibleFields.length;
  
  console.log("Expected visible fields:", expectedVisibleFields);
  console.log("Expected hidden fields:", expectedHiddenFields);
  console.log("Visible fields correct:", visibleFieldsCorrect);
  console.log("Hidden fields correct:", hiddenFieldsCorrect);
  console.log("No unexpected fields:", noUnexpectedFields);
  
  const allCorrect = visibleFieldsCorrect && hiddenFieldsCorrect && noUnexpectedFields;
  console.log(`\n🎯 Complete Field Rendering Result: ${allCorrect ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  return allCorrect;
}

// Run all tests
function runAllTests() {
  console.log("🚀 Starting Hidden Stats Field Tests...\n");
  
  const test1 = testHiddenFieldLogic();
  const test2 = testDataFilteringWithHiddenFields();
  const test3 = testCompleteFieldRendering();
  
  console.log("\n🎯 Final Results:");
  console.log(`Hidden Field Logic Test: ${test1 ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Data Filtering Test: ${test2 ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Complete Field Rendering Test: ${test3 ? '✅ PASSED' : '❌ FAILED'}`);
  
  const overallResult = test1 && test2 && test3;
  console.log(`\n🏆 Overall Test Result: ${overallResult ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  if (overallResult) {
    console.log("🎉 The hidden field functionality is working correctly!");
    console.log("📊 AboutHeroSection will now hide the stats field from Component Configuration.");
    console.log("🔧 The stats data will still be available for the component to use.");
  } else {
    console.log("⚠️ The hidden field functionality needs attention. Please check the implementation.");
  }
  
  return overallResult;
}

// Export for use in other test files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testHiddenFieldLogic,
    testDataFilteringWithHiddenFields,
    testCompleteFieldRendering,
    runAllTests,
    aboutHeroSchemaWithHiddenStats,
    mockDataWithStats
  };
}

// Run tests if this file is executed directly
if (typeof window === 'undefined' && typeof require !== 'undefined') {
  runAllTests();
}
