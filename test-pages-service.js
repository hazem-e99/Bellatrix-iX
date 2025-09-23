// Test script for pagesService slug validation functions
import { pageUtils } from "./src/services/pagesService.js";

console.log("Testing pagesService slug validation functions");

// Test validateSlug function
console.log("\n=== Testing validateSlug ===");
const validateSlugTests = [
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
  { input: "", expected: false, description: "Empty slug" },
  { input: null, expected: false, description: "Null slug" },
  { input: undefined, expected: false, description: "Undefined slug" },
];

let passedValidateTests = 0;
let failedValidateTests = 0;

validateSlugTests.forEach((test, index) => {
  const isValid = pageUtils.validateSlug(test.input);
  const passed = isValid === test.expected;

  if (passed) {
    passedValidateTests++;
    console.log(
      `✅ Test ${index + 1} PASSED: "${test.input}" - ${test.description}`
    );
  } else {
    failedValidateTests++;
    console.log(
      `❌ Test ${index + 1} FAILED: "${test.input}" - ${test.description}`
    );
    console.log(`   Expected: ${test.expected}, Got: ${isValid}`);
  }
});

// Test generateSlug function
console.log("\n=== Testing generateSlug ===");
const generateSlugTests = [
  {
    input: "About Us",
    expected: "about-us",
    description: "Basic title with space",
  },
  {
    input: "Contact Page!",
    expected: "contact-page",
    description: "Title with special char",
  },
  {
    input: "Services & Products",
    expected: "services-products",
    description: "Title with ampersand",
  },
  {
    input: "FAQ: Common Questions",
    expected: "faq-common-questions",
    description: "Title with colon",
  },
  {
    input: "Hello_World",
    expected: "hello-world",
    description: "Title with underscore",
  },
  {
    input: "Product (2023)",
    expected: "product-2023",
    description: "Title with parentheses",
  },
  {
    input: "Page--With--Dashes",
    expected: "page-with-dashes",
    description: "Title with multiple dashes",
  },
  {
    input: "   Spaced   Title   ",
    expected: "spaced-title",
    description: "Title with extra spaces",
  },
  { input: "H", expected: "h", description: "Single character title" },
  {
    input: "123 Test",
    expected: "123-test",
    description: "Title starting with numbers",
  },
  { input: "", expected: "", description: "Empty title" },
  { input: null, expected: "", description: "Null title" },
  { input: undefined, expected: "", description: "Undefined title" },
];

let passedGenerateTests = 0;
let failedGenerateTests = 0;

generateSlugTests.forEach((test, index) => {
  const slug = pageUtils.generateSlug(test.input);
  const passed = slug === test.expected;

  if (passed) {
    passedGenerateTests++;
    console.log(
      `✅ Test ${index + 1} PASSED: "${test.input}" -> "${slug}" - ${
        test.description
      }`
    );
  } else {
    failedGenerateTests++;
    console.log(
      `❌ Test ${index + 1} FAILED: "${test.input}" -> "${slug}" - ${
        test.description
      }`
    );
    console.log(`   Expected: "${test.expected}", Got: "${slug}"`);
  }
});

// Test validatePageData function
console.log("\n=== Testing validatePageData ===");
const validatePageDataTests = [
  {
    input: { name: "Test Page", slug: "test-page", categoryId: 1 },
    expectedErrors: 0,
    description: "Valid page data",
  },
  {
    input: { name: "T", slug: "test-page", categoryId: 1 },
    expectedErrors: 1,
    description: "Invalid name (too short)",
  },
  {
    input: { name: "Test Page", slug: "Test-Page", categoryId: 1 },
    expectedErrors: 1,
    description: "Invalid slug (uppercase)",
  },
  {
    input: { name: "Test Page", slug: "test page", categoryId: 1 },
    expectedErrors: 1,
    description: "Invalid slug (space)",
  },
  {
    input: { name: "Test Page", categoryId: 1 },
    expectedErrors: 1,
    description: "Missing slug",
  },
  {
    input: { name: "Test Page", slug: "test-page" },
    expectedErrors: 1,
    description: "Missing categoryId",
  },
  {
    input: { slug: "test-page", categoryId: 1 },
    expectedErrors: 1,
    description: "Missing name",
  },
  {
    input: {},
    expectedErrors: 3,
    description: "Empty page data",
  },
];

let passedValidatePageTests = 0;
let failedValidatePageTests = 0;

validatePageDataTests.forEach((test, index) => {
  const errors = pageUtils.validatePageData(test.input);
  const passed = errors.length === test.expectedErrors;

  if (passed) {
    passedValidatePageTests++;
    console.log(`✅ Test ${index + 1} PASSED: ${test.description}`);
    if (errors.length > 0) {
      console.log(`   Errors: ${errors.join(", ")}`);
    }
  } else {
    failedValidatePageTests++;
    console.log(`❌ Test ${index + 1} FAILED: ${test.description}`);
    console.log(
      `   Expected ${test.expectedErrors} errors, Got ${errors.length} errors`
    );
    if (errors.length > 0) {
      console.log(`   Errors: ${errors.join(", ")}`);
    }
  }
});

// Summary
console.log("\n=== Test Summary ===");
console.log(
  `validateSlug: ${passedValidateTests} passed, ${failedValidateTests} failed`
);
console.log(
  `generateSlug: ${passedGenerateTests} passed, ${failedGenerateTests} failed`
);
console.log(
  `validatePageData: ${passedValidatePageTests} passed, ${failedValidatePageTests} failed`
);
console.log(
  `Total: ${
    passedValidateTests + passedGenerateTests + passedValidatePageTests
  } passed, ${
    failedValidateTests + failedGenerateTests + failedValidatePageTests
  } failed`
);

if (failedValidateTests + failedGenerateTests + failedValidatePageTests === 0) {
  console.log("\n✅ All tests passed! The implementation is correct.");
} else {
  console.log("\n❌ Some tests failed. Please review the implementation.");
}
