/**
 * Test page creation functionality
 *
 * This script tests page creation with required fields to ensure the validation works properly
 */

import { pagesService, pageUtils } from "./src/services/pagesService.js";

// Test creating a valid page with required fields
const testValidPage = {
  name: "Test Page",
  categoryId: 1,
  slug: "test-page",
};

// Test creating an invalid page (missing required fields)
const testInvalidPage = {
  name: "", // Invalid - name is required and must be at least 2 characters
  slug: "test-invalid-page",
};

// Check validation first
console.log(
  "Validating valid page:",
  pageUtils.validatePageData(testValidPage)
);
console.log(
  "Validating invalid page:",
  pageUtils.validatePageData(testInvalidPage)
);

// Proper page creation example (with console logging to debug the request)
async function createTestPage() {
  try {
    console.log(
      "Creating test page with payload:",
      JSON.stringify(testValidPage, null, 2)
    );

    // Create page through the service
    const result = await pagesService.createPage(testValidPage);
    console.log("Page created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating page:", error.message);
    console.error("Full error:", error);
  }
}

// Run the test
createTestPage();
