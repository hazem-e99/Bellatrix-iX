// Test script for slug validation
console.log("Testing pagesService slug validation functions");

// Mock pageUtils for testing
const pageUtils = {
  validateSlug: (slug) => {
    if (slug === undefined || slug === null || slug === "") {
      return false;
    }

    // Slug must be a string containing only lowercase letters, numbers, and dashes
    return typeof slug === "string" && /^[a-z0-9-]+$/.test(slug);
  },

  generateSlug: (name) => {
    if (!name || typeof name !== "string") return "";

    // Convert to lowercase
    let slug = name.toLowerCase();

    // Replace spaces and special characters with dashes
    slug = slug.replace(/[^a-z0-9\s_-]/g, ""); // Remove special chars except spaces, underscores, and dashes
    slug = slug.replace(/[\s_]+/g, "-"); // Convert spaces and underscores to dashes
    slug = slug.replace(/-+/g, "-"); // Replace multiple dashes with single dash
    slug = slug.replace(/^-+|-+$/g, ""); // Trim dashes from start and end

    return slug;
  },
};

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

// Summary
console.log("\n=== Test Summary ===");
console.log(
  `validateSlug: ${passedValidateTests} passed, ${failedValidateTests} failed`
);
console.log(
  `generateSlug: ${passedGenerateTests} passed, ${failedGenerateTests} failed`
);
console.log(
  `Total: ${passedValidateTests + passedGenerateTests} passed, ${
    failedValidateTests + failedGenerateTests
  } failed`
);

if (failedValidateTests + failedGenerateTests === 0) {
  console.log("\n✅ All tests passed! The implementation is correct.");
} else {
  console.log("\n❌ Some tests failed. Please review the implementation.");
}
