/**
 * Enhanced Page Validator
 *
 * This script provides a simple validation function for page data
 * and tests it with various inputs including single-character slugs.
 */

// Page validation function
function validatePageData(pageData) {
  const errors = [];

  if (!pageData.name || pageData.name.length < 2) {
    errors.push("Page name must be at least 2 characters long");
  }

  if (pageData.categoryId === undefined || pageData.categoryId === null) {
    errors.push("Category ID is required");
  }

  // Validate slug if provided (optional field)
  if (pageData.slug !== undefined && pageData.slug !== null) {
    // Ensure slug is a string
    if (typeof pageData.slug !== "string") {
      errors.push("Slug must be a text string");
    } else if (pageData.slug.length > 200) {
      errors.push("Slug cannot exceed 200 characters");
    }
  }

  return errors;
}

// Slug generation function
function generateSlug(name) {
  if (!name || typeof name !== "string") return "";

  // Process the slug
  let slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces

  // Remove leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, "");

  // Return the slug (accept single character slugs)
  return slug;
}

// Test cases for slugs
const slugTests = [
  { input: "h", expected: "h" },
  { input: "HR", expected: "hr" },
  { input: "Human Resources", expected: "human-resources" },
  { input: "  h  ", expected: "h" },
  { input: "-h-", expected: "h" },
];

console.log("===== TESTING SLUG GENERATION =====");
slugTests.forEach((test) => {
  const result = generateSlug(test.input);
  console.log(
    `Input: "${test.input}" -> Result: "${result}" -> ${
      result === test.expected ? "PASS" : "FAIL - Expected: " + test.expected
    }`
  );
});

// Test page validation
const pageTests = [
  {
    page: { name: "HR Page", categoryId: 1, slug: "h" },
    expectValid: true,
    description: "Valid page with single character slug",
  },
  {
    page: { name: "HR", categoryId: null },
    expectValid: false,
    description: "Invalid page (missing categoryId)",
  },
  {
    page: { name: "", categoryId: 1 },
    expectValid: false,
    description: "Invalid page (empty name)",
  },
  {
    page: { name: "HR Page", categoryId: 1, slug: "h" },
    expectValid: true,
    description: "Valid page matching screenshot example",
  },
];

console.log("\n===== TESTING PAGE VALIDATION =====");
pageTests.forEach((test) => {
  const errors = validatePageData(test.page);
  const isValid = errors.length === 0;
  console.log(`${test.description}:`);
  console.log(`  Input: ${JSON.stringify(test.page)}`);
  console.log(
    `  Valid: ${isValid} -> ${isValid === test.expectValid ? "PASS" : "FAIL"}`
  );
  if (errors.length > 0) {
    console.log(`  Errors: ${errors.join(", ")}`);
  }
  console.log();
});

// Check slug from screenshot specifically
const screenshotPage = { name: "HR Department", categoryId: 1, slug: "h" };
console.log("===== SCREENSHOT EXAMPLE VALIDATION =====");
console.log("Page:", screenshotPage);
console.log("Validation errors:", validatePageData(screenshotPage));
console.log("Is valid:", validatePageData(screenshotPage).length === 0);
