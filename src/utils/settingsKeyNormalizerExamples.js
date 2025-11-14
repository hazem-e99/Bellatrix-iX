/**
 * Usage Examples for Settings Key Normalizer
 * This file demonstrates how to use the normalizer utility
 */

import {
  normalizeSettingKeys,
  normalizeSettingKeysDictionary,
  denormalizeSettingKeys,
  normalizeSettingsBulk,
  normalizeKey,
} from "./settingsKeyNormalizer";

// ============================================================================
// Example 1: Basic Array Normalization
// ============================================================================
console.log("Example 1: Basic Array Normalization\n");

const oldSettings = [
  { key: "Facebook URL", value: "https://facebook.com/mycompany" },
  { key: "Twitter URL", value: "https://twitter.com/mycompany" },
  { key: "Company Name", value: "My Company Inc." },
  { key: "Company Email", value: "info@mycompany.com" },
  { key: "Copyright Text", value: "© 2025 My Company. All rights reserved." },
];

const normalizedSettings = normalizeSettingKeys(oldSettings);

console.log("Before:", JSON.stringify(oldSettings, null, 2));
console.log("\nAfter:", JSON.stringify(normalizedSettings, null, 2));

// Result:
// [
//   { key: "facebook_link", value: "https://facebook.com/mycompany" },
//   { key: "twitter_link", value: "https://twitter.com/mycompany" },
//   { key: "company_name", value: "My Company Inc." },
//   { key: "company_email", value: "info@mycompany.com" },
//   { key: "copyright_text", value: "© 2025 My Company. All rights reserved." }
// ]

// ============================================================================
// Example 2: Dictionary/Object Format
// ============================================================================
console.log("\n\nExample 2: Dictionary Format\n");

const settingsObject = {
  "Facebook URL": "https://facebook.com/mycompany",
  "Twitter URL": "https://twitter.com/mycompany",
  "LinkedIn URL": "https://linkedin.com/company/mycompany",
  "Company Name": "My Company Inc.",
  "Privacy Policy URL": "https://mycompany.com/privacy",
};

const normalizedObject = normalizeSettingKeysDictionary(settingsObject);

console.log("Before:", JSON.stringify(settingsObject, null, 2));
console.log("\nAfter:", JSON.stringify(normalizedObject, null, 2));

// Result:
// {
//   "facebook_link": "https://facebook.com/mycompany",
//   "twitter_link": "https://twitter.com/mycompany",
//   "social_linkedin": "https://linkedin.com/company/mycompany",
//   "company_name": "My Company Inc.",
//   "privacy_policy_url": "https://mycompany.com/privacy"
// }

// ============================================================================
// Example 3: Full Setting Objects (with id, category, etc.)
// ============================================================================
console.log("\n\nExample 3: Full Setting Objects\n");

const fullSettings = [
  {
    id: 1,
    key: "Facebook URL",
    value: "https://facebook.com/mycompany",
    description: "Company Facebook page",
    category: "Social Media",
    isPublic: true,
    dataType: "url",
  },
  {
    id: 2,
    key: "Company Name",
    value: "My Company Inc.",
    description: "Official company name",
    category: "Company Info",
    isPublic: true,
    dataType: "string",
  },
  {
    id: 3,
    key: "Copyright Text",
    value: "© 2025 My Company",
    description: "Footer copyright text",
    category: "Footer",
    isPublic: true,
    dataType: "text",
  },
];

const normalizedFull = normalizeSettingKeys(fullSettings);

console.log("After normalization (only key field changed):");
console.log(JSON.stringify(normalizedFull, null, 2));

// Result: All fields preserved, only 'key' is changed

// ============================================================================
// Example 4: Bulk Normalization with Statistics
// ============================================================================
console.log("\n\nExample 4: Bulk Normalization with Stats\n");

const bulkSettings = [
  { key: "Facebook URL", value: "https://facebook.com" },
  { key: "Twitter URL", value: "https://twitter.com" },
  { key: "already_normalized_key", value: "some value" },
  { key: "Company Name", value: "Test Company" },
  null, // Invalid item
  { value: "missing key" }, // Invalid item
];

const bulkResult = normalizeSettingsBulk(bulkSettings, {
  validateKeys: true,
  logChanges: true,
  skipInvalid: false,
});

console.log("Bulk Result:");
console.log("- Total items:", bulkResult.stats.total);
console.log("- Normalized:", bulkResult.stats.normalized);
console.log("- Unchanged:", bulkResult.stats.unchanged);
console.log("- Invalid:", bulkResult.stats.invalid);
console.log("\nChanged items:", bulkResult.changed);
console.log("Invalid items:", bulkResult.invalid);

// ============================================================================
// Example 5: Reverse Normalization (Backend → Human-Readable)
// ============================================================================
console.log("\n\nExample 5: Denormalization\n");

const backendSettings = [
  { key: "facebook_link", value: "https://facebook.com" },
  { key: "twitter_link", value: "https://twitter.com" },
  { key: "company_name", value: "My Company" },
  { key: "copyright_text", value: "© 2025" },
];

const humanReadable = denormalizeSettingKeys(backendSettings);

console.log("Backend format:", JSON.stringify(backendSettings, null, 2));
console.log("\nHuman-readable:", JSON.stringify(humanReadable, null, 2));

// ============================================================================
// Example 6: Single Key Normalization
// ============================================================================
console.log("\n\nExample 6: Single Key\n");

console.log('normalizeKey("Facebook URL"):', normalizeKey("Facebook URL"));
console.log('normalizeKey("Twitter URL"):', normalizeKey("Twitter URL"));
console.log('normalizeKey("Company Name"):', normalizeKey("Company Name"));
console.log('normalizeKey("unknown_key"):', normalizeKey("unknown_key"));

// ============================================================================
// Example 7: React Component Integration
// ============================================================================

// In a React component:
/*
import { normalizeSettingKeys } from './utils/settingsKeyNormalizer';

function SettingsForm({ settings }) {
  // Normalize settings before sending to API
  const handleSubmit = async () => {
    const normalizedData = normalizeSettingKeys(settings);
    
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalizedData),
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
*/

// ============================================================================
// Example 8: API Response Processing
// ============================================================================

// When receiving data from API:
/*
async function fetchSettings() {
  const response = await fetch('/api/settings');
  const backendData = await response.json();
  
  // If you want to display human-readable keys in UI
  const humanReadable = denormalizeSettingKeys(backendData);
  
  return humanReadable;
}
*/

// ============================================================================
// Example 9: Form Validation Before Submit
// ============================================================================

/*
import { normalizeSettingsBulk } from './utils/settingsKeyNormalizer';

function validateAndNormalizeForm(formData) {
  const result = normalizeSettingsBulk(formData, {
    validateKeys: true,
    logChanges: true,
    skipInvalid: true, // Don't include invalid items
  });

  if (result.stats.invalid > 0) {
    console.error('Invalid settings found:', result.invalid);
    throw new Error('Please fix invalid settings');
  }

  return result.normalized;
}
*/

// ============================================================================
// Export for testing
// ============================================================================

export {
  oldSettings,
  normalizedSettings,
  settingsObject,
  normalizedObject,
  fullSettings,
  normalizedFull,
  bulkSettings,
  bulkResult,
  backendSettings,
  humanReadable,
};
