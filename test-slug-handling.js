/**
 * Slug Validation Test
 * This script tests slug handling with various types of text inputs
 */

import { pageUtils } from "./src/services/pagesService.js";

// Test cases for slug generation
const testCases = [
  { input: "h", expected: "h" }, // Single character
  { input: "Hello World", expected: "hello-world" }, // Basic text with spaces
  { input: "HR & Admin", expected: "hr-admin" }, // Text with special characters
  { input: "  Human  Resources  ", expected: "human-resources" }, // Extra spaces
  { input: "123-test", expected: "123-test" }, // Numbers and hyphens
  { input: "home_page.html", expected: "homepage" }, // Underscores and periods
];

// Run slug generation tests
console.log("===== TESTING SLUG GENERATION =====");
testCases.forEach((test) => {
  const result = pageUtils.generateSlug(test.input);
  console.log(
    `Input: "${test.input}" → Result: "${result}" → ${
      result === test.expected ? "PASS" : "FAIL - Expected: " + test.expected
    }`
  );
});

// Test validation with simple slug
const testPageSimpleSlug = {
  name: "HR Page",
  categoryId: 1,
  slug: "h", // Single character slug as seen in the screenshot
};

// Test validation with complex slug
const testPageComplexSlug = {
  name: "Contact Us",
  categoryId: 1,
  slug: "contact-us/support", // Slug with forward slash
};

// Run validation tests
console.log("\n===== TESTING PAGE VALIDATION =====");
console.log(
  "Simple slug validation:",
  pageUtils.validatePageData(testPageSimpleSlug)
);
console.log(
  "Complex slug validation:",
  pageUtils.validatePageData(testPageComplexSlug)
);

// Create a page object with the slug from the screenshot
const pageWithSlugFromScreenshot = {
  name: "HR Department",
  categoryId: 1,
  slug: "h",
};

console.log("\n===== PAGE WITH SLUG FROM SCREENSHOT =====");
console.log(
  "Validation result:",
  pageUtils.validatePageData(pageWithSlugFromScreenshot)
);
console.log("Page object:", pageWithSlugFromScreenshot);
