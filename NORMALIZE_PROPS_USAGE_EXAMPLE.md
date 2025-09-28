# NormalizeProps Function Usage Guide

## Problem Solved

Your React components weren't displaying data correctly because the JSON structure keys didn't match the component prop expectations:

**JSON Structure:**
```json
{
  "integrationTypes": {
    "title": "Integration Solutions",
    "items": [...]
  },
  "benefits": {
    "title": "Integration Benefits", 
    "items": [...]
  }
}
```

**Component Expected Props:**
- `IntegrationTypesSection` expects: `{ title, items }`
- `IntegrationBenefitsSection` expects: `{ title, items, benefits }`
- `PopularIntegrationsSection` expects: `{ title, platforms }`

## Solution: normalizeProps Function

The `normalizeProps` function maps JSON data to the correct component props automatically.

### Usage in PagePreview

```javascript
import { normalizeProps, validateProps } from "../../utils/normalizeProps";

// In your extractComponentData function:
const extractComponentData = (component) => {
  let rawData = {};
  
  // Parse contentJson from backend
  if (component.contentJson) {
    rawData = typeof component.contentJson === 'string' 
      ? JSON.parse(component.contentJson) 
      : component.contentJson;
  }
  
  // Use normalizeProps to map data to correct component props
  const normalizedData = normalizeProps(component.componentType, rawData);
  
  // Validate the normalized props
  const validation = validateProps(component.componentType, normalizedData);
  if (!validation.isValid) {
    console.warn(`Missing required props for ${component.componentType}:`, validation.missingProps);
  }
  
  return normalizedData;
};
```

### Component Mappings

The function handles these component types:

#### Integration Components
- **IntegrationTypesSection**: `integrationTypes.items` → `items`
- **IntegrationBenefitsSection**: `benefits.items` → `items` + `benefits`
- **PopularIntegrationsSection**: `popularIntegrations.platforms` → `platforms`

#### Payroll Components  
- **PayrollPainPointsSection**: `painPoints.items` → `painPoints`
- **PayrollBenefitsSection**: `benefits.items` → `items` + `benefits`
- **PayrollWorkflowSection**: `workflow.steps` → `steps`
- **PayrollStepperSection**: `stepper.steps` → `steps`
- **PayrollFAQSection**: `faq.faqs` → `faqs`
- **PayrollCTASection**: `cta.*` → `cta` object

#### HR Components
- **HRHeroSection**: `hero.*` → `data.hero.*`
- **HRModulesSection**: `modules.*` → `data.*`
- **HRBenefitsSection**: `benefits.items` → `items` + `benefits`

#### Training Components
- **TrainingHeroSection**: `heroContent.*` → `heroContent.*`
- **TrainingProgramsSection**: `programsSection.*` + `trainingPrograms.*` → respective props
- **TrainingWhyChooseSection**: `whyChooseSection.*` + `trainingFeatures` → respective props

### Example Transformations

#### Before (Broken):
```javascript
// JSON data
{
  "integrationTypes": {
    "title": "Integration Solutions",
    "items": [{"title": "E-commerce", "description": "..."}]
  }
}

// Component receives (WRONG):
{
  title: "Integration Types",  // ❌ Wrong title
  types: Array(4),            // ❌ Wrong key
  items: Array(0)             // ❌ Empty array
}
```

#### After (Fixed):
```javascript
// JSON data
{
  "integrationTypes": {
    "title": "Integration Solutions", 
    "items": [{"title": "E-commerce", "description": "..."}]
  }
}

// Component receives (CORRECT):
{
  title: "Integration Solutions",  // ✅ Correct title
  items: [{"title": "E-commerce", "description": "..."}]  // ✅ Correct data
}
```

### Benefits

1. **Automatic Mapping**: No more manual prop mapping for each component
2. **Consistent Data**: All components receive data in the expected format
3. **Validation**: Built-in validation to catch missing required props
4. **Fallback Support**: Graceful handling of missing or malformed data
5. **Extensible**: Easy to add new component mappings

### Adding New Components

To add support for a new component:

```javascript
// In normalizeProps.js, add to componentMappings:
'YourNewComponent': (data) => ({
  title: data.yourSection?.title || data.title || "Default Title",
  items: data.yourSection?.items || data.items || []
})
```

### Testing

Run the test script to see the function in action:

```bash
node test-normalize-props.js
```

This will show you exactly how JSON data gets transformed into the correct component props.

## Integration Complete! ✅

Your PagePreview component now automatically normalizes all JSON data to match component expectations, ensuring your UI renders correctly with the data from your backend.

