/**
 * Test Suite for Settings Key Normalizer
 * Run with: node src/utils/settingsKeyNormalizerTests.js
 */

import {
  normalizeKey,
  normalizeSettingKeys,
  normalizeSettingKeysDictionary,
  denormalizeKey,
  denormalizeSettingKeys,
  needsNormalization,
  normalizeSettingsBulk,
} from './settingsKeyNormalizer.js';

// Test utilities
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    failedTests++;
  }
}

function assertEqual(actual, expected, testName) {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  assert(passed, testName);
  if (!passed) {
    console.error('  Expected:', expected);
    console.error('  Actual:', actual);
  }
}

console.log('🧪 Running Settings Key Normalizer Tests\n');

// ============================================================================
// Test 1: normalizeKey - Basic mappings
// ============================================================================
console.log('Test Suite 1: normalizeKey\n');

assertEqual(
  normalizeKey("Facebook URL"),
  "social_facebook",
  "Should convert 'Facebook URL' to 'social_facebook'"
);

assertEqual(
  normalizeKey("Twitter URL"),
  "social_twitter",
  "Should convert 'Twitter URL' to 'social_twitter'"
);

assertEqual(
  normalizeKey("Company Name"),
  "company_name",
  "Should convert 'Company Name' to 'company_name'"
);

assertEqual(
  normalizeKey("unknown_key"),
  "unknown_key",
  "Should return unchanged for unknown keys"
);

// ============================================================================
// Test 2: normalizeSettingKeys - Array format
// ============================================================================
console.log('\nTest Suite 2: normalizeSettingKeys\n');

const testArray = [
  { key: "Facebook URL", value: "https://facebook.com" },
  { key: "Twitter URL", value: "https://twitter.com" },
];

const expectedArray = [
  { key: "social_facebook", value: "https://facebook.com" },
  { key: "social_twitter", value: "https://twitter.com" },
];

assertEqual(
  normalizeSettingKeys(testArray),
  expectedArray,
  "Should normalize array of settings"
);

// ============================================================================
// Test 3: normalizeSettingKeysDictionary - Object format
// ============================================================================
console.log('\nTest Suite 3: normalizeSettingKeysDictionary\n');

const testObject = {
  "Facebook URL": "https://facebook.com",
  "Company Name": "Test Company",
};

const expectedObject = {
  "social_facebook": "https://facebook.com",
  "company_name": "Test Company",
};

assertEqual(
  normalizeSettingKeysDictionary(testObject),
  expectedObject,
  "Should normalize object/dictionary format"
);

// ============================================================================
// Test 4: Full setting objects (preserve other fields)
// ============================================================================
console.log('\nTest Suite 4: Preserve Other Fields\n');

const fullSetting = [
  {
    id: 1,
    key: "Facebook URL",
    value: "https://facebook.com",
    description: "Facebook page",
    category: "social",
    isPublic: true,
  },
];

const normalizedFull = normalizeSettingKeys(fullSetting);

assert(
  normalizedFull[0].key === "social_facebook",
  "Should change key field"
);

assert(
  normalizedFull[0].id === 1,
  "Should preserve id field"
);

assert(
  normalizedFull[0].description === "Facebook page",
  "Should preserve description field"
);

assert(
  normalizedFull[0].category === "social",
  "Should preserve category field"
);

// ============================================================================
// Test 5: denormalizeKey - Reverse mapping
// ============================================================================
console.log('\nTest Suite 5: denormalizeKey\n');

assertEqual(
  denormalizeKey("social_facebook"),
  "Facebook URL",
  "Should reverse 'social_facebook' to 'Facebook URL'"
);

assertEqual(
  denormalizeKey("company_name"),
  "Company Name",
  "Should reverse 'company_name' to 'Company Name'"
);

// ============================================================================
// Test 6: denormalizeSettingKeys - Array reverse
// ============================================================================
console.log('\nTest Suite 6: denormalizeSettingKeys\n');

const backendArray = [
  { key: "social_facebook", value: "https://facebook.com" },
  { key: "company_name", value: "Test" },
];

const humanArray = [
  { key: "Facebook URL", value: "https://facebook.com" },
  { key: "Company Name", value: "Test" },
];

assertEqual(
  denormalizeSettingKeys(backendArray),
  humanArray,
  "Should denormalize array back to human-readable"
);

// ============================================================================
// Test 7: needsNormalization
// ============================================================================
console.log('\nTest Suite 7: needsNormalization\n');

assert(
  needsNormalization("Facebook URL") === true,
  "Should return true for 'Facebook URL'"
);

assert(
  needsNormalization("social_facebook") === false,
  "Should return false for 'social_facebook'"
);

assert(
  needsNormalization("unknown_key") === false,
  "Should return false for unknown keys"
);

// ============================================================================
// Test 8: normalizeSettingsBulk - With statistics
// ============================================================================
console.log('\nTest Suite 8: normalizeSettingsBulk\n');

const bulkInput = [
  { key: "Facebook URL", value: "fb" },
  { key: "already_normalized", value: "test" },
  null,
  { value: "no key field" },
];

const bulkResult = normalizeSettingsBulk(bulkInput, {
  logChanges: false,
  skipInvalid: false,
});

assert(
  bulkResult.stats.total === 4,
  "Should count all items"
);

assert(
  bulkResult.stats.normalized === 1,
  "Should normalize 1 item (Facebook URL)"
);

assert(
  bulkResult.stats.unchanged === 1,
  "Should have 1 unchanged item (already_normalized)"
);

assert(
  bulkResult.stats.invalid === 2,
  "Should have 2 invalid items (null and missing key)"
);

// ============================================================================
// Test 9: Edge cases
// ============================================================================
console.log('\nTest Suite 9: Edge Cases\n');

assertEqual(
  normalizeSettingKeys([]),
  [],
  "Should handle empty array"
);

assertEqual(
  normalizeSettingKeys(null),
  null,
  "Should handle null input"
);

assertEqual(
  normalizeSettingKeysDictionary({}),
  {},
  "Should handle empty object"
);

// ============================================================================
// Test 10: All supported mappings
// ============================================================================
console.log('\nTest Suite 10: All Supported Keys\n');

const allKeys = [
  ["Facebook URL", "social_facebook"],
  ["Twitter URL", "social_twitter"],
  ["LinkedIn URL", "social_linkedin"],
  ["Instagram URL", "social_instagram"],
  ["YouTube URL", "social_youtube"],
  ["Company Name", "company_name"],
  ["Company Email", "company_email"],
  ["Company Phone", "company_phone"],
  ["Company Address", "company_address"],
  ["Company Tagline", "company_tagline"],
  ["Copyright Text", "copyright_text"],
  ["Privacy Policy URL", "privacy_policy_url"],
  ["Terms of Service URL", "terms_of_service_url"],
];

allKeys.forEach(([oldKey, newKey]) => {
  assertEqual(
    normalizeKey(oldKey),
    newKey,
    `Should map '${oldKey}' to '${newKey}'`
  );
});

// ============================================================================
// Test Summary
// ============================================================================
console.log('\n' + '='.repeat(60));
console.log('📊 Test Summary:');
console.log(`   ✅ Passed: ${passedTests}`);
console.log(`   ❌ Failed: ${failedTests}`);
console.log(`   📈 Total: ${passedTests + failedTests}`);
console.log(`   🎯 Success Rate: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(2)}%`);
console.log('='.repeat(60));

if (failedTests === 0) {
  console.log('\n🎉 All tests passed!');
  process.exit(0);
} else {
  console.log(`\n⚠️  ${failedTests} test(s) failed`);
  process.exit(1);
}
