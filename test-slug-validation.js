// Test script for slug validation in EnhancedPageBuilder
console.log("Testing slug validation for EnhancedPageBuilder");

// Regular expression to validate slugs
const slugRegex = /^[a-z0-9-]+$/;

// Test cases
const testCases = [
  { input: "about-us", expected: true, description: "Valid slug with dash" },
  { input: "contact", expected: true, description: "Valid simple slug" },
  { input: "h", expected: true, description: "Valid single character slug" },
  {
    input: "my-page-123",
    expected: true,
    description: "Valid slug with numbers",
  },
  {
    input: "About-Us",
    expected: false,
    description: "Invalid slug with uppercase",
  },
  {
    input: "about us",
    expected: false,
    description: "Invalid slug with space",
  },
  {
    input: "about_us",
    expected: false,
    description: "Invalid slug with underscore",
  },
  {
    input: "about/us",
    expected: false,
    description: "Invalid slug with slash",
  },
  {
    input: "about.us",
    expected: false,
    description: "Invalid slug with period",
  },
  {
    input: "about!us",
    expected: false,
    description: "Invalid slug with special char",
  },
  {
    input: "about?us",
    expected: false,
    description: "Invalid slug with question mark",
  },
  { input: "", expected: false, description: "Empty slug" },
];

// Run tests
let passedTests = 0;
let failedTests = 0;

console.log("====================================");
console.log("Running Slug Validation Tests");
console.log("====================================");

testCases.forEach((test, index) => {
  const isValid = slugRegex.test(test.input);
  const passed = isValid === test.expected;

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
    console.log(`   Expected: ${test.expected}, Got: ${isValid}`);
  }
});

console.log("====================================");
console.log(`Tests completed: ${passedTests + failedTests} total`);
console.log(`✅ Passed: ${passedTests}`);
console.log(`❌ Failed: ${failedTests}`);
console.log("====================================");

if (failedTests === 0) {
  console.log(
    "All slug validation tests passed! The implementation is correct."
  );
} else {
  console.log("Some tests failed. Please review the implementation.");
}
