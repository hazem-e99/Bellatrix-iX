# Footer Settings - Quick Start Guide

## 🚀 Immediate Access

### 1. Start the Application
```powershell
# In PowerShell terminal
cd "e:\ITI project\Bellatrix-iX"
npm run dev
```

### 2. Navigate to Footer Settings
**Option A - Via Menu:**
1. Open browser: `http://localhost:5173`
2. Login as admin
3. Go to: **Admin Dashboard** → **Settings** → **Footer Settings** tab

**Option B - Direct URL:**
```
http://localhost:5173/admin/settings
```
(Then click the "Footer Settings" tab)

---

## 📋 What You'll See

### Two Tabs

#### 1. **Footer Fields Tab** (Main Interface)
14 fixed input fields:
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

Each field has:
- Label and description
- Input/textarea
- Save button (creates or updates)
- Delete button (if exists)

#### 2. **Advanced View Tab**
- Shows ALL settings grouped by category
- Read-only view
- Uses `GET /api/Settings/grouped`

---

## ⚡ Quick Actions

### Create a New Setting
1. Find an empty field (e.g., "Site Title")
2. Type a value
3. Click the **Save** button next to that field
4. ✅ Success toast appears

### Update an Existing Setting
1. Find a field with existing value
2. Modify the value
3. Click the **Save** button
4. ✅ Updated successfully

### Delete a Setting
1. Find a field with a value
2. Click the **Delete** button
3. Confirm in modal
4. ✅ Setting deleted

### Bulk Save (Multiple Changes)
1. Modify several fields
2. Notice "Save All (X)" button in header
3. Click **Save All**
4. ✅ All changes saved at once

### Refresh Data
1. Click the refresh icon button in header
2. ✅ Data reloaded from API

---

## 🔍 API Endpoints Used

| Action | Endpoint | Method |
|--------|----------|--------|
| Load page | `/api/Settings/public` | GET |
| Create field | `/api/Settings` | POST |
| Update field | `/api/Settings` | PUT |
| Bulk save | `/api/Settings/bulk` | PUT |
| Delete field | `/api/Settings/{id}` | DELETE |
| Advanced view | `/api/Settings/grouped` | GET |
| Check duplicate | `/api/Settings/key/{key}` | GET |

**Base URL**: `http://bellatrix.runasp.net/api`

---

## ✅ Expected Behavior

### On Page Load
- Loading spinner shows briefly
- API fetches data
- Existing settings populate fields
- Empty fields show placeholders

### On Save (New)
- Validates input
- Checks if key exists
- Creates via POST
- Shows success toast
- Delete button appears

### On Save (Update)
- Validates input
- Updates via PUT
- Shows success toast
- Dirty flag cleared

### On Bulk Save
- Collects all changed fields
- Updates existing (bulk)
- Creates new (individual)
- Refreshes data
- Shows count of saved items

### On Delete
- Shows confirmation
- Deletes via DELETE
- Clears field
- Hides delete button
- Shows success toast

---

## 🧪 Quick Test

### 5-Minute Smoke Test
```
✓ Navigate to Footer Settings
✓ Verify page loads
✓ Enter "Test Site" in Site Title
✓ Click Save → Success toast?
✓ Change value to "New Site"
✓ Click Save → Updated?
✓ Click Delete → Confirmation modal?
✓ Confirm → Field cleared?
✓ Switch to Advanced View tab
✓ Verify grouped settings display
✓ Switch back to Footer Fields
✓ Click Refresh button
```

---

## 🐛 Troubleshooting

### Page won't load
- Check if backend API is running
- Verify URL: `http://bellatrix.runasp.net/api/Settings/public`
- Check browser console for errors
- Ensure you're logged in as admin

### Save fails
- Check validation errors (toast message)
- Verify required fields are filled
- Check browser Network tab
- Ensure valid JWT token

### "401 Unauthorized"
- Token expired
- Log out and log back in
- Check localStorage: `localStorage.getItem('authToken')`

### No data showing
- Backend might be empty
- Create a few test settings
- Click Refresh button
- Check API response in Network tab

---

## 📖 Full Documentation

For detailed testing procedures, see:
- **`FOOTER_SETTINGS_TESTING_GUIDE.md`** - 10 test cases with API examples
- **`FOOTER_SETTINGS_IMPLEMENTATION_SUMMARY.md`** - Technical details

---

## 🎯 Success Criteria

You know it's working when:
- ✅ Page loads without errors
- ✅ Can create new settings
- ✅ Can update existing settings
- ✅ Can delete settings
- ✅ Bulk save works
- ✅ Advanced view shows grouped data
- ✅ Validation prevents invalid input
- ✅ Toast notifications appear
- ✅ Loading states display correctly

---

## 💡 Tips

1. **Use Bulk Save** when changing multiple fields
2. **Check Advanced View** to see all settings by category
3. **Validate before saving** - client-side validation is instant
4. **Refresh after external changes** if another user modifies settings
5. **Watch the console** for detailed API logs during development

---

## 🎉 That's It!

The Footer Settings feature is fully functional and ready to use. Start by creating some test data, then proceed to the full testing guide for comprehensive validation.

**Happy Testing! 🚀**
