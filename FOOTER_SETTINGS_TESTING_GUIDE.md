# Footer Settings Feature - Manual Testing Guide

## 📋 Overview
This guide provides comprehensive manual testing procedures for the **Footer Settings** feature in the admin dashboard. The feature integrates with all Settings API endpoints defined in the Swagger specification.

---

## 🚀 Setup Instructions

### Prerequisites
1. **Backend API Running**: Ensure the backend API is accessible at `http://bellatrix.runasp.net/api`
2. **Admin Access**: You must be logged in with admin credentials
3. **Browser**: Modern browser (Chrome, Firefox, Edge recommended)

### Starting the Application
```powershell
# Navigate to project directory
cd "e:\ITI project\Bellatrix-iX"

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

### Accessing the Feature
1. Open browser to `http://localhost:5173` (or your configured port)
2. Navigate to: **Admin Dashboard → Settings → General → Footer Settings**
3. Alternative direct URL: `http://localhost:5173/admin/settings/footer`

---

## 🔍 Test Cases

### Test Case 1: Initial Page Load
**Objective**: Verify that the page loads correctly and fetches data from the API.

**Steps**:
1. Navigate to the Footer Settings page
2. Observe the loading spinner
3. Wait for data to load

**Expected Results**:
- ✅ Loading spinner displays
- ✅ API calls are made in this order:
  - `GET /api/Settings/public` (primary)
  - `GET /api/Settings/public/dictionary` (optional)
- ✅ Fixed input fields are displayed:
  - Site Title
  - Footer Text
  - Company Name
  - Contact Email
  - Contact Phone
  - Business Address
  - Facebook URL
  - Twitter URL
  - LinkedIn URL
  - Instagram URL
  - YouTube URL
  - Copyright Text
  - Privacy Policy URL
  - Terms of Service URL
- ✅ Existing values are prefilled from API response
- ✅ Empty fields show placeholders

**API Request Example**:
```http
GET http://bellatrix.runasp.net/api/Settings/public
Authorization: Bearer <your-token>
```

**Expected Response Structure**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "key": "siteTitle",
      "value": "My Website",
      "description": "Main website title",
      "category": "footer",
      "isPublic": true,
      "dataType": "string",
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-15T12:00:00Z"
    }
  ],
  "message": "Settings retrieved successfully",
  "timestamp": "2025-01-15T12:30:00Z"
}
```

---

### Test Case 2: Create New Setting (POST)
**Objective**: Test creating a new setting that doesn't exist in the database.

**Precondition**: Ensure the key doesn't exist (e.g., delete "siteTitle" via API or database).

**Steps**:
1. Locate the "Site Title" field
2. Enter a value: `"Bellatrix Solutions"`
3. Click the individual **Save** button for that field
4. Observe the toast notification

**Expected Results**:
- ✅ System checks if key exists via `GET /api/Settings/key/siteTitle`
- ✅ If not exists, calls `POST /api/Settings`
- ✅ Success toast: "Site Title created successfully"
- ✅ Field is no longer marked as dirty
- ✅ Delete button appears (since it now has an ID)

**API Request Example**:
```http
POST http://bellatrix.runasp.net/api/Settings
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "key": "siteTitle",
  "value": "Bellatrix Solutions",
  "description": "Main website title displayed in footer",
  "category": "footer",
  "isPublic": true,
  "dataType": "string"
}
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "id": 42,
    "key": "siteTitle",
    "value": "Bellatrix Solutions",
    "description": "Main website title displayed in footer",
    "category": "footer",
    "isPublic": true,
    "dataType": "string",
    "createdAt": "2025-01-15T12:35:00Z",
    "updatedAt": null
  },
  "message": "Setting created successfully"
}
```

---

### Test Case 3: Update Existing Setting (PUT)
**Objective**: Test updating an existing setting.

**Precondition**: Setting must already exist with an ID.

**Steps**:
1. Locate a field that already has a value (e.g., "Contact Email")
2. Modify the value: `"newemail@example.com"`
3. Click the individual **Save** button
4. Observe the toast notification

**Expected Results**:
- ✅ Calls `PUT /api/Settings`
- ✅ Success toast: "Contact Email updated successfully"
- ✅ Field is no longer marked as dirty
- ✅ Updated value is reflected in UI

**API Request Example**:
```http
PUT http://bellatrix.runasp.net/api/Settings
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "id": 5,
  "key": "email",
  "value": "newemail@example.com",
  "description": "Primary contact email address",
  "category": "footer",
  "isPublic": true,
  "dataType": "email"
}
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "id": 5,
    "key": "email",
    "value": "newemail@example.com",
    "description": "Primary contact email address",
    "category": "footer",
    "isPublic": true,
    "dataType": "email",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-15T12:40:00Z"
  },
  "message": "Setting updated successfully"
}
```

---

### Test Case 4: Bulk Update (PUT /bulk)
**Objective**: Test updating multiple settings at once.

**Steps**:
1. Modify several fields:
   - Site Title: `"Updated Title"`
   - Footer Text: `"Updated footer text"`
   - Contact Email: `"bulk@example.com"`
2. Observe that the **Save All** button shows count: `"Save All (3)"`
3. Click **Save All** button
4. Wait for completion

**Expected Results**:
- ✅ Items with IDs are collected into an array
- ✅ Calls `PUT /api/Settings/bulk` with array payload
- ✅ Items without IDs are created via `POST /api/Settings` individually
- ✅ Success toast: "Successfully saved 3 settings"
- ✅ All dirty flags are cleared
- ✅ Data is refreshed from `GET /api/Settings/public`

**API Request Example (Bulk Update)**:
```http
PUT http://bellatrix.runasp.net/api/Settings/bulk
Authorization: Bearer <your-token>
Content-Type: application/json

[
  {
    "id": 1,
    "key": "siteTitle",
    "value": "Updated Title",
    "description": "Main website title",
    "category": "footer",
    "isPublic": true,
    "dataType": "string"
  },
  {
    "id": 2,
    "key": "footerText",
    "value": "Updated footer text",
    "description": "Footer description",
    "category": "footer",
    "isPublic": true,
    "dataType": "text"
  }
]
```

**Expected Response**:
```json
{
  "success": true,
  "data": true,
  "message": "Bulk update completed successfully"
}
```

---

### Test Case 5: Delete Setting (DELETE)
**Objective**: Test deleting an existing setting.

**Precondition**: Setting must have an ID.

**Steps**:
1. Locate a field with existing data (has Delete button)
2. Click the **Delete** button
3. Confirm deletion in the modal
4. Observe the result

**Expected Results**:
- ✅ Confirmation modal appears
- ✅ Calls `DELETE /api/Settings/{id}`
- ✅ Success toast: "Contact Phone deleted successfully"
- ✅ Field value is cleared
- ✅ Delete button disappears (no ID)
- ✅ Field becomes available for new creation

**API Request Example**:
```http
DELETE http://bellatrix.runasp.net/api/Settings/7
Authorization: Bearer <your-token>
```

**Expected Response**:
```json
{
  "success": true,
  "data": true,
  "message": "Setting deleted successfully"
}
```

---

### Test Case 6: Advanced View (Grouped Settings)
**Objective**: Test the Advanced View tab that displays settings grouped by category.

**Steps**:
1. Click the **Advanced View** tab
2. Wait for data to load
3. Observe category groups

**Expected Results**:
- ✅ Calls `GET /api/Settings/grouped`
- ✅ Settings are displayed grouped by category
- ✅ Categories are collapsible/expandable
- ✅ Each setting shows:
  - Key
  - Value
  - Description
  - Data Type
  - Public/Private status
  - Created/Updated timestamps

**API Request Example**:
```http
GET http://bellatrix.runasp.net/api/Settings/grouped
Authorization: Bearer <your-token>
```

**Expected Response**:
```json
{
  "success": true,
  "data": [
    {
      "category": "footer",
      "settings": [
        {
          "id": 1,
          "key": "siteTitle",
          "value": "Bellatrix",
          "description": "Main title",
          "category": "footer",
          "isPublic": true,
          "dataType": "string",
          "createdAt": "2025-01-01T00:00:00Z",
          "updatedAt": null
        }
      ]
    },
    {
      "category": "general",
      "settings": [...]
    }
  ]
}
```

---

### Test Case 7: Field Validation
**Objective**: Test client-side validation for different field types.

**Email Field Validation**:
1. Enter invalid email: `"notanemail"`
2. Click Save
3. **Expected**: Error toast: "Validation failed: Please enter a valid email address"

**URL Field Validation**:
1. Enter invalid URL in Facebook field: `"not-a-url"`
2. Click Save
3. **Expected**: Error toast: "Validation failed: Please enter a valid URL..."

**Required Field Validation**:
1. Clear the "Site Title" field (required)
2. Click Save
3. **Expected**: Error toast: "Validation failed: Site Title is required"

**Max Length Validation**:
1. Enter 101 characters in "Site Title" (max: 100)
2. Click Save
3. **Expected**: Error toast: "Validation failed: Site Title must not exceed 100 characters"

---

### Test Case 8: Duplicate Key Detection
**Objective**: Test that duplicate keys are prevented.

**Steps**:
1. Delete an existing setting (e.g., "siteTitle")
2. Reload the page
3. Enter a new value for "Site Title"
4. Click Save
5. Without reloading, try to save again

**Expected Results**:
- ✅ First save: Creates successfully via `POST`
- ✅ System checks via `GET /api/Settings/key/siteTitle`
- ✅ If exists: Error toast: "Setting with key 'siteTitle' already exists. Please refresh the page."

---

### Test Case 9: Error Handling - 500 Server Error
**Objective**: Test retry logic on server errors.

**Steps**:
1. Simulate 500 error (temporarily stop backend or use network throttling)
2. Navigate to Footer Settings
3. Observe behavior

**Expected Results**:
- ✅ First attempt fails
- ✅ Automatic retry after 2 seconds
- ✅ If retry fails, error message displays
- ✅ Retry button available

---

### Test Case 10: Refresh Functionality
**Objective**: Test manual refresh of settings data.

**Steps**:
1. Load Footer Settings page
2. Modify a field but don't save
3. Click the **Refresh** button (circular arrow icon)

**Expected Results**:
- ✅ Calls `GET /api/Settings/public` again
- ✅ All fields reset to API values
- ✅ Dirty flags are cleared
- ✅ Success toast: "Settings refreshed"

---

## 🔌 API Endpoints Coverage

### ✅ Implemented and Tested
| Method | Endpoint | Usage | Test Case |
|--------|----------|-------|-----------|
| GET | `/api/Settings/public` | Load initial data | TC1 |
| GET | `/api/Settings/public/dictionary` | Quick lookup (optional) | TC1 |
| GET | `/api/Settings` | Admin fetch all | - |
| GET | `/api/Settings/grouped` | Advanced view | TC6 |
| GET | `/api/Settings/dictionary` | Admin dictionary | - |
| GET | `/api/Settings/key/{key}` | Check existence | TC2, TC8 |
| GET | `/api/Settings/{id}` | Fetch by ID | - |
| POST | `/api/Settings` | Create new setting | TC2 |
| PUT | `/api/Settings` | Update existing | TC3 |
| PUT | `/api/Settings/bulk` | Bulk update | TC4 |
| DELETE | `/api/Settings/{id}` | Delete setting | TC5 |
| GET | `/api/Settings/category/{category}` | Fetch by category | - |

### ❌ Not Available (Per Swagger)
- `/api/Settings/search` - Not in swagger, replaced by `/grouped`
- `/api/Settings/exists` - Not in swagger, using `/key/{key}` instead

---

## 🐛 Common Issues and Solutions

### Issue 1: "401 Unauthorized"
**Cause**: Missing or expired authentication token.
**Solution**:
1. Log out and log back in
2. Check browser console for auth errors
3. Verify token in `localStorage`:
```javascript
console.log(localStorage.getItem('authToken'));
```

### Issue 2: Settings not loading
**Cause**: Backend API not running or incorrect URL.
**Solution**:
1. Verify API URL in `src/lib/api.js`
2. Check if backend is running: `http://bellatrix.runasp.net/api/Settings/public`
3. Check browser Network tab for failed requests

### Issue 3: Validation errors not showing
**Cause**: Validation regex might be too strict or misconfigured.
**Solution**:
1. Check `src/constants/settingsMap.js` validation rules
2. Test regex patterns in browser console:
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(emailRegex.test('test@example.com')); // should be true
```

### Issue 4: Bulk save partially fails
**Cause**: Mixed success/failure in bulk operations.
**Solution**:
1. Check browser console for detailed errors
2. Verify each item has required fields (id, key, value)
3. Check API response for specific error messages

---

## 📊 Testing Checklist

### Functional Testing
- [ ] Page loads successfully
- [ ] All 14 footer fields are displayed
- [ ] Existing values are prefilled
- [ ] Create new setting (POST)
- [ ] Update existing setting (PUT)
- [ ] Bulk update (PUT /bulk)
- [ ] Delete setting (DELETE)
- [ ] Advanced view tab works
- [ ] Grouped settings display correctly
- [ ] Refresh button reloads data

### Validation Testing
- [ ] Email validation works
- [ ] URL validation works
- [ ] Required field validation works
- [ ] Max length validation works
- [ ] Phone validation works
- [ ] Duplicate key detection works

### Error Handling
- [ ] 401 Unauthorized handled correctly
- [ ] 500 Server Error triggers retry
- [ ] Network errors show user-friendly messages
- [ ] Invalid API responses handled gracefully

### UI/UX Testing
- [ ] Loading spinner displays
- [ ] Toast notifications appear
- [ ] Dirty tracking works (Save All button count)
- [ ] Tab switching is smooth
- [ ] Buttons are disabled during save
- [ ] Delete confirmation modal works
- [ ] Responsive design on mobile

### Performance Testing
- [ ] Initial load under 3 seconds
- [ ] Bulk save completes in reasonable time
- [ ] No memory leaks (use Chrome DevTools)
- [ ] API timeout handling (15 seconds)

---

## 🔧 Developer Tools

### Useful Console Commands
```javascript
// Check current settings state
localStorage.getItem('authToken');

// Force reload settings
window.location.reload();

// Clear all localStorage
localStorage.clear();

// Test API directly
fetch('http://bellatrix.runasp.net/api/Settings/public', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
  }
})
.then(r => r.json())
.then(console.log);
```

### Network Debugging
1. Open Chrome DevTools (F12)
2. Navigate to **Network** tab
3. Filter by "Settings" to see all API calls
4. Click on a request to view:
   - Request headers (Authorization)
   - Request payload
   - Response status
   - Response body

---

## 📞 Support

If you encounter issues not covered in this guide:
1. Check browser console for errors
2. Verify backend logs
3. Review `src/services/settingsApi.js` for API implementation
4. Contact the development team with:
   - Browser console errors
   - Network request/response details
   - Steps to reproduce

---

## ✅ Sign-off

**Tester Name**: ___________________  
**Date**: ___________________  
**Test Environment**: ___________________  
**Result**: [ ] Pass [ ] Fail [ ] Partial  

**Notes**:
_______________________________________________
_______________________________________________
_______________________________________________
