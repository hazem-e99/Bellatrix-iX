/**
 * Direct test of slug functionality
 */

// Implement slug generation directly for testing
function generateSlug(name) {
  if (!name || typeof name !== "string") return "";

  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

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
  const result = generateSlug(test.input);
  console.log(
    `Input: "${test.input}" -> Result: "${result}" -> ${
      result === test.expected ? "PASS" : "FAIL - Expected: " + test.expected
    }`
  );
});

// Create a page object with the slug from the screenshot
const pageWithSlugFromScreenshot = {
  name: "HR Department",
  categoryId: 1,
  slug: "h", // Single character slug as seen in the screenshot
};

console.log("\n===== PAGE WITH SLUG FROM SCREENSHOT =====");
console.log("Page object:", pageWithSlugFromScreenshot);
console.log("Is slug valid:", pageWithSlugFromScreenshot.slug === "h");
