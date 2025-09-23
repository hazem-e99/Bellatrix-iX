/**
 * Test Script for Page Component Operations
 *
 * This script tests the fixes made to prevent duplicate orderIndex values
 * in the PageComponents table
 */

import pagesAPI, { pageComponentsService } from "./src/lib/pagesAPI.js";

// Test creating a page with multiple components
async function testCreatePageWithComponents() {
  console.log("Testing: Creating a page with multiple components...");

  try {
    const pageData = {
      name: "Test Page with Components",
      categoryId: 1,
      slug: "test-page-with-components",
      isPublished: true,
      components: [
        {
          componentType: "HeroSection",
          componentName: "Main Hero",
          contentJson: JSON.stringify({
            title: "Welcome to Test Page",
            subtitle: "Testing component creation",
            backgroundImage: "/images/test.jpg",
          }),
          // Intentionally omitting orderIndex to test auto-generation
        },
        {
          componentType: "TextSection",
          componentName: "Text Content",
          contentJson: JSON.stringify({
            title: "About Us",
            content: "This is a test page content",
          }),
          // Intentionally omitting orderIndex to test auto-generation
        },
      ],
    };

    const result = await pagesAPI.createPage(pageData);
    console.log("Success! Page created with components:", result);
    return result;
  } catch (error) {
    console.error("Error creating page with components:", error.message);
    throw error;
  }
}

// Test adding a component to an existing page
async function testAddComponent(pageId) {
  console.log(`Testing: Adding a component to page ${pageId}...`);

  try {
    const componentData = {
      componentType: "CtaButton",
      componentName: "Footer CTA",
      contentJson: JSON.stringify({
        text: "Learn More",
        link: "/contact",
        variant: "primary",
      }),
      // Intentionally omitting orderIndex to test auto-generation
    };

    const result = await pageComponentsService.addComponent(
      pageId,
      componentData
    );
    console.log("Success! Component added:", result);
    return result;
  } catch (error) {
    console.error("Error adding component:", error.message);
    throw error;
  }
}

// Run the tests
async function runTests() {
  try {
    // Test 1: Create a page with components
    const page = await testCreatePageWithComponents();

    // Test 2: Add a component to the created page
    if (page && page.id) {
      await testAddComponent(page.id);
    }

    console.log("All tests completed successfully!");
  } catch (error) {
    console.error("Test suite failed:", error);
  }
}

// Execute tests
runTests();
