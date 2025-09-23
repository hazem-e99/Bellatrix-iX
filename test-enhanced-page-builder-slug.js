/**
 * Test file for slug validation in EnhancedPageBuilder
 *
 * This script simulates the logic used in the EnhancedPageBuilder component
 * to validate and process page slugs, including single-character values.
 */

// Simulated page data
const pageData = {
  name: "HR Department",
  categoryId: 1,
  slug: "h",
  metaTitle: "HR Solutions",
  metaDescription: "Our HR solutions",
  isHomepage: false,
  isPublished: false,
  components: [],
};

// Function to validate slug (same as in the component)
function isSlugValid(slug) {
  return slug !== undefined && slug !== null && slug.trim() !== "";
}

// Test slug validation
console.log("===== TESTING SINGLE-CHARACTER SLUG VALIDATION =====");
console.log(`Slug value: "${pageData.slug}"`);
console.log(`Is valid: ${isSlugValid(pageData.slug)}`);

// Test various slug formats
const testSlugs = [
  "h", // Single character
  "", // Empty string (invalid)
  "hr-department", // Standard slug
  "about_us", // With underscore
  "1", // Single digit
  "contact/us", // With slash
];

console.log("\n===== TESTING DIFFERENT SLUG FORMATS =====");
testSlugs.forEach((slug) => {
  console.log(`Slug: "${slug}" - Valid: ${isSlugValid(slug)}`);
});

// Function to simulate form submission
function handleSave(data) {
  // Check name
  if (!data.name.trim()) {
    console.log("Error: Please enter a page name");
    return false;
  }

  // Check slug using our new validation
  if (!isSlugValid(data.slug)) {
    console.log("Error: Please enter a page slug");
    return false;
  }

  console.log("Success: Page saved with slug:", data.slug);
  return true;
}

// Test saving with different slugs
console.log("\n===== TESTING FORM SUBMISSION =====");

// Valid single character slug
const singleCharTest = { ...pageData, slug: "h" };
console.log("Single character slug:");
handleSave(singleCharTest);

// Empty slug (should fail)
const emptySlugTest = { ...pageData, slug: "" };
console.log("\nEmpty slug:");
handleSave(emptySlugTest);

// Normal slug
const normalSlugTest = { ...pageData, slug: "hr-department" };
console.log("\nNormal slug:");
handleSave(normalSlugTest);
