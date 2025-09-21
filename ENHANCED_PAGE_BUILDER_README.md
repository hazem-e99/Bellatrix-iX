# Enhanced Page Builder - نظام إنشاء الصفحات المحسن

## نظرة عامة

تم إنشاء نظام محسن لإنشاء الصفحات يتيح للمديرين إنشاء صفحات ديناميكية مع إمكانية تخصيص كل سيكشن وإدخال البيانات المطلوبة.

## الميزات الجديدة

### 1. Enhanced Page Builder (`src/components/Admin/EnhancedPageBuilder.jsx`)
- واجهة مستخدم محسنة مع خطوات واضحة
- إمكانية إضافة وتخصيص السيكشنز المختلفة
- نظام معاينة مباشر للصفحة
- دعم للبيانات المعقدة (مصفوفات، كائنات متداخلة)

### 2. Section Data Editor (`src/components/Admin/SectionDataEditor.jsx`)
- محرر بيانات ديناميكي لكل سيكشن
- نماذج ذكية تتكيف مع نوع البيانات
- التحقق من صحة البيانات
- دعم للمصفوفات والكائنات المتداخلة

### 3. Page Preview (`src/components/Admin/PagePreview.jsx`)
- معاينة مباشرة للصفحة قبل الحفظ
- تحميل ديناميكي للمكونات
- عرض تفاعلي للمحتوى

## هيكل البيانات المطلوب

النظام يرسل البيانات للباك إند بالشكل التالي:

```json
{
  "name": "string",
  "categoryId": 0,
  "slug": "string",
  "metaTitle": "string",
  "metaDescription": "string",
  "isHomepage": true,
  "isPublished": true,
  "components": [
    {
      "componentType": "string",
      "componentName": "string",
      "contentJson": "string",
      "orderIndex": 0
    }
  ]
}
```

## المكونات المدعومة

### Hero Sections
- `HeroSection` - سيكشن البطل الأساسي
- `HRHeroSection` - سيكشن البطل لـ HR
- `PayrollHeroSection` - سيكشن البطل للرواتب

### Content Sections
- `HRModulesSection` - عرض وحدات HR
- `ServiceGrid` - شبكة الخدمات
- `ImplementationProcessSection` - عملية التنفيذ

### Pricing Sections
- `HRPricingSection` - أسعار HR

### FAQ Sections
- `PayrollFAQSection` - أسئلة شائعة للرواتب

### CTA Sections
- `PayrollCTASection` - دعوة للعمل للرواتب

### About Sections
- `AboutMissionSection` - مهمة الشركة
- `AboutTeamSection` - فريق العمل

## كيفية الاستخدام

### 1. الوصول للنظام
- اذهب إلى `/admin/pages`
- اضغط على "Enhanced Page Builder"

### 2. إنشاء صفحة جديدة
1. **الخطوة الأولى**: أدخل تفاصيل الصفحة الأساسية
   - اسم الصفحة
   - URL Slug
   - معلومات SEO
   - Category ID

2. **الخطوة الثانية**: أضف السيكشنز
   - اختر من المكونات المتاحة
   - اضغط على أيقونة التعديل لتخصيص البيانات
   - استخدم المعاينة لرؤية النتيجة

3. **الخطوة الثالثة**: المراجعة والنشر
   - راجع ملخص الصفحة
   - اعرض JSON النهائي
   - احفظ كمسودة أو انشر مباشرة

### 3. تخصيص بيانات السيكشن
- اضغط على أيقونة التعديل (✏️) بجانب أي سيكشن
- أدخل البيانات المطلوبة
- استخدم النماذج الديناميكية لإضافة العناصر
- احفظ التغييرات

### 4. معاينة الصفحة
- اضغط على "Preview Page" في أي وقت بعد إضافة سيكشنز
- شاهد كيف ستظهر الصفحة للمستخدمين
- تأكد من أن كل شيء يعمل بشكل صحيح

## التحديثات على API

تم تحديث `/api/pages` POST endpoint لاستقبال البيانات الجديدة:

```javascript
// Enhanced page builder format
if (data && data.components && Array.isArray(data.components)) {
  pageData = {
    name: data.name || sanitizedName,
    categoryId: data.categoryId || 0,
    slug: data.slug || sanitizedName,
    metaTitle: data.metaTitle || "",
    metaDescription: data.metaDescription || "",
    isHomepage: data.isHomepage || false,
    isPublished: data.isPublished || false,
    components: data.components.map(component => ({
      componentType: component.componentType,
      componentName: component.componentName,
      contentJson: component.contentJson,
      orderIndex: component.orderIndex
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}
```

## الملفات المضافة/المحدثة

### ملفات جديدة
- `src/components/Admin/EnhancedPageBuilder.jsx`
- `src/components/Admin/SectionDataEditor.jsx`
- `src/components/Admin/PagePreview.jsx`

### ملفات محدثة
- `src/App.jsx` - إضافة المسار الجديد
- `src/components/Admin/PagesManagement.jsx` - إضافة رابط للنظام الجديد
- `server.js` - تحديث API

## المسارات الجديدة

- `/admin/pages/enhanced-create` - نظام إنشاء الصفحات المحسن

## المتطلبات

- React 18+
- React Router DOM
- Framer Motion
- Heroicons
- Tailwind CSS

## الدعم

النظام يدعم:
- البيانات المعقدة (مصفوفات، كائنات متداخلة)
- التحقق من صحة البيانات
- المعاينة المباشرة
- الحفظ كمسودة أو نشر مباشر
- التحرير الديناميكي للمحتوى

## ملاحظات مهمة

1. تأكد من أن جميع المكونات المطلوبة موجودة في المشروع
2. النظام يدعم التحديثات المستقبلية بسهولة
3. يمكن إضافة مكونات جديدة بسهولة من خلال تحديث `availableComponents`
4. البيانات محفوظة في ملفات JSON في مجلد `public/data/`
