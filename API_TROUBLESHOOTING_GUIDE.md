# دليل استكشاف أخطاء API - API Troubleshooting Guide

## 🔧 المشاكل الشائعة والحلول

### 1. مشكلة الاتصال بالباك إند

#### الأعراض:
- رسائل خطأ في الشبكة
- عدم وصول البيانات
- timeout errors

#### الحلول:

**أ) تحقق من URL الصحيح:**
```javascript
// في src/services/pagesService.js
const BASE_URL = 'http://bellatrix.runasp.net'; // تأكد من صحة هذا الرابط
```

**ب) تحقق من CORS:**
- تأكد أن الباك إند يدعم CORS
- تحقق من إعدادات الخادم

**ج) تحقق من الشبكة:**
```javascript
// اختبر الاتصال مباشرة في المتصفح
fetch('http://bellatrix.runasp.net/api/Pages')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### 2. مشاكل المصادقة (Authentication)

#### الأعراض:
- 401 Unauthorized
- 403 Forbidden

#### الحلول:

**أ) تحقق من وجود التوكن:**
```javascript
// في console المتصفح
console.log('Auth Token:', localStorage.getItem('authToken'));
```

**ب) إضافة التوكن يدوياً:**
```javascript
// في console المتصفح
localStorage.setItem('authToken', 'your-actual-token-here');
```

**ج) تحقق من صيغة التوكن:**
```javascript
// في src/services/pagesService.js
// تأكد من أن التوكن يُرسل بالشكل الصحيح
config.headers.Authorization = `Bearer ${token}`;
```

### 3. مشاكل في بنية البيانات

#### الأعراض:
- البيانات لا تظهر
- أخطاء في parsing
- undefined data

#### الحلول:

**أ) تحقق من بنية الاستجابة:**
```javascript
// أضف console.log في كل API call
console.log('API Response:', response);
console.log('Response Data:', response.data);
```

**ب) تعامل مع بنيات مختلفة:**
```javascript
// في PageContext.jsx
let pagesData = response;
if (response && typeof response === 'object') {
  if (response.data) {
    pagesData = Array.isArray(response.data) ? response.data : response.data.data;
  } else if (Array.isArray(response)) {
    pagesData = response;
  }
}
```

### 4. مشاكل في الـ Validation

#### الأعراض:
- أخطاء في إنشاء الصفحات
- رسائل validation errors

#### الحلول:

**أ) تحقق من البيانات المطلوبة:**
```javascript
// البيانات المطلوبة حسب swagger.json
{
  "name": "string", // مطلوب، 2-100 حرف
  "categoryId": 1,   // مطلوب، رقم
  "slug": "string",  // اختياري، 0-200 حرف
  "metaTitle": "string", // اختياري، 0-60 حرف
  "metaDescription": "string", // اختياري، 0-160 حرف
  "isHomepage": false,
  "isPublished": true
}
```

**ب) تحقق من الـ validation في الكود:**
```javascript
// في pagesService.js
validatePageData: (pageData) => {
  const errors = [];
  
  if (!pageData.name || pageData.name.length < 2) {
    errors.push('Page name must be at least 2 characters long');
  }
  
  if (!pageData.categoryId) {
    errors.push('Category is required');
  }
  
  return errors;
}
```

## 🧪 أدوات الاختبار

### 1. مكون اختبار الاتصال البسيط

```jsx
import SimpleApiTest from './components/SimpleApiTest';

// في أي مكان في التطبيق
<SimpleApiTest />
```

### 2. اختبار مباشر في Console

```javascript
// افتح Developer Tools > Console
// اختبر API مباشرة

// اختبار الاتصال
fetch('http://bellatrix.runasp.net/api/Pages')
  .then(response => {
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    return response.json();
  })
  .then(data => console.log('Data:', data))
  .catch(error => console.error('Error:', error));

// اختبار مع التوكن
fetch('http://bellatrix.runasp.net/api/Pages', {
  headers: {
    'Authorization': 'Bearer your-token-here',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log('Data with auth:', data))
  .catch(error => console.error('Auth error:', error));
```

### 3. اختبار إنشاء صفحة

```javascript
// في console المتصفح
const testPage = {
  name: 'Test Page',
  categoryId: 1,
  slug: 'test-page',
  metaTitle: 'Test Page Title',
  metaDescription: 'Test description',
  isPublished: false
};

fetch('http://bellatrix.runasp.net/api/Pages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token-here'
  },
  body: JSON.stringify(testPage)
})
  .then(response => response.json())
  .then(data => console.log('Created page:', data))
  .catch(error => console.error('Create error:', error));
```

## 📋 قائمة التحقق

### قبل البدء:
- [ ] تأكد من صحة URL: `http://bellatrix.runasp.net`
- [ ] تحقق من اتصال الإنترنت
- [ ] تأكد من أن الباك إند يعمل
- [ ] تحقق من إعدادات CORS

### للمصادقة:
- [ ] تحقق من وجود التوكن في localStorage
- [ ] تأكد من صيغة التوكن الصحيحة
- [ ] تحقق من صلاحية التوكن
- [ ] تأكد من إرسال التوكن في الـ headers

### للبيانات:
- [ ] تحقق من بنية الاستجابة
- [ ] تأكد من صحة البيانات المرسلة
- [ ] تحقق من الـ validation rules
- [ ] تأكد من Content-Type headers

### للواجهة:
- [ ] تحقق من console للأخطاء
- [ ] تأكد من تحميل المكونات
- [ ] تحقق من حالة loading
- [ ] تأكد من عرض الأخطاء

## 🚨 رسائل الخطأ الشائعة

### Network Error
```
Error: Network Error
```
**الحل:** تحقق من اتصال الإنترنت وصحة URL

### 401 Unauthorized
```
Error: Request failed with status code 401
```
**الحل:** تحقق من التوكن أو سجل دخول جديد

### 404 Not Found
```
Error: Request failed with status code 404
```
**الحل:** تحقق من صحة endpoint URL

### 500 Internal Server Error
```
Error: Request failed with status code 500
```
**الحل:** مشكلة في الباك إند، تحقق من الخادم

### CORS Error
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```
**الحل:** تحقق من إعدادات CORS في الباك إند

## 📞 الدعم

إذا استمرت المشاكل:

1. تحقق من console المتصفح للأخطاء
2. استخدم مكونات الاختبار المرفقة
3. تحقق من swagger.json للـ API documentation
4. تأكد من إعدادات الباك إند

## 🔄 التحديثات

للتحديثات المستقبلية:
- راقب console للأخطاء الجديدة
- اختبر API endpoints الجديدة
- حدث validation rules حسب الحاجة
- تأكد من توافق البيانات مع الباك إند
