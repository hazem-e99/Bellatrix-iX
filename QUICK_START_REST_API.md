# دليل البدء السريع - REST API فقط

## 🎯 **النظام معتمد على الباك إند الحقيقي فقط**

### **API URL:** `http://bellatrix.runasp.net`

## 🚀 **البدء في 3 خطوات**

### **1. اختبار الاتصال أولاً:**
```jsx
import SimpleApiTest from './components/SimpleApiTest';

function TestPage() {
  return <SimpleApiTest />;
}
```

### **2. استخدام النظام الكامل:**
```jsx
import { PageProvider } from './contexts/PageContext';
import PageManagement from './components/PageManagement';

function AdminPages() {
  return (
    <PageProvider>
      <PageManagement />
    </PageProvider>
  );
}
```

### **3. استخدام الـ Hooks مباشرة:**
```jsx
import { usePages } from './hooks/usePages';

function MyComponent() {
  const { pages, createPageWithSlug } = usePages();
  
  const handleCreate = async () => {
    await createPageWithSlug({
      name: 'صفحة جديدة',
      categoryId: 1,
      slug: 'new-page'
    });
  };
  
  return (
    <div>
      <button onClick={handleCreate}>إنشاء صفحة</button>
      <p>عدد الصفحات: {pages.length}</p>
    </div>
  );
}
```

## 📁 **الملفات الأساسية**

- `src/services/pagesService.js` - خدمة API
- `src/contexts/PageContext.jsx` - إدارة الحالة
- `src/hooks/usePages.js` - Hook للصفحات
- `src/components/PageManagement.jsx` - واجهة الإدارة
- `src/components/SimpleApiTest.jsx` - اختبار الاتصال

## 🔧 **إعداد المصادقة (إذا مطلوب)**

```javascript
// في console المتصفح
localStorage.setItem('authToken', 'your-jwt-token-here');
```

## 🔍 **استكشاف الأخطاء**

### **1. تحقق من الاتصال:**
- استخدم `SimpleApiTest` component
- تحقق من console المتصفح

### **2. تحقق من البيانات:**
```javascript
// في console المتصفح
fetch('http://bellatrix.runasp.net/api/Pages')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### **3. تحقق من المصادقة:**
```javascript
console.log('Auth Token:', localStorage.getItem('authToken'));
```

## 📋 **قائمة التحقق**

- [ ] تأكد من اتصال الإنترنت
- [ ] تحقق من صحة URL: `http://bellatrix.runasp.net`
- [ ] اختبر الاتصال باستخدام `SimpleApiTest`
- [ ] إذا كان هناك مصادقة، أضف التوكن
- [ ] تحقق من console المتصفح للأخطاء

## 🎯 **أمثلة سريعة**

### **إنشاء صفحة:**
```jsx
const { createPageWithSlug } = usePages();

await createPageWithSlug({
  name: 'صفحة جديدة',
  categoryId: 1,
  slug: 'new-page',
  metaTitle: 'عنوان SEO',
  metaDescription: 'وصف SEO',
  isPublished: false
});
```

### **جلب الصفحات:**
```jsx
const { pages, fetchPages } = usePages();

useEffect(() => {
  fetchPages();
}, []);
```

### **حذف صفحة:**
```jsx
const { deletePage } = usePages();

await deletePage(pageId);
```

## 🎉 **جاهز للاستخدام!**

النظام الآن معتمد بالكامل على الباك إند الحقيقي:
- ✅ اتصال مباشر بـ `http://bellatrix.runasp.net`
- ✅ جميع العمليات CRUD
- ✅ واجهة مستخدم متقدمة
- ✅ معالجة الأخطاء

ابدأ الآن! 🚀
