# دليل استخدام نظام إدارة الصفحات - REST API فقط

## 🎯 **النظام معتمد على الباك إند الحقيقي فقط**

### **API Base URL:** `http://bellatrix.runasp.net`

## 🚀 **البدء السريع**

### **1. الاستخدام الأساسي:**

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

### **2. اختبار الاتصال:**

```jsx
import SimpleApiTest from './components/SimpleApiTest';

function TestPage() {
  return <SimpleApiTest />;
}
```

### **3. استخدام الـ Hooks مباشرة:**

```jsx
import { usePages } from './hooks/usePages';

function MyComponent() {
  const { pages, loading, createPageWithSlug } = usePages();
  
  const handleCreate = async () => {
    await createPageWithSlug({
      name: 'صفحة جديدة',
      categoryId: 1,
      slug: 'new-page',
      metaTitle: 'عنوان الصفحة',
      metaDescription: 'وصف الصفحة',
      isPublished: false
    });
  };
  
  return (
    <div>
      <button onClick={handleCreate}>إنشاء صفحة</button>
      <p>عدد الصفحات: {pages.length}</p>
      {loading && <p>جاري التحميل...</p>}
    </div>
  );
}
```

## 📁 **الملفات الأساسية**

- `src/services/pagesService.js` - خدمة API للباك إند
- `src/contexts/PageContext.jsx` - إدارة الحالة
- `src/hooks/usePages.js` - Hook للصفحات
- `src/hooks/usePageComponents.js` - Hook للمكونات
- `src/components/PageManagement.jsx` - واجهة الإدارة الرئيسية
- `src/components/PageEditor.jsx` - محرر الصفحات
- `src/components/ComponentManager.jsx` - إدارة المكونات

## 🔧 **إعداد المصادقة**

إذا كان الباك إند يتطلب مصادقة:

```javascript
// في console المتصفح أو في الكود
localStorage.setItem('authToken', 'your-jwt-token-here');
```

## 📋 **API Endpoints المستخدمة**

### **الصفحات:**
- `POST /api/Pages/with-components` - إنشاء صفحة مع مكونات
- `GET /api/Pages` - جلب جميع الصفحات
- `PUT /api/Pages` - تحديث صفحة
- `GET /api/Pages/{id}` - جلب صفحة بالـ ID
- `DELETE /api/Pages/{id}` - حذف صفحة
- `POST /api/Pages/{id}/publish` - نشر صفحة
- `POST /api/Pages/{id}/unpublish` - إلغاء نشر صفحة
- `POST /api/Pages/{id}/duplicate` - نسخ صفحة
- `POST /api/Pages/{id}/set-homepage` - تعيين كصفحة رئيسية
- `GET /api/Pages/search` - البحث في الصفحات
- `GET /api/Pages/slug-exists` - التحقق من وجود slug

### **مكونات الصفحات:**
- `POST /api/Pages/{pageId}/components` - إضافة مكون
- `GET /api/Pages/{pageId}/components` - جلب مكونات الصفحة
- `PUT /api/Pages/components/{componentId}` - تحديث مكون
- `DELETE /api/Pages/components/{componentId}` - حذف مكون
- `POST /api/Pages/{pageId}/components/reorder` - إعادة ترتيب المكونات

## 🎨 **أمثلة الاستخدام**

### **مثال 1: إنشاء صفحة جديدة**

```jsx
import { usePages } from './hooks/usePages';

function CreatePageForm() {
  const { createPageWithSlug, loading } = usePages();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      await createPageWithSlug({
        name: formData.get('name'),
        categoryId: parseInt(formData.get('categoryId')),
        slug: formData.get('slug'),
        metaTitle: formData.get('metaTitle'),
        metaDescription: formData.get('metaDescription'),
        isPublished: formData.get('isPublished') === 'on'
      });
      alert('تم إنشاء الصفحة بنجاح!');
    } catch (error) {
      alert('خطأ: ' + error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="اسم الصفحة" required />
      <input name="categoryId" type="number" placeholder="معرف الفئة" required />
      <input name="slug" placeholder="رابط الصفحة" />
      <input name="metaTitle" placeholder="عنوان SEO" />
      <textarea name="metaDescription" placeholder="وصف SEO" />
      <label>
        <input name="isPublished" type="checkbox" />
        نشر فوراً
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'جاري الإنشاء...' : 'إنشاء صفحة'}
      </button>
    </form>
  );
}
```

### **مثال 2: عرض قائمة الصفحات**

```jsx
import { usePages } from './hooks/usePages';

function PagesList() {
  const { pages, loading, error, deletePage, togglePagePublication } = usePages();
  
  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error}</div>;
  
  return (
    <div>
      <h2>قائمة الصفحات ({pages.length})</h2>
      {pages.map(page => (
        <div key={page.id} className="border p-4 mb-2">
          <h3>{page.name}</h3>
          <p>Slug: {page.slug}</p>
          <p>الحالة: {page.isPublished ? 'منشورة' : 'مسودة'}</p>
          <p>الصفحة الرئيسية: {page.isHomepage ? 'نعم' : 'لا'}</p>
          
          <div className="mt-2 space-x-2">
            <button 
              onClick={() => togglePagePublication(page.id)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {page.isPublished ? 'إلغاء النشر' : 'نشر'}
            </button>
            <button 
              onClick={() => deletePage(page.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### **مثال 3: إدارة مكونات الصفحة**

```jsx
import { usePageComponents } from './hooks/usePageComponents';

function PageComponentsManager({ pageId }) {
  const { 
    pageComponents, 
    loading, 
    addComponentWithName, 
    deletePageComponent 
  } = usePageComponents();
  
  const handleAddComponent = async () => {
    try {
      await addComponentWithName(pageId, {
        componentType: 'text',
        componentName: 'مكون نصي جديد',
        contentJson: JSON.stringify({
          text: 'نص تجريبي',
          style: 'default'
        })
      });
      alert('تم إضافة المكون بنجاح!');
    } catch (error) {
      alert('خطأ: ' + error.message);
    }
  };
  
  return (
    <div>
      <h3>مكونات الصفحة</h3>
      <button onClick={handleAddComponent} className="bg-green-500 text-white px-3 py-1 rounded">
        إضافة مكون
      </button>
      
      {pageComponents.map(component => (
        <div key={component.id} className="border p-2 mb-2">
          <p>{component.componentName}</p>
          <p>النوع: {component.componentType}</p>
          <button 
            onClick={() => deletePageComponent(component.id)}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
          >
            حذف
          </button>
        </div>
      ))}
    </div>
  );
}
```

## 🔍 **استكشاف الأخطاء**

### **1. تحقق من الاتصال:**
```jsx
import SimpleApiTest from './components/SimpleApiTest';
<SimpleApiTest />
```

### **2. تحقق من console المتصفح:**
- افتح Developer Tools > Console
- ستجد logs مفصلة لكل طلب API

### **3. تحقق من المصادقة:**
```javascript
console.log('Auth Token:', localStorage.getItem('authToken'));
```

### **4. تحقق من البيانات:**
```javascript
// في console المتصفح
fetch('http://bellatrix.runasp.net/api/Pages')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## 📞 **الدعم**

إذا واجهت مشاكل:

1. **تحقق من console المتصفح للأخطاء**
2. **استخدم `SimpleApiTest` لاختبار الاتصال**
3. **تأكد من صحة URL: `http://bellatrix.runasp.net`**
4. **تحقق من اتصال الإنترنت**
5. **إذا كان هناك مصادقة، تأكد من وجود التوكن**

## 🎉 **الخلاصة**

النظام الآن معتمد بالكامل على الباك إند الحقيقي:
- ✅ اتصال مباشر بـ `http://bellatrix.runasp.net`
- ✅ جميع العمليات CRUD تعمل مع API الحقيقي
- ✅ إدارة الصفحات والمكونات كاملة
- ✅ واجهة مستخدم متقدمة
- ✅ معالجة الأخطاء والتحميل

جاهز للاستخدام! 🚀
