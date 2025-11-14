/**
 * Quick Reference: Settings Key Normalizer
 * Copy and paste these examples directly into your code
 */

// ============================================================================
// IMPORT
// ============================================================================

import { normalizeSettingKeys } from "./utils/settingsKeyNormalizer";

// ============================================================================
// USAGE 1: Simple Array Normalization (Most Common)
// ============================================================================

// BEFORE (Old format):
const oldFormat = [
  { key: "Facebook URL", value: "https://facebook.com/mycompany" },
  { key: "Twitter URL", value: "https://twitter.com/mycompany" },
  { key: "Company Name", value: "My Company Inc." },
  { key: "Company Email", value: "info@mycompany.com" },
];

// AFTER (New backend format):
const newFormat = normalizeSettingKeys(oldFormat);

// Result:
// [
//   { key: "social_facebook", value: "https://facebook.com/mycompany" },
//   { key: "social_twitter", value: "https://twitter.com/mycompany" },
//   { key: "company_name", value: "My Company Inc." },
//   { key: "company_email", value: "info@mycompany.com" },
// ]

// ============================================================================
// USAGE 2: Full Setting Objects (Preserves All Fields)
// ============================================================================

const fullSettings = [
  {
    id: 1,
    key: "Facebook URL",
    value: "https://facebook.com",
    description: "Company Facebook page",
    category: "Social Media",
    isPublic: true,
    dataType: "url",
    createdAt: "2025-01-01",
  },
  {
    id: 2,
    key: "Company Name",
    value: "My Company",
    description: "Official name",
    category: "Company",
    isPublic: true,
    dataType: "string",
    createdAt: "2025-01-01",
  },
];

const normalized = normalizeSettingKeys(fullSettings);

// Result: Only 'key' field changes, everything else stays the same:
// [
//   {
//     id: 1,
//     key: "social_facebook",  // ← CHANGED
//     value: "https://facebook.com",
//     description: "Company Facebook page",
//     category: "Social Media",
//     isPublic: true,
//     dataType: "url",
//     createdAt: "2025-01-01",
//   },
//   {
//     id: 2,
//     key: "company_name",  // ← CHANGED
//     value: "My Company",
//     description: "Official name",
//     category: "Company",
//     isPublic: true,
//     dataType: "string",
//     createdAt: "2025-01-01",
//   },
// ]

// ============================================================================
// COMPLETE MAPPING TABLE
// ============================================================================

/*
┌─────────────────────────┬─────────────────────────┐
│ OLD KEY (Human)         │ NEW KEY (Backend)       │
├─────────────────────────┼─────────────────────────┤
│ Facebook URL            │ social_facebook         │
│ Twitter URL             │ social_twitter          │
│ LinkedIn URL            │ social_linkedin         │
│ Instagram URL           │ social_instagram        │
│ YouTube URL             │ social_youtube          │
│ Company Name            │ company_name            │
│ Company Email           │ company_email           │
│ Company Phone           │ company_phone           │
│ Company Address         │ company_address         │
│ Company Tagline         │ company_tagline         │
│ Footer Text             │ company_tagline         │
│ Copyright Text          │ copyright_text          │
│ Privacy Policy URL      │ privacy_policy_url      │
│ Terms of Service URL    │ terms_of_service_url    │
│ Site Title              │ siteTitle               │
└─────────────────────────┴─────────────────────────┘
*/

// ============================================================================
// ONE-LINE CONVERSIONS
// ============================================================================

// Array → Array
const result1 = normalizeSettingKeys(mySettingsArray);

// Object → Object
import { normalizeSettingKeysDictionary } from "./utils/settingsKeyNormalizer";
const result2 = normalizeSettingKeysDictionary(mySettingsObject);

// Single Key → Single Key
import { normalizeKey } from "./utils/settingsKeyNormalizer";
const result3 = normalizeKey("Facebook URL"); // → "social_facebook"

// ============================================================================
// COPY-PASTE READY FUNCTION
// ============================================================================

/**
 * Ready-to-use function for your components
 */
function convertSettingsToBackendFormat(settings) {
  return normalizeSettingKeys(settings);
}

// Usage:
const mySettings = [
  { key: "Facebook URL", value: "..." },
  { key: "Twitter URL", value: "..." },
];

const readyForAPI = convertSettingsToBackendFormat(mySettings);
// Send readyForAPI to your backend

// ============================================================================
// REACT COMPONENT EXAMPLE (COPY & PASTE)
// ============================================================================

/*
import React, { useState } from 'react';
import { normalizeSettingKeys } from './utils/settingsKeyNormalizer';

function MySettingsForm() {
  const [settings, setSettings] = useState([
    { key: "Facebook URL", value: "" },
    { key: "Twitter URL", value: "" },
    { key: "Company Name", value: "" },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✨ Convert to backend format
    const backendFormat = normalizeSettingKeys(settings);
    
    // Send to API
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(backendFormat),
    });
    
    if (response.ok) {
      alert('Settings saved!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {settings.map((setting, index) => (
        <div key={index}>
          <label>{setting.key}</label>
          <input
            value={setting.value}
            onChange={(e) => {
              const newSettings = [...settings];
              newSettings[index].value = e.target.value;
              setSettings(newSettings);
            }}
          />
        </div>
      ))}
      <button type="submit">Save</button>
    </form>
  );
}
*/

// ============================================================================
// EXPORT (If you want to use in other files)
// ============================================================================

export {
  oldFormat,
  newFormat,
  fullSettings,
  normalized,
  convertSettingsToBackendFormat,
};
