# Footer Settings - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ADMIN DASHBOARD                                 │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                    SettingsManagement.jsx                        │ │
│  │                                                                   │ │
│  │  ┌─────────────────┐  ┌─────────────────────────────────────┐  │ │
│  │  │   Permissions   │  │      Footer Settings (NEW)          │  │ │
│  │  │      Tab        │  │                                     │  │ │
│  │  └─────────────────┘  └─────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       FooterSettings.jsx                                │
│                                                                         │
│  ┌────────────────────────────┐  ┌────────────────────────────────┐   │
│  │    Footer Fields Tab       │  │     Advanced View Tab         │   │
│  │  ┌──────────────────────┐  │  │  ┌──────────────────────────┐ │   │
│  │  │  SettingField x 14   │  │  │  │  SettingsGroupedView     │ │   │
│  │  │                      │  │  │  │                          │ │   │
│  │  │  • siteTitle         │  │  │  │  ┌─────────────────┐    │ │   │
│  │  │  • footerText        │  │  │  │  │ Category: footer│    │ │   │
│  │  │  • companyName       │  │  │  │  │  - siteTitle    │    │ │   │
│  │  │  • email             │  │  │  │  │  - email        │    │ │   │
│  │  │  • phone             │  │  │  │  └─────────────────┘    │ │   │
│  │  │  • address           │  │  │  │  ┌─────────────────┐    │ │   │
│  │  │  • facebook          │  │  │  │  │ Category: general│   │ │   │
│  │  │  • twitter           │  │  │  │  │  - ...          │    │ │   │
│  │  │  • linkedin          │  │  │  │  └─────────────────┘    │ │   │
│  │  │  • instagram         │  │  │  │                          │ │   │
│  │  │  • youtube           │  │  │  └──────────────────────────┘ │   │
│  │  │  • copyrightText     │  │  └────────────────────────────────┘   │
│  │  │  • privacyPolicyUrl  │  │                                       │
│  │  │  • termsOfServiceUrl │  │                                       │
│  │  │                      │  │                                       │
│  │  │  [Save] [Delete]     │  │                                       │
│  │  └──────────────────────┘  │                                       │
│  │                            │                                       │
│  │  [Refresh] [Save All (X)]  │                                       │
│  └────────────────────────────┘                                       │
└─────────────────────────────────────────────────────────────────────────┘
                    │                           │
                    ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      useSettingsSync.js (Hook)                          │
│                                                                         │
│  State:                                                                 │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ • settingsMap:    Map<key, SettingDTO>                          │  │
│  │ • dictionaryMap:  Map<key, value>                               │  │
│  │ • dirtyKeys:      Set<key>                                      │  │
│  │ • loading:        boolean                                       │  │
│  │ • error:          string | null                                 │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  Methods:                                                               │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ • getSettingValue(key)                                          │  │
│  │ • getFooterSettings()                                           │  │
│  │ • markDirty(key)                                                │  │
│  │ • clearDirty(key)                                               │  │
│  │ • clearAllDirty()                                               │  │
│  │ • updateLocalSetting(setting)                                   │  │
│  │ • removeLocalSetting(key)                                       │  │
│  │ • refresh()                                                     │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       settingsApi.js (Service)                          │
│                                                                         │
│  API Methods (All Endpoints):                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ getPublicSettings()          → GET /Settings/public            │  │
│  │ getPublicDictionary()        → GET /Settings/public/dictionary │  │
│  │ getAllSettings()             → GET /Settings                   │  │
│  │ getSettingsGrouped()         → GET /Settings/grouped           │  │
│  │ getSettingsDictionary()      → GET /Settings/dictionary        │  │
│  │ getSettingByKey(key)         → GET /Settings/key/{key}         │  │
│  │ getSettingById(id)           → GET /Settings/{id}              │  │
│  │ getSettingsByCategory(cat)   → GET /Settings/category/{cat}    │  │
│  │ createSetting(payload)       → POST /Settings                  │  │
│  │ updateSetting(payload)       → PUT /Settings                   │  │
│  │ bulkUpdateSettings(payload)  → PUT /Settings/bulk              │  │
│  │ deleteSetting(id)            → DELETE /Settings/{id}           │  │
│  │ searchSettings(term)         → GET /Settings/search            │  │
│  │ checkKeyExists(key)          → GET /Settings/exists            │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            api.js (Axios)                               │
│                                                                         │
│  Base URL: http://bellatrix.runasp.net/api                             │
│  Timeout: 15 seconds                                                   │
│  Interceptors:                                                         │
│  • Request: Add Authorization Bearer token                            │
│  • Response: Unwrap {success, data, message}                          │
│  • Error: Normalize error structure                                   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    BACKEND API (Swagger Spec)                           │
│                                                                         │
│  Endpoints:                                                            │
│  • GET    /api/Settings/public                                        │
│  • GET    /api/Settings/public/dictionary                             │
│  • GET    /api/Settings                                               │
│  • GET    /api/Settings/grouped                                       │
│  • GET    /api/Settings/dictionary                                    │
│  • GET    /api/Settings/key/{key}                                     │
│  • GET    /api/Settings/{id}                                          │
│  • GET    /api/Settings/category/{category}                           │
│  • POST   /api/Settings                                               │
│  • PUT    /api/Settings                                               │
│  • PUT    /api/Settings/bulk                                          │
│  • DELETE /api/Settings/{id}                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              DATABASE                                   │
│                                                                         │
│  Settings Table:                                                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ id          │ int          │ Primary Key                        │  │
│  │ key         │ string(100)  │ Unique                             │  │
│  │ value       │ text         │                                    │  │
│  │ description │ string(500)  │ nullable                           │  │
│  │ category    │ string(50)   │ nullable                           │  │
│  │ isPublic    │ boolean      │ default: false                     │  │
│  │ dataType    │ string(50)   │ nullable                           │  │
│  │ createdAt   │ datetime     │                                    │  │
│  │ updatedAt   │ datetime     │ nullable                           │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### Page Load
```
User → FooterSettings.jsx
           │
           ├──→ useSettingsSync (hook)
           │       │
           │       ├──→ settingsApi.getPublicSettings()
           │       │       │
           │       │       └──→ GET /api/Settings/public
           │       │               │
           │       │               └──→ Returns: SettingDTO[]
           │       │
           │       └──→ settingsApi.getPublicDictionary()
           │               │
           │               └──→ GET /api/Settings/public/dictionary
           │                       │
           │                       └──→ Returns: { [key]: value }
           │
           └──→ Render 14 SettingField components with prefilled values
```

### Create New Setting
```
User types in empty field → SettingField component
                                    │
                                    ├──→ Validation (client-side)
                                    │
                                    ├──→ settingsApi.checkKeyExists(key)
                                    │       │
                                    │       └──→ GET /api/Settings/key/{key}
                                    │               │
                                    │               └──→ Returns: SettingDTO or 404
                                    │
                                    ├──→ If not exists:
                                    │       │
                                    │       └──→ settingsApi.createSetting(payload)
                                    │               │
                                    │               └──→ POST /api/Settings
                                    │                       │
                                    │                       └──→ Returns: SettingDTO
                                    │
                                    └──→ Update local state
                                            │
                                            └──→ Show success toast
```

### Update Existing Setting
```
User modifies existing field → SettingField component
                                      │
                                      ├──→ Validation (client-side)
                                      │
                                      └──→ settingsApi.updateSetting(payload)
                                              │
                                              └──→ PUT /api/Settings
                                                      │
                                                      └──→ Returns: SettingDTO
                                                              │
                                                              ├──→ Update local state
                                                              │
                                                              └──→ Show success toast
```

### Bulk Save
```
User clicks "Save All" → FooterSettings.jsx
                              │
                              ├──→ Collect dirty fields
                              │       │
                              │       ├──→ Items with ID (existing)
                              │       │       │
                              │       │       └──→ settingsApi.bulkUpdateSettings([...])
                              │       │               │
                              │       │               └──→ PUT /api/Settings/bulk
                              │       │
                              │       └──→ Items without ID (new)
                              │               │
                              │               └──→ settingsApi.createSetting(...) (loop)
                              │                       │
                              │                       └──→ POST /api/Settings (multiple)
                              │
                              ├──→ settingsApi.getPublicSettings() (refresh)
                              │       │
                              │       └──→ GET /api/Settings/public
                              │
                              └──→ Clear all dirty flags → Show success toast
```

### Delete Setting
```
User clicks Delete → SettingField component
                          │
                          ├──→ Show confirmation modal
                          │
                          └──→ settingsApi.deleteSetting(id)
                                  │
                                  └──→ DELETE /api/Settings/{id}
                                          │
                                          └──→ Returns: { success: true }
                                                  │
                                                  ├──→ Remove from local state
                                                  │
                                                  └──→ Show success toast
```

### Advanced View (Grouped)
```
User switches to Advanced View tab → SettingsGroupedView component
                                          │
                                          └──→ settingsApi.getSettingsGrouped()
                                                  │
                                                  └──→ GET /api/Settings/grouped
                                                          │
                                                          └──→ Returns: SettingsByCategoryDTO[]
                                                                  │
                                                                  └──→ Display grouped by category
```

---

## Component Interaction

```
┌─────────────────────────────────────────────────────────────────┐
│                    FooterSettings.jsx                           │
│                                                                 │
│  Props: none                                                    │
│  State:                                                         │
│    • activeTab: "fields" | "advanced"                           │
│    • footerSettings: Array<FooterSettingItem>                   │
│    • isBulkSaving: boolean                                      │
│                                                                 │
│  Hooks:                                                         │
│    • useSettingsSync() → provides all state/methods             │
│                                                                 │
│  Methods:                                                       │
│    • handleFieldSaveSuccess(updatedSetting)                     │
│    • handleFieldDeleteSuccess(key)                              │
│    • handleBulkSave()                                           │
│    • handleRefresh()                                            │
│                                                                 │
│  Renders:                                                       │
│    • Tab navigation                                             │
│    • Footer Fields tab:                                         │
│        → maps footerSettings to <SettingField /> components     │
│    • Advanced View tab:                                         │
│        → <SettingsGroupedView />                                │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ├────────────────────────────────────┐
                          ▼                                    ▼
┌──────────────────────────────────────┐  ┌─────────────────────────────┐
│     SettingField.jsx (x14)           │  │  SettingsGroupedView.jsx    │
│                                      │  │                             │
│  Props:                              │  │  Props: none                │
│    • fieldDef: FieldDefinition       │  │  State:                     │
│    • existingValue: string           │  │    • groupedSettings: []    │
│    • existingId: number | null       │  │    • loading: boolean       │
│    • onSaveSuccess: function         │  │    • expandedCategories     │
│    • onDeleteSuccess: function       │  │                             │
│                                      │  │  Methods:                   │
│  State:                              │  │    • fetchGroupedSettings() │
│    • value: string                   │  │    • toggleCategory()       │
│    • isSaving: boolean               │  │                             │
│    • isDeleting: boolean             │  │  Uses:                      │
│    • isDirty: boolean                │  │    • settingsApi            │
│    • validationError: string | null  │  │      .getSettingsGrouped()  │
│                                      │  │                             │
│  Methods:                            │  └─────────────────────────────┘
│    • handleChange(e)                 │
│    • validate()                      │
│    • handleSave()                    │
│    • handleDeleteClick()             │
│    • handleDeleteConfirm()           │
│                                      │
│  Uses:                               │
│    • settingsApi.createSetting()     │
│    • settingsApi.updateSetting()     │
│    • settingsApi.deleteSetting()     │
│    • settingsApi.checkKeyExists()    │
│    • validateField() from constants  │
└──────────────────────────────────────┘
```

---

## File Structure

```
src/
├── components/
│   ├── Admin/
│   │   └── SettingsManagement.jsx ──┐
│   ├── SettingField.jsx              │ (used by)
│   └── SettingsGroupedView.jsx       │
│                                     │
├── pages/                            │
│   └── FooterSettings.jsx ◄──────────┘
│
├── hooks/
│   └── useSettingsSync.js
│
├── services/
│   └── settingsApi.js
│
├── constants/
│   └── settingsMap.js
│
└── lib/
    └── api.js (Axios instance)
```

---

## Data Models

### SettingDTO (from API)
```typescript
{
  id: number
  key: string
  value: string
  description: string | null
  category: string | null
  isPublic: boolean
  dataType: string | null
  createdAt: string (ISO date)
  updatedAt: string | null (ISO date)
}
```

### CreateSettingDTO (POST payload)
```typescript
{
  key: string           // 2-100 chars, required
  value: string         // required
  description?: string  // 0-500 chars
  category?: string     // 0-50 chars
  isPublic?: boolean    // default: false
  dataType?: string     // 0-50 chars
}
```

### UpdateSettingDTO (PUT payload)
```typescript
{
  id: number            // required
  key: string           // 2-100 chars, required
  value: string         // required
  description?: string  // 0-500 chars
  category?: string     // 0-50 chars
  isPublic?: boolean
  dataType?: string     // 0-50 chars
}
```

### FieldDefinition (settingsMap.js)
```typescript
{
  key: string
  label: string
  placeholder: string
  dataType: "string" | "text" | "email" | "url"
  category: string
  isPublicDefault: boolean
  description: string
  validation: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    errorMessage?: string
  }
}
```

---

This architecture ensures:
✅ Clean separation of concerns
✅ Reusable components
✅ Centralized state management
✅ Type-safe API calls
✅ Comprehensive error handling
✅ Scalable structure
