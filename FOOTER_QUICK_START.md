# 🚀 Quick Start: Footer Settings Management

## 1️⃣ Access the Settings Page

Navigate to your admin dashboard and go to **Settings** → **Footer Information** tab.

## 2️⃣ Fill in Your Footer Data

### Required Fields (must be filled):
- **Company Name** - e.g., "Bellatrix"
- **Company Email** - e.g., "info@bellatrix.com"

### Optional Fields:
- Company Tagline
- Company Address
- Company Phone
- Quick Links (up to 3)
- Services (up to 5)
- Social Media URLs (Facebook, Twitter, LinkedIn)

## 3️⃣ Save Your Settings

Click the **"Save Footer Settings"** button at the bottom.

## 4️⃣ Use in Your Application

### Option A: Use the Pre-Built Footer Component

```jsx
import DynamicFooter from './components/Footer/DynamicFooter';

function App() {
  return (
    <div>
      {/* Your page content */}
      <DynamicFooter />
    </div>
  );
}
```

### Option B: Fetch Data Manually

```javascript
import { fetchPublicFooterSettings } from './utils/footerApi';

const footerData = await fetchPublicFooterSettings();
console.log(footerData.company_name); // "Bellatrix"
```

### Option C: Direct API Call

```javascript
import api from '../lib/api';

const response = await api.get('/Settings/category/footer');
const footerData = response.data.data;
```

**Note**: The base URL (`http://bellatrix.runasp.net/api`) is already configured, so use `/Settings/...` paths (not `/api/Settings/...`).

## ✅ That's It!

Your footer is now completely dynamic and can be updated anytime through the admin panel without touching code!

## 📝 Example Response

```json
{
  "company_name": "Bellatrix",
  "company_email": "info@bellatrix.com",
  "company_phone": "+1 (555) 123-4567",
  "company_address": "123 Business St, City",
  "company_tagline": "Your Success Partner",
  "footer_link_1_label": "About Us",
  "footer_link_1_url": "https://bellatrix.com/about",
  "footer_service_1": "Oracle NetSuite Implementation",
  "footer_service_2": "Business Consulting",
  "social_facebook": "https://facebook.com/bellatrix",
  "social_twitter": "https://twitter.com/bellatrix",
  "social_linkedin": "https://linkedin.com/company/bellatrix"
}
```

## 🎯 Key Benefits

✅ **No Deployment Needed** - Update footer instantly  
✅ **Multi-Site Ready** - Same API for all your apps  
✅ **Type-Safe** - Full TypeScript/Swagger support  
✅ **Cached** - Fast performance  
✅ **Validated** - Email & URL validation built-in  

---

**Need Help?** Check `FOOTER_SETTINGS_IMPLEMENTATION.md` for detailed documentation.
