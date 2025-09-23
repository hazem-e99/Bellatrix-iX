# Page Creation Guide

## Common Page Creation Issues

### "Object reference not set to an instance of an object" Error

This error typically occurs when the backend API expects required fields in the request body, but they're missing.

## Required Fields

When creating a page using `POST /api/Pages`, ensure you include these required fields:

| Field | Type | Description | Constraints | Required |
|-------|------|-------------|-------------|----------|
| `name` | string | Page name | Length 2-100 | YES |
| `categoryId` | int | Category ID | Must exist in database | YES |
| `slug` | string | URL slug | Max length 200 | Optional |
| `metaTitle` | string | SEO title | Max length 60 | Optional |
| `metaDescription` | string | SEO description | Max length 160 | Optional |
| `isHomepage` | boolean | Set as homepage | | Optional |
| `isPublished` | boolean | Published status | | Optional |

## Example Correct Request

```javascript
// Minimal valid request
const validPage = {
  name: "About Us",  // REQUIRED
  categoryId: 1      // REQUIRED
};

// Complete request with all fields
const completePage = {
  name: "About Us",
  categoryId: 1,
  slug: "about-us",
  metaTitle: "About Our Company",
  metaDescription: "Learn more about our company history and mission",
  isHomepage: false,
  isPublished: true
};
```

## Common Causes of "Object reference" Error

1. **Missing required fields:**
   - Empty or missing `name`
   - Missing `categoryId`

2. **Wrong endpoint for components:**
   - If including components, use `/api/Pages/with-components` instead of `/api/Pages`

3. **Content serialization issues:**
   - Component `contentJson` must be stringified JSON, not raw objects

4. **Invalid category ID:**
   - Using a `categoryId` that doesn't exist in the database

## Validation in Code

The application now validates page data before sending to the API:

```javascript
validatePageData: (pageData) => {
  const errors = [];
  
  if (!pageData.name || pageData.name.length < 2) {
    errors.push('Page name must be at least 2 characters long');
  }
  
  if (pageData.categoryId === undefined || pageData.categoryId === null) {
    errors.push('Category ID is required');
  }
  
  return errors;
}
```

## Testing the Fix

Run the test script to verify the validation is working:

```bash
node test-create-page.js
```

This will validate and attempt to create a test page with the required fields.