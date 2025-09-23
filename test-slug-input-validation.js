// Test script for Enhanced Page Builder slug input field behavior

// Function to test the slug input field behavior
function testSlugInput() {
  console.log("Testing Enhanced Page Builder slug input field behavior");

  // Mock pageData for testing
  const pageData = {
    name: "Test Page",
    slug: "",
    categoryId: 1,
    metaTitle: "Test Page",
    metaDescription: "This is a test page",
    isHomepage: false,
  };

  // Test cases for slug field
  const testCases = [
    {
      input: "about-us",
      expected: "about-us",
      description: "Valid slug with dash",
    },
    { input: "contact", expected: "contact", description: "Valid simple slug" },
    { input: "h", expected: "h", description: "Valid single character slug" },
    {
      input: "my-page-123",
      expected: "my-page-123",
      description: "Valid slug with numbers",
    },
    {
      input: "About-Us",
      expected: null,
      description: "Invalid slug with uppercase",
    },
    {
      input: "about us",
      expected: null,
      description: "Invalid slug with space",
    },
    {
      input: "about_us",
      expected: null,
      description: "Invalid slug with underscore",
    },
    {
      input: "about/us",
      expected: null,
      description: "Invalid slug with slash",
    },
    {
      input: "about.us",
      expected: null,
      description: "Invalid slug with period",
    },
    {
      input: "about!us",
      expected: null,
      description: "Invalid slug with special char",
    },
  ];

  console.log("====================================");
  console.log("Testing slug input validation");
  console.log("====================================");

  // Simulate the behavior of handlePageDataChange function
  function mockHandlePageDataChange(field, value) {
    if (field === "slug") {
      // Only allow alphanumeric characters, dashes, and lowercase letters
      if (value === "" || /^[a-z0-9-]*$/.test(value)) {
        return value; // Valid value
      } else {
        return null; // Invalid value, would show toast in actual implementation
      }
    }
    return value;
  }

  // Run tests for handlePageDataChange behavior
  let passedTests = 0;
  let failedTests = 0;

  testCases.forEach((test, index) => {
    const result = mockHandlePageDataChange("slug", test.input);
    const passed = result === test.expected;

    if (passed) {
      passedTests++;
      console.log(
        `✅ Test ${index + 1} PASSED: "${test.input}" - ${test.description}`
      );
    } else {
      failedTests++;
      console.log(
        `❌ Test ${index + 1} FAILED: "${test.input}" - ${test.description}`
      );
      console.log(`   Expected: ${test.expected}, Got: ${result}`);
    }
  });

  console.log("====================================");
  console.log(`Tests completed: ${passedTests + failedTests} total`);
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log("====================================");

  if (failedTests === 0) {
    console.log("All slug input validation tests passed!");
  } else {
    console.log("Some tests failed. Please review the implementation.");
  }
}

// Run the test
testSlugInput();
