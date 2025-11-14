/**
 * Footer Settings API Test Script
 *
 * This file contains test functions to verify the Footer Settings implementation
 * Run these tests in the browser console or create a test page
 */

// Test Configuration
const API_BASE_URL = "http://localhost:5005";

/**
 * Test 1: Fetch all footer settings
 */
async function testFetchFooterSettings() {
  console.log("🧪 Test 1: Fetching footer settings...");

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/Settings/category/footer`
    );
    const data = await response.json();

    console.log("✅ Response:", data);

    if (data.success && Array.isArray(data.data)) {
      console.log(`✅ Found ${data.data.length} footer settings`);
      data.data.forEach((setting) => {
        console.log(`  - ${setting.key}: ${setting.value}`);
      });
      return true;
    } else {
      console.error("❌ Unexpected response structure");
      return false;
    }
  } catch (error) {
    console.error("❌ Error:", error);
    return false;
  }
}

/**
 * Test 2: Create a new footer setting
 */
async function testCreateFooterSetting() {
  console.log("🧪 Test 2: Creating a test footer setting...");

  const testSetting = {
    key: "test_footer_setting",
    value: "Test Value",
    description: "Test footer setting",
    category: "footer",
    isPublic: true,
    dataType: "string",
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/Settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testSetting),
    });

    const data = await response.json();
    console.log("✅ Create Response:", data);

    if (data.success && data.data) {
      console.log(`✅ Created setting with ID: ${data.data.id}`);
      return data.data.id;
    } else {
      console.error("❌ Failed to create setting");
      return null;
    }
  } catch (error) {
    console.error("❌ Error:", error);
    return null;
  }
}

/**
 * Test 3: Update an existing footer setting
 */
async function testUpdateFooterSetting(id) {
  console.log(`🧪 Test 3: Updating footer setting ID ${id}...`);

  const updatedSetting = {
    id: id,
    key: "test_footer_setting",
    value: "Updated Test Value",
    description: "Updated test footer setting",
    category: "footer",
    isPublic: true,
    dataType: "string",
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/Settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSetting),
    });

    const data = await response.json();
    console.log("✅ Update Response:", data);

    if (data.success) {
      console.log("✅ Setting updated successfully");
      return true;
    } else {
      console.error("❌ Failed to update setting");
      return false;
    }
  } catch (error) {
    console.error("❌ Error:", error);
    return false;
  }
}

/**
 * Test 4: Delete the test footer setting
 */
async function testDeleteFooterSetting(id) {
  console.log(`🧪 Test 4: Deleting footer setting ID ${id}...`);

  try {
    const response = await fetch(`${API_BASE_URL}/api/Settings/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log("✅ Delete Response:", data);

    if (data.success) {
      console.log("✅ Setting deleted successfully");
      return true;
    } else {
      console.error("❌ Failed to delete setting");
      return false;
    }
  } catch (error) {
    console.error("❌ Error:", error);
    return false;
  }
}

/**
 * Test 5: Validate email format
 */
function testEmailValidation() {
  console.log("🧪 Test 5: Testing email validation...");

  const testEmails = [
    { email: "valid@email.com", expected: true },
    { email: "invalid.email", expected: false },
    { email: "no@domain", expected: false },
    { email: "@nodomain.com", expected: false },
    { email: "user@domain.co.uk", expected: true },
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  testEmails.forEach((test) => {
    const isValid = emailRegex.test(test.email);
    const status = isValid === test.expected ? "✅" : "❌";
    console.log(
      `${status} "${test.email}" - Expected: ${test.expected}, Got: ${isValid}`
    );
  });
}

/**
 * Test 6: Validate URL format
 */
function testUrlValidation() {
  console.log("🧪 Test 6: Testing URL validation...");

  const testUrls = [
    { url: "https://example.com", expected: true },
    { url: "http://example.com", expected: true },
    { url: "example.com", expected: false },
    { url: "ftp://example.com", expected: false },
    { url: "https://sub.domain.com/path", expected: true },
  ];

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  testUrls.forEach((test) => {
    const isValid = isValidUrl(test.url);
    const status = isValid === test.expected ? "✅" : "❌";
    console.log(
      `${status} "${test.url}" - Expected: ${test.expected}, Got: ${isValid}`
    );
  });
}

/**
 * Run all tests sequentially
 */
async function runAllTests() {
  console.log("🚀 Starting Footer Settings API Tests...\n");

  // Test validations
  testEmailValidation();
  console.log("\n");
  testUrlValidation();
  console.log("\n");

  // Test API operations
  await testFetchFooterSettings();
  console.log("\n");

  const createdId = await testCreateFooterSetting();
  console.log("\n");

  if (createdId) {
    await testUpdateFooterSetting(createdId);
    console.log("\n");

    await testDeleteFooterSetting(createdId);
    console.log("\n");
  }

  console.log("✅ All tests completed!");
}

/**
 * Sample footer data for testing
 */
const SAMPLE_FOOTER_DATA = {
  company_name: "Bellatrix",
  company_tagline: "Oracle NetSuite Excellence & Innovation",
  company_address: "123 Business Street, Cairo, Egypt",
  company_email: "info@bellatrix.com",
  company_phone: "+20 123 456 7890",

  footer_link_1_label: "About Us",
  footer_link_1_url: "https://bellatrix.com/about",
  footer_link_2_label: "Services",
  footer_link_2_url: "https://bellatrix.com/services",
  footer_link_3_label: "Contact",
  footer_link_3_url: "https://bellatrix.com/contact",

  footer_service_1: "NetSuite Implementation",
  footer_service_2: "ERP Consulting",
  footer_service_3: "Cloud Solutions",
  footer_service_4: "Business Intelligence",
  footer_service_5: "Custom Development",

  social_facebook: "https://facebook.com/bellatrix",
  social_twitter: "https://twitter.com/bellatrix",
  social_linkedin: "https://linkedin.com/company/bellatrix",
};

/**
 * Populate all footer settings with sample data
 */
async function populateSampleFooterData() {
  console.log("🌱 Populating sample footer data...");

  const results = {
    success: 0,
    failed: 0,
    errors: [],
  };

  for (const [key, value] of Object.entries(SAMPLE_FOOTER_DATA)) {
    try {
      const setting = {
        key,
        value,
        description: getFieldDescription(key),
        category: "footer",
        isPublic: true,
        dataType: "string",
      };

      const response = await fetch(`${API_BASE_URL}/api/Settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(setting),
      });

      const data = await response.json();

      if (data.success) {
        results.success++;
        console.log(`✅ Created: ${key}`);
      } else {
        results.failed++;
        results.errors.push({ key, error: data.message });
        console.error(`❌ Failed: ${key} - ${data.message}`);
      }
    } catch (error) {
      results.failed++;
      results.errors.push({ key, error: error.message });
      console.error(`❌ Error creating ${key}:`, error);
    }
  }

  console.log(
    `\n📊 Results: ${results.success} successful, ${results.failed} failed`
  );
  return results;
}

/**
 * Helper function to get field descriptions
 */
function getFieldDescription(key) {
  const descriptions = {
    company_name: "Company name displayed in footer",
    company_tagline: "Company tagline/slogan",
    company_address: "Company physical address",
    company_email: "Contact email address",
    company_phone: "Contact phone number",
    footer_link_1_label: "First quick link text",
    footer_link_1_url: "First quick link URL",
    footer_link_2_label: "Second quick link text",
    footer_link_2_url: "Second quick link URL",
    footer_link_3_label: "Third quick link text",
    footer_link_3_url: "Third quick link URL",
    footer_service_1: "First service name",
    footer_service_2: "Second service name",
    footer_service_3: "Third service name",
    footer_service_4: "Fourth service name",
    footer_service_5: "Fifth service name",
    social_facebook: "Facebook profile URL",
    social_twitter: "Twitter profile URL",
    social_linkedin: "LinkedIn profile URL",
  };
  return descriptions[key] || "";
}

// Export functions for use in browser console
if (typeof window !== "undefined") {
  window.FooterSettingsTests = {
    runAllTests,
    testFetchFooterSettings,
    testCreateFooterSetting,
    testUpdateFooterSetting,
    testDeleteFooterSetting,
    testEmailValidation,
    testUrlValidation,
    populateSampleFooterData,
    SAMPLE_FOOTER_DATA,
  };

  console.log("✅ Footer Settings Tests loaded!");
  console.log(
    "Run window.FooterSettingsTests.runAllTests() to test everything"
  );
  console.log(
    "Or run window.FooterSettingsTests.populateSampleFooterData() to add sample data"
  );
}
