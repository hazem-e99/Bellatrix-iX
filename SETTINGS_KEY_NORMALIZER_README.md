# Settings Key Normalizer

A production-ready utility for normalizing setting key names between human-readable format and backend snake_case format.

## 📦 Installation

The utility is located at `src/utils/settingsKeyNormalizer.js`

```javascript
import {
  normalizeSettingKeys,
  normalizeKey,
  denormalizeSettingKeys,
} from './utils/settingsKeyNormalizer';
```

## 🎯 Use Cases

### 1. **Before Sending to API**
Convert human-readable keys to backend format before POST/PUT requests.

### 2. **After Receiving from API**
Convert backend keys to human-readable format for display in UI.

### 3. **Form Processing**
Normalize form data before validation and submission.

### 4. **Migration**
Bulk convert legacy data to new key format.

---

## 🚀 Quick Start

### Basic Array Normalization

```javascript
import { normalizeSettingKeys } from './utils/settingsKeyNormalizer';

const settings = [
  { key: "Facebook URL", value: "https://facebook.com/mycompany" },
  { key: "Twitter URL", value: "https://twitter.com/mycompany" },
  { key: "Company Name", value: "My Company Inc." }
];

const normalized = normalizeSettingKeys(settings);

console.log(normalized);
// Output:
// [
//   { key: "social_facebook", value: "https://facebook.com/mycompany" },
//   { key: "social_twitter", value: "https://twitter.com/mycompany" },
//   { key: "company_name", value: "My Company Inc." }
// ]
```

---

## 📚 API Reference

### `normalizeKey(key)`

Normalize a single key string.

**Parameters:**
- `key` (string): The key to normalize

**Returns:** string - The normalized key

**Example:**
```javascript
normalizeKey("Facebook URL")  // → "social_facebook"
normalizeKey("Company Name")  // → "company_name"
```

---

### `normalizeSettingKeys(settings)`

Normalize an array of setting objects.

**Parameters:**
- `settings` (Array): Array of objects with `key` property

**Returns:** Array - Normalized settings array

**Example:**
```javascript
const settings = [
  { key: "Facebook URL", value: "...", id: 1 },
  { key: "Twitter URL", value: "...", id: 2 }
];

const normalized = normalizeSettingKeys(settings);
// All fields preserved, only 'key' is changed
```

---

### `normalizeSettingKeysDictionary(settings)`

Normalize a settings object/dictionary.

**Parameters:**
- `settings` (Object): Object with setting keys as properties

**Returns:** Object - Normalized object

**Example:**
```javascript
const settings = {
  "Facebook URL": "https://facebook.com",
  "Company Name": "My Company"
};

const normalized = normalizeSettingKeysDictionary(settings);
// {
//   "social_facebook": "https://facebook.com",
//   "company_name": "My Company"
// }
```

---

### `denormalizeKey(backendKey)`

Convert backend key back to human-readable format.

**Parameters:**
- `backendKey` (string): The backend key name

**Returns:** string - Human-readable key

**Example:**
```javascript
denormalizeKey("social_facebook")  // → "Facebook URL"
denormalizeKey("company_name")     // → "Company Name"
```

---

### `denormalizeSettingKeys(settings)`

Convert array of backend settings to human-readable format.

**Parameters:**
- `settings` (Array): Array with backend keys

**Returns:** Array - Array with human-readable keys

**Example:**
```javascript
const backend = [
  { key: "social_facebook", value: "..." },
  { key: "company_name", value: "..." }
];

const humanReadable = denormalizeSettingKeys(backend);
// [
//   { key: "Facebook URL", value: "..." },
//   { key: "Company Name", value: "..." }
// ]
```

---

### `normalizeSettingsBulk(settings, options)`

Bulk normalize with detailed statistics and validation.

**Parameters:**
- `settings` (Array): Settings to normalize
- `options` (Object):
  - `validateKeys` (boolean): Enable key validation
  - `logChanges` (boolean): Log changes to console
  - `skipInvalid` (boolean): Skip invalid items

**Returns:** Object with:
- `normalized`: Array of normalized settings
- `changed`: Array of changed items
- `unchanged`: Array of unchanged items
- `invalid`: Array of invalid items
- `stats`: Statistics object

**Example:**
```javascript
const result = normalizeSettingsBulk(settings, {
  validateKeys: true,
  logChanges: true,
  skipInvalid: false
});

console.log(`Normalized: ${result.stats.normalized}`);
console.log(`Invalid: ${result.stats.invalid}`);
```

---

### `needsNormalization(key)`

Check if a key needs normalization.

**Parameters:**
- `key` (string): The key to check

**Returns:** boolean

**Example:**
```javascript
needsNormalization("Facebook URL")      // → true
needsNormalization("social_facebook")   // → false
```

---

### `getKeyMappings()`

Get all available key mappings.

**Returns:** Object - Complete mapping object

**Example:**
```javascript
const mappings = getKeyMappings();
console.log(mappings);
// {
//   "Facebook URL": "social_facebook",
//   "Twitter URL": "social_twitter",
//   ...
// }
```

---

## 🔑 Supported Key Mappings

| Human-Readable Key | Backend Key |
|-------------------|-------------|
| Facebook URL | `social_facebook` |
| Twitter URL | `social_twitter` |
| LinkedIn URL | `social_linkedin` |
| Instagram URL | `social_instagram` |
| YouTube URL | `social_youtube` |
| Company Name | `company_name` |
| Company Email | `company_email` |
| Company Phone | `company_phone` |
| Company Address | `company_address` |
| Company Tagline | `company_tagline` |
| Footer Text | `company_tagline` |
| Copyright Text | `copyright_text` |
| Privacy Policy URL | `privacy_policy_url` |
| Terms of Service URL | `terms_of_service_url` |
| Site Title | `siteTitle` |

---

## 💡 React Integration Examples

### Example 1: Form Submission

```javascript
import { normalizeSettingKeys } from './utils/settingsKeyNormalizer';

function SettingsForm() {
  const [settings, setSettings] = useState([
    { key: "Facebook URL", value: "" },
    { key: "Company Name", value: "" }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Normalize before sending to API
    const normalizedData = normalizeSettingKeys(settings);
    
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalizedData)
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

### Example 2: API Response Processing

```javascript
import { denormalizeSettingKeys } from './utils/settingsKeyNormalizer';

async function fetchSettings() {
  const response = await fetch('/api/settings');
  const backendData = await response.json();
  
  // Convert to human-readable for UI display
  const humanReadable = denormalizeSettingKeys(backendData);
  
  return humanReadable;
}
```

---

### Example 3: Bulk Update with Validation

```javascript
import { normalizeSettingsBulk } from './utils/settingsKeyNormalizer';

function BulkSettingsUpdate({ settings }) {
  const handleBulkUpdate = () => {
    const result = normalizeSettingsBulk(settings, {
      validateKeys: true,
      logChanges: true,
      skipInvalid: true
    });

    if (result.stats.invalid > 0) {
      alert(`Found ${result.stats.invalid} invalid settings`);
      console.error('Invalid items:', result.invalid);
      return;
    }

    // Send normalized data to API
    sendToAPI(result.normalized);
  };

  return <button onClick={handleBulkUpdate}>Update All</button>;
}
```

---

## 🧪 Testing

Run the test suite:

```bash
node src/utils/settingsKeyNormalizerTests.js
```

All tests should pass:
```
✅ PASS: Should convert 'Facebook URL' to 'social_facebook'
✅ PASS: Should normalize array of settings
✅ PASS: Should preserve other fields
...
🎉 All tests passed!
```

---

## 📝 Adding New Mappings

To add new key mappings, edit the `KEY_MAPPING` object in `settingsKeyNormalizer.js`:

```javascript
const KEY_MAPPING = {
  // Existing mappings...
  
  // Add your new mappings here:
  "New Human Key": "new_backend_key",
  "Another Key": "another_backend_key",
};
```

---

## ⚠️ Important Notes

1. **Field Preservation**: The normalizer only changes the `key` field. All other fields (id, value, description, etc.) are preserved.

2. **Unknown Keys**: If a key is not in the mapping, it returns unchanged.

3. **Case Sensitivity**: Keys are case-sensitive. "Facebook URL" ≠ "facebook url"

4. **Null Safety**: Functions handle null/undefined inputs gracefully.

5. **Immutability**: Original arrays/objects are not modified. New objects are returned.

---

## 🔧 Troubleshooting

### Keys not being normalized?

Check if the key exists in `KEY_MAPPING`. Use `needsNormalization(key)` to verify.

### Getting original object back?

The input might be null or invalid format. Check console for warnings.

### Need bidirectional mapping?

Use `normalizeKey()` for human → backend, and `denormalizeKey()` for backend → human.

---

## 📄 License

MIT

---

## 👥 Contributors

- Your Team Name

---

## 📞 Support

For issues or questions, please contact: support@yourcompany.com
