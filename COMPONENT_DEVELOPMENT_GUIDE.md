# Component Development Guide

## Overview

This guide ensures that all components work consistently with the dashboard editor and public page rendering. The key is maintaining proper prop structure consistency between components and the `DynamicPageRenderer`.

## 🔧 **Critical Integration Points**

### 1. DynamicPageRenderer Integration
All components must be properly mapped in `src/components/DynamicPageRenderer.jsx`:

- **Component ID Mapping**: Add your component to `getComponentPathFromId()`
- **Component Loading**: Add to `loadComponent()` function
- **Props Transformation**: Add transformation in `transformProps()` function

### 2. Props Transformation System

The `DynamicPageRenderer` uses a transformation system to ensure components receive props in their expected format:

```javascript
// Dashboard saves: { title: "Hello", plans: [...] }
// Component expects: { data: { title: "Hello", pricing: [...] } }
// Transformation handles: plans → pricing mapping
```

## 📋 **Component Development Checklist**

### ✅ **Before Creating a New Component**

1. **Determine Component Category**:
   - Payroll Components (`Payroll*Section`)
   - HR Components (`HR*Section`) 
   - Service Components (`*Section`)
   - Implementation Components (`Implementation*Section`)
   - Training Components (`Training*Section`)
   - Integration Components (`Integration*Section`)
   - Customization Components (`Customization*Section`)
   - Manufacturing Components (`Manufacturing*Section`)
   - Retail Components (`Retail*Section`)
   - About Components (`About*Section`)

2. **Design Props Structure**:
   - Use consistent naming: `title`, `subtitle`, `description`
   - For arrays: use descriptive names (`plans`, `features`, `services`, etc.)
   - For nested objects: use logical grouping (`cta`, `hero`, `pricing`)

3. **Add to DynamicPageRenderer**:
   ```javascript
   // 1. Add to idToPathMap
   'YourComponentSection': 'path/to/YourComponent',
   
   // 2. Add to componentMap
   'path/to/YourComponent': () => import('./path/to/YourComponent'),
   
   // 3. Add transformation in transformProps()
   case 'YourComponentSection':
     return {
       data: {
         title: props.title,
         subtitle: props.subtitle,
         // Map dashboard props to component expectations
       }
     };
   ```

## 🎯 **Standard Prop Patterns**

### **Hero Sections**
```javascript
// Dashboard Props
{ title, subtitle, bgVideo, bgColor, ctaButton }

// Component Expects
{ data: { hero: { title, subtitle, bgVideo, bgColor } } }
```

### **Pricing Sections**
```javascript
// Dashboard Props  
{ title, subtitle, description, plans }

// Component Expects (HR Pricing)
{ data: { title, subtitle, description, pricing: plans } }

// Component Expects (Implementation Pricing)
{ data: { title, subtitle, description, plans } }
```

### **FAQ Sections**
```javascript
// Dashboard Props
{ title, subtitle, faqs }

// Component Expects
{ faqData: { title, items: faqs } }
// OR
{ data: { title, subtitle, faqs } }
```

### **CTA Sections**
```javascript
// Dashboard Props
{ title, subtitle, buttonText }

// Component Expects
{ ctaData: { title, description: subtitle, buttonText } }
// OR  
{ data: { cta: { title, description: subtitle, buttonText } } }
```

### **Feature/Service Lists**
```javascript
// Dashboard Props
{ title, subtitle, services } // or features, modules, etc.

// Component Expects
{ data: { title, subtitle, services } }
```

## 🔄 **Transformation Rules**

### **Common Mappings**
- `subtitle` → `description` (when component expects description)
- `plans` → `pricing` (for HR pricing components)
- `faqs` → `items` (for Payroll FAQ components)
- `features` → `modules` (for HR modules)

### **Fallback Values**
Always provide fallback arrays for list props:
```javascript
features: props.features || []
services: props.services || []
plans: props.plans || []
```

## 🧪 **Testing Your Component**

### **1. Dashboard Integration**
1. Create a page with your component
2. Edit content in the dashboard
3. Save changes
4. Verify data is saved correctly

### **2. Public Page Rendering**
1. Navigate to the public page
2. Verify your edits appear correctly
3. Check browser console for errors
4. Test with different data combinations

### **3. Edge Cases**
- Test with empty arrays
- Test with missing props
- Test with malformed JSON
- Test with very long content

## 🚨 **Common Issues & Solutions**

### **Issue: Component shows default data instead of edited data**
**Solution**: Check props transformation in `DynamicPageRenderer.jsx`

### **Issue: Component crashes with undefined props**
**Solution**: Add proper fallbacks in transformation:
```javascript
title: props.title || 'Default Title'
items: props.items || []
```

### **Issue: Array props are undefined**
**Solution**: Ensure fallback arrays in transformation:
```javascript
features: props.features || props.modules || []
```

### **Issue: Nested object props missing**
**Solution**: Build nested structure in transformation:
```javascript
data: {
  hero: {
    title: props.title,
    subtitle: props.subtitle
  }
}
```

## 📝 **Example: Creating a New FAQ Component**

### **1. Component Structure**
```javascript
// src/components/NewFAQSection.jsx
const NewFAQSection = ({ data = {} }) => {
  const faqs = data.faqs || [];
  
  return (
    <section>
      <h2>{data.title}</h2>
      <p>{data.subtitle}</p>
      {faqs.map((faq, index) => (
        <div key={index}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </section>
  );
};
```

### **2. Add to DynamicPageRenderer**
```javascript
// Add to idToPathMap
'NewFAQSection': 'components/NewFAQSection',

// Add to componentMap  
'components/NewFAQSection': () => import('./components/NewFAQSection'),

// Add transformation
case 'NewFAQSection':
  return {
    data: {
      title: props.title,
      subtitle: props.subtitle,
      faqs: props.faqs || []
    }
  };
```

### **3. Test Integration**
1. Create page with NewFAQSection
2. Edit FAQ data in dashboard
3. Save and verify on public page

## 🔮 **Future-Proofing**

### **Adding New Component Types**
1. Follow the established naming convention
2. Add to all three locations in DynamicPageRenderer
3. Document the expected prop structure
4. Test with various data scenarios

### **Maintaining Consistency**
- Use the same prop names across similar components
- Follow the established data structure patterns
- Always provide fallback values
- Test edge cases thoroughly

## 📞 **Support**

If you encounter issues:
1. Check the browser console for errors
2. Verify props transformation in DynamicPageRenderer
3. Test with simple data first
4. Compare with working similar components

---

**Remember**: The key to successful component integration is consistency between the dashboard editor, the transformation system, and the component's expected props structure.
