# Contact Form Implementation

## نظرة عامة
تم تطوير نموذج الاتصال ليتكامل مع API الخاص بـ Bellatrix لإرسال رسائل الاتصال الجديدة.

## الملفات المطلوبة

### 1. `src/services/contactApi.js`
- خدمة API لإرسال رسائل الاتصال
- يحتوي على جميع الدوال المطلوبة للتفاعل مع ContactMessages API
- يتضمن validation ومعالجة الأخطاء

### 2. `src/components/ContactForm.jsx` (محدث)
- نموذج الاتصال الرئيسي
- يدعم state management
- validation شامل
- تكامل مع API

## API Endpoint

```
POST http://bellatrix.runasp.net/api/ContactMessages/submit
```

## البيانات المطلوبة

### البيانات الإلزامية:
- **fullName**: الاسم الكامل (مثال: "أحمد محمد")
- **email**: البريد الإلكتروني (مثال: "ahmed@example.com")
- **industry**: المجال الصناعي (رقم من 0 إلى 8)
- **country**: البلد (رقم من 0 إلى 999)
- **message**: الرسالة (10 أحرف على الأقل)

### البيانات الاختيارية:
- **phoneNumber**: رقم الهاتف
- **companyName**: اسم الشركة

## قيم المجال الصناعي (Industry)

| القيمة | النص |
|--------|------|
| 0 | Select Industry |
| 1 | Manufacturing |
| 2 | Retail & E-commerce |
| 3 | Healthcare |
| 4 | Finance & Banking |
| 5 | Technology |
| 6 | Professional Services |
| 7 | Non-Profit |
| 8 | Other |

## قيم البلد (Country)

| القيمة | النص |
|--------|------|
| 0 | Select Country |
| 65 | Egypt (مصر) |
| 190 | United Arab Emirates (الإمارات) |
| 191 | United Kingdom (بريطانيا) |
| 192 | United States (أمريكا) |
| 1 | Canada |
| 2 | Australia |
| 3 | Germany |
| 4 | France |
| 5 | Saudi Arabia |
| 6 | Other |

## مثال على البيانات المرسلة

```json
{
  "fullName": "محمد أحمد",
  "email": "mohamed@example.com",
  "phoneNumber": "+201234567890",
  "companyName": "شركتي للتكنولوجيا",
  "industry": 5,
  "country": 65,
  "message": "أرغب في الاستفسار عن خدماتكم التقنية المتاحة لشركتنا الناشئة"
}
```

## الاستخدام

### استخدام أساسي:
```jsx
import ContactForm from './components/ContactForm';

function App() {
  return (
    <ContactForm />
  );
}
```

### استخدام متقدم مع callback:
```jsx
import ContactForm from './components/ContactForm';
import { toast } from 'react-hot-toast';

function App() {
  const handleSubmit = (result) => {
    console.log('Form submitted:', result);
    toast.success('تم إرسال الرسالة بنجاح!');
  };

  return (
    <ContactForm onSubmit={handleSubmit} />
  );
}
```

### تخصيص الحقول:
```jsx
const customContactFields = [
  { 
    label: "الاسم الكامل *", 
    type: "text", 
    placeholder: "أدخل اسمك الكامل", 
    required: true, 
    name: "fullName" 
  },
  { 
    label: "البريد الإلكتروني *", 
    type: "email", 
    placeholder: "example@domain.com", 
    required: true, 
    name: "email" 
  },
];

<ContactForm 
  contactFields={customContactFields}
  contactInfoTitle="معلومات الاتصال"
  submitText="إرسال الرسالة"
/>
```

## المميزات

### ✅ التحقق من البيانات (Validation)
- التحقق من الحقول المطلوبة
- التحقق من طول الرسالة (10 أحرف على الأقل)
- التحقق من اختيار المجال الصناعي والبلد
- التحقق من صيغة البريد الإلكتروني

### ✅ معالجة الأخطاء
- رسائل خطأ باللغة العربية
- معالجة أخطاء الشبكة
- معالجة أخطاء الخادم
- رسائل نجاح واضحة

### ✅ تجربة المستخدم
- حالة loading أثناء الإرسال
- تعطيل الزر أثناء الإرسال
- إعادة تعيين النموذج بعد الإرسال الناجح
- رسائل toast للتواصل مع المستخدم

### ✅ المرونة
- إمكانية تخصيص الحقول
- إمكانية تخصيص النصوص
- callback function للتعامل مع النتائج
- دعم البيانات الاختيارية

## التكامل مع النظام

### Toast Notifications
يستخدم النموذج `react-hot-toast` لعرض الرسائل:
```bash
npm install react-hot-toast
```

### Axios
يستخدم `axios` لإرسال الطلبات:
```bash
npm install axios
```

## الاختبار

يمكنك اختبار النموذج باستخدام:

```jsx
import ContactFormExample from './components/examples/ContactFormExample';

// استخدم ContactFormExample لرؤية النموذج في العمل
```

## ملاحظات مهمة

1. **المجال الصناعي والبلد**: يجب إرسال القيم الرقمية وليس النصوص
2. **الرسالة**: يجب أن تكون 10 أحرف على الأقل
3. **البريد الإلكتروني**: يجب أن يكون بصيغة صحيحة
4. **معالجة الأخطاء**: جميع الأخطاء تُعرض باللغة العربية
5. **الأمان**: البيانات تُرسل عبر HTTPS

## استكشاف الأخطاء

### خطأ في الإرسال:
- تأكد من اتصال الإنترنت
- تحقق من صحة البيانات المدخلة
- راجع console للأخطاء التفصيلية

### خطأ في التحقق:
- تأكد من ملء جميع الحقول المطلوبة
- تحقق من اختيار المجال الصناعي والبلد
- تأكد من أن الرسالة 10 أحرف على الأقل

## الدعم

للمساعدة أو الاستفسارات، يرجى التواصل مع فريق التطوير.
