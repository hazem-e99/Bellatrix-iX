/**
 * Component Schema Validation Script
 * Checks all components for completeness and reports any issues
 */

import { aboutComponentSchemas } from "./src/data/aboutComponentSchemas.js";
import { generalComponentSchemas } from "./src/data/generalComponentSchemas.js";

// Validation results
const validationResults = {
  totalComponents: 0,
  validComponents: 0,
  componentsWithIssues: [],
  missingSchemas: [],
  incompleteSchemas: [],
  selectOptionsFixed: 0,
  totalSelectFields: 0,
};

/**
 * Validate a single component schema
 */
function validateComponentSchema(componentName, schema) {
  const issues = [];

  // Check basic schema structure
  if (!schema.componentName) {
    issues.push("Missing componentName");
  }

  if (!schema.schema || !schema.schema.properties) {
    issues.push("Missing or invalid schema.properties");
  }

  if (!schema.defaultData) {
    issues.push("Missing defaultData");
  }

  // Check for placeholder descriptions indicating incomplete setup
  if (schema.description && schema.description.includes("please configure")) {
    issues.push("Contains placeholder description - needs proper setup");
  }

  if (
    schema.defaultData &&
    schema.defaultData.description &&
    schema.defaultData.description.includes("please configure")
  ) {
    issues.push("Contains placeholder defaultData - needs proper setup");
  }

  // Check select field options
  let selectFields = 0;
  let properSelectFields = 0;

  function checkSelectFields(properties, path = "") {
    if (!properties) return;

    Object.keys(properties).forEach((key) => {
      const field = properties[key];
      const fieldPath = path ? `${path}.${key}` : key;

      if (field.formField === "select") {
        selectFields++;
        validationResults.totalSelectFields++;

        // Check if options are properly formatted (objects with value/label)
        if (field.options && Array.isArray(field.options)) {
          const hasProperFormat = field.options.every(
            (option) =>
              typeof option === "object" && option.value && option.label
          );

          if (hasProperFormat) {
            properSelectFields++;
            validationResults.selectOptionsFixed++;
          } else {
            issues.push(
              `Select field '${fieldPath}' has improper options format`
            );
          }
        } else {
          issues.push(`Select field '${fieldPath}' missing options`);
        }
      }

      // Check nested objects
      if (field.type === "object" && field.properties) {
        checkSelectFields(field.properties, fieldPath);
      }

      // Check array items
      if (field.type === "array" && field.items && field.items.properties) {
        checkSelectFields(field.items.properties, `${fieldPath}[]`);
      }
    });
  }

  if (schema.schema && schema.schema.properties) {
    checkSelectFields(schema.schema.properties);
  }

  return {
    componentName,
    issues,
    selectFields,
    properSelectFields,
  };
}

/**
 * Run validation on all components
 */
function runValidation() {
  console.log("🔍 Starting Component Schema Validation...\n");

  // Get all components from both schema files
  const allComponents = {
    ...aboutComponentSchemas,
    ...generalComponentSchemas,
  };

  validationResults.totalComponents = Object.keys(allComponents).length;

  // Validate each component
  Object.keys(allComponents).forEach((componentName) => {
    const schema = allComponents[componentName];
    const result = validateComponentSchema(componentName, schema);

    if (result.issues.length === 0) {
      validationResults.validComponents++;
      console.log(
        `✅ ${componentName} - Valid (${result.selectFields} select fields)`
      );
    } else {
      validationResults.componentsWithIssues.push(result);
      console.log(`❌ ${componentName} - Issues found:`);
      result.issues.forEach((issue) => {
        console.log(`   - ${issue}`);
      });
    }
  });

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 VALIDATION SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total Components: ${validationResults.totalComponents}`);
  console.log(`Valid Components: ${validationResults.validComponents}`);
  console.log(
    `Components with Issues: ${validationResults.componentsWithIssues.length}`
  );
  console.log(`Total Select Fields: ${validationResults.totalSelectFields}`);
  console.log(
    `Select Fields with Proper Options: ${validationResults.selectOptionsFixed}`
  );

  const validPercentage = Math.round(
    (validationResults.validComponents / validationResults.totalComponents) *
      100
  );
  const selectFixPercentage =
    validationResults.totalSelectFields > 0
      ? Math.round(
          (validationResults.selectOptionsFixed /
            validationResults.totalSelectFields) *
            100
        )
      : 100;

  console.log(`\n📈 METRICS:`);
  console.log(`Component Validity: ${validPercentage}%`);
  console.log(`Select Options Fixed: ${selectFixPercentage}%`);

  if (validationResults.componentsWithIssues.length === 0) {
    console.log("\n🎉 ALL COMPONENTS VALID! System is ready for production.");
  } else {
    console.log("\n⚠️ Issues found. Review the components listed above.");

    console.log("\n🔧 COMPONENTS NEEDING ATTENTION:");
    validationResults.componentsWithIssues.forEach((result) => {
      console.log(`- ${result.componentName}: ${result.issues.length} issues`);
    });
  }

  return validationResults;
}

// Export for use in other scripts
export { runValidation, validateComponentSchema };

// Run validation if called directly
if (typeof window !== "undefined") {
  // Browser environment
  window.validateComponents = runValidation;
  console.log("Component validation available as: validateComponents()");
} else {
  // Node environment
  runValidation();
}
