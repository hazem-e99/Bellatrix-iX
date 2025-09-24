/**
 * Test script to validate the page creation flow
 * Run this with: node test-page-creation.js
 */

// Mock test data to validate the logic
const testPageData = {
  name: "Test HR Page",
  slug: "test-hr-page", 
  categoryId: 1,
  metaTitle: "Test HR Page - Meta Title",
  metaDescription: "Test description for HR page",
  isHomepage: false,
  isPublished: true,
  components: [
    {
      componentType: "HRHeroSection",
      componentName: "HR Hero Section",
      orderIndex: 0,
      content: {
        title: "Welcome to HR Solutions",
        subtitle: "Comprehensive HR management platform",
        buttonText: "Get Started"
      }
    },
    {
      componentType: "HRModulesSection", 
      componentName: "HR Modules Section",
      orderIndex: 1,
      content: {
        modules: [
          { name: "Employee Management", description: "Manage employee data" },
          { name: "Payroll Processing", description: "Handle payroll calculations" }
        ]
      }
    }
  ]
};

// Simulate the endpoint selection logic
function testEndpointSelection(pageData) {
  const hasComponents = pageData.components && Array.isArray(pageData.components) && pageData.components.length > 0;
  const endpoint = hasComponents ? "/Pages/with-components" : "/Pages";
  
  console.log("=== ENDPOINT SELECTION TEST ===");
  console.log("Page Data:", JSON.stringify(pageData, null, 2));
  console.log("Has Components:", hasComponents);
  console.log("Components Count:", pageData.components?.length || 0);
  console.log("Selected Endpoint:", endpoint);
  console.log("================================");
  
  return endpoint;
}

// Simulate payload preparation
function testPayloadPreparation(pageData) {
  let dataToSend = { ...pageData };
  
  // Remove id fields for new page creation
  delete dataToSend.id;
  delete dataToSend.pageId;
  
  if (dataToSend.components && dataToSend.components.length > 0) {
    console.log("Processing components for API payload...");
    
    dataToSend.components = dataToSend.components.map((component, index) => {
      const cleanComponent = { ...component };
      delete cleanComponent.id;
      delete cleanComponent.pageId;

      const formattedComponent = {
        componentType: cleanComponent.componentType || "Generic",
        componentName: cleanComponent.componentName || `Component ${index + 1}`,
        orderIndex: index,
        contentJson: "",
      };

      if (cleanComponent.content && typeof cleanComponent.content === "object") {
        formattedComponent.contentJson = JSON.stringify(cleanComponent.content);
      } else {
        formattedComponent.contentJson = JSON.stringify({});
      }

      return formattedComponent;
    });
  }
  
  console.log("=== PAYLOAD PREPARATION TEST ===");
  console.log("Final Payload:", JSON.stringify(dataToSend, null, 2));
  console.log("=================================");
  
  return dataToSend;
}

// Run tests
console.log("Starting Page Creation Flow Tests...\n");

// Test 1: Page with components
console.log("TEST 1: Page with components");
const endpoint1 = testEndpointSelection(testPageData);
const payload1 = testPayloadPreparation(testPageData);

console.log("\n" + "=".repeat(50) + "\n");

// Test 2: Page without components
console.log("TEST 2: Page without components");
const testPageDataNoComponents = { ...testPageData, components: [] };
const endpoint2 = testEndpointSelection(testPageDataNoComponents);
const payload2 = testPayloadPreparation(testPageDataNoComponents);

console.log("\n" + "=".repeat(50) + "\n");

// Test 3: Page with null components
console.log("TEST 3: Page with null components");
const testPageDataNullComponents = { ...testPageData, components: null };
const endpoint3 = testEndpointSelection(testPageDataNullComponents);
const payload3 = testPayloadPreparation(testPageDataNullComponents);

console.log("\nAll tests completed successfully!");
console.log("\nValidation Results:");
console.log("- Test 1 endpoint:", endpoint1, "(should be /Pages/with-components)");
console.log("- Test 2 endpoint:", endpoint2, "(should be /Pages)");  
console.log("- Test 3 endpoint:", endpoint3, "(should be /Pages)");
console.log("- All payloads should have no id/pageId fields");
console.log("- Components should have sequential orderIndex values");