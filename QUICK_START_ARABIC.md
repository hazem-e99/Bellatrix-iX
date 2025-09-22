# دليل البدء السريع - نظام إدارة الصفحات

## 🚀 البدء السريع

### 1. اختبار الاتصال أولاً

```jsx
// في أي مكون في التطبيق
import SimpleApiTest from './components/SimpleApiTest';

function TestPage() {
  return <SimpleApiTest />;
}
```

### 2. استخدام النظام الكامل

```jsx
// في App.jsx أو Router
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

### 3. استخدام الـ Hooks مباشرة

```jsx
import { usePages } from './hooks/usePages';

function MyComponent() {
  const { pages, loading, createPageWithSlug } = usePages();
  
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

## 🔧 حل المشاكل الشائعة

### مشكلة: لا توجد بيانات
**الحل:** تحقق من console المتصفح للأخطاء

### مشكلة: خطأ في الشبكة
**الحل:** تأكد من صحة URL: `http://bellatrix.runasp.net`

### مشكلة: خطأ في المصادقة
**الحل:** أضف التوكن:
```javascript
localStorage.setItem('authToken', 'your-token-here');
```

## 📁 الملفات المهمة

- `src/services/pagesService.js` - خدمة API
- `src/contexts/PageContext.jsx` - إدارة الحالة
- `src/hooks/usePages.js` - Hook للصفحات
- `src/components/PageManagement.jsx` - واجهة الإدارة
- `src/components/SimpleApiTest.jsx` - اختبار الاتصال

## 🎯 الخطوات التالية

1. اختبر الاتصال باستخدام `SimpleApiTest`
2. إذا نجح الاختبار، استخدم `PageManagement`
3. إذا لم ينجح، راجع `API_TROUBLESHOOTING_GUIDE.md`
4. تأكد من إعدادات الباك إند

## 📞 الدعم

- تحقق من console المتصفح
- استخدم مكونات الاختبار
- راجع ملفات التوثيق
- تأكد من إعدادات الخادم
