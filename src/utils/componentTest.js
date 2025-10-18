/**
 * Simple Component Coverage Check
 * Quick verification that components have proper schemas
 */

import { aboutComponentSchemas } from "./src/data/aboutComponentSchemas.js";
import { generalComponentSchemas } from "./src/data/generalComponentSchemas.js";

// List of all known components (manually maintained)
const ALL_COMPONENTS = [
  // About Components (32 components with schemas)
  "Mission",
  "Vision",
  "Values",
  "TeamIntro",
  "TeamShowcase",
  "CompanyStats",
  "Certifications",
  "Awards",
  "Timeline",
  "OurStory",
  "Leadership",
  "Culture",
  "Offices",
  "Careers",
  "Benefits",
  "Training",
  "Innovation",
  "Sustainability",
  "Community",
  "Press",
  "Blog",
  "Resources",
  "FAQ",
  "Support",
  "Privacy",
  "Terms",
  "Accessibility",
  "Sitemap",
  "Contact",
  "Newsletter",
  "Social",
  "Feedback",

  // Landing Page Components
  "Hero",
  "Services",
  "Industries",
  "CTA",
  "Testimonials",
  "Partners",
  "Features",
  "Pricing",
  "Demo",
  "WhyChooseUs",
  "Process",
  "GetStarted",

  // Manufacturing Components
  "ManufacturingHero",
  "ManufacturingIndustryStats",
  "ManufacturingProcess",
  "ManufacturingBenefits",
  "ManufacturingTestimonials",
  "ManufacturingCTA",

  // Retail Components
  "RetailHero",
  "RetailHeroSection",
  "RetailFeatures",
  "RetailBenefits",
  "RetailTestimonials",
  "RetailCTA",
  "RetailProcess",
  "RetailStats",

  // Services Components
  "ServiceGrid",
  "ImplementationHero",
  "IntegrationTypes",
  "Training",
  "Customization",
  "Migration",
  "Analytics",
  "Reporting",
  "Consulting",

  // Common Components
  "Header",
  "Footer",
  "Navigation",
  "Breadcrumb",
  "SearchBar",
  "LoadingSpinner",
  "ErrorBoundary",
  "Modal",
  "Tooltip",
  "Notification",
  "Pagination",
  "DataTable",
  "FormField",
  "Button",
  "Card",
  "Badge",
  "Avatar",
  "Icon",
];

/**
 * Check component schema coverage
 */
function checkComponentCoverage() {
  console.log("🔍 Checking Component Schema Coverage...\n");

  const results = {
    total: ALL_COMPONENTS.length,
    withSchemas: 0,
    withoutSchemas: 0,
    aboutSchemas: 0,
    generalSchemas: 0,
    missingComponents: [],
  };

  ALL_COMPONENTS.forEach((componentName) => {
    let hasSchema = false;

    // Check in aboutComponentSchemas
    if (aboutComponentSchemas[componentName]) {
      results.aboutSchemas++;
      results.withSchemas++;
      hasSchema = true;
      console.log(`✅ ${componentName} - About Schema`);
    }
    // Check in generalComponentSchemas
    else if (generalComponentSchemas[componentName]) {
      results.generalSchemas++;
      results.withSchemas++;
      hasSchema = true;
      console.log(`✅ ${componentName} - General Schema`);
    }

    if (!hasSchema) {
      results.withoutSchemas++;
      results.missingComponents.push(componentName);
      console.log(`❌ ${componentName} - No Schema`);
    }
  });

  console.log("\n" + "=".repeat(60));
  console.log("📊 SCHEMA COVERAGE SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total Components: ${results.total}`);
  console.log(
    `Components with Schemas: ${results.withSchemas} (${Math.round(
      (results.withSchemas / results.total) * 100
    )}%)`
  );
  console.log(`  - About Schemas: ${results.aboutSchemas}`);
  console.log(`  - General Schemas: ${results.generalSchemas}`);
  console.log(`Components without Schemas: ${results.withoutSchemas}`);

  if (results.missingComponents.length > 0) {
    console.log("\n❌ MISSING SCHEMAS:");
    results.missingComponents.forEach((name) => {
      console.log(`   - ${name}`);
    });
  }

  console.log("\n🎯 NEXT STEPS:");
  if (results.withoutSchemas > 0) {
    console.log("1. Create schemas for missing components");
    console.log("2. Test form generation for new schemas");
    console.log("3. Verify component data mapping");
  } else {
    console.log("✨ All components have schemas! System is complete.");
  }

  return results;
}

/**
 * Validate specific schema structure
 */
function validateSchemaStructure(componentName, schema) {
  const validation = {
    componentName,
    isValid: true,
    errors: [],
    warnings: [],
  };

  // Check required schema properties
  if (!schema.componentName) {
    validation.errors.push("Missing componentName");
    validation.isValid = false;
  }

  if (!schema.schema || typeof schema.schema !== "object") {
    validation.errors.push("Missing or invalid schema object");
    validation.isValid = false;
  }

  if (!schema.defaultData) {
    validation.warnings.push("No defaultData provided");
  }

  // Check schema.schema structure
  if (schema.schema) {
    if (!schema.schema.type) {
      validation.warnings.push("Schema missing type property");
    }

    if (!schema.schema.properties) {
      validation.warnings.push("Schema missing properties");
    } else {
      // Check each property has formField
      Object.keys(schema.schema.properties).forEach((propName) => {
        const prop = schema.schema.properties[propName];
        if (!prop.formField) {
          validation.warnings.push(`Property '${propName}' missing formField`);
        }
      });
    }
  }

  return validation;
}

/**
 * Test all schemas for validity
 */
function testAllSchemas() {
  console.log("🧪 Testing Schema Validity...\n");

  const allSchemas = { ...aboutComponentSchemas, ...generalComponentSchemas };
  const validationResults = [];

  Object.keys(allSchemas).forEach((componentName) => {
    const schema = allSchemas[componentName];
    const validation = validateSchemaStructure(componentName, schema);
    validationResults.push(validation);

    if (validation.isValid) {
      console.log(`✅ ${componentName} - Valid`);
    } else {
      console.log(
        `❌ ${componentName} - Invalid: ${validation.errors.join(", ")}`
      );
    }

    if (validation.warnings.length > 0) {
      console.log(`   ⚠️  Warnings: ${validation.warnings.join(", ")}`);
    }
  });

  const validSchemas = validationResults.filter((r) => r.isValid).length;
  const invalidSchemas = validationResults.filter((r) => !r.isValid).length;

  console.log("\n📊 SCHEMA VALIDATION SUMMARY");
  console.log(`Valid Schemas: ${validSchemas}`);
  console.log(`Invalid Schemas: ${invalidSchemas}`);

  return validationResults;
}

/**
 * Run complete test suite
 */
function runCompleteTest() {
  console.log("🚀 Starting Complete Component Schema Test\n");

  const coverageResults = checkComponentCoverage();
  console.log("\n");
  const validationResults = testAllSchemas();

  console.log("\n" + "=".repeat(80));
  console.log("🎉 TEST COMPLETE - SUMMARY");
  console.log("=".repeat(80));
  console.log(
    `Schema Coverage: ${Math.round(
      (coverageResults.withSchemas / coverageResults.total) * 100
    )}%`
  );
  console.log(
    `Schema Validity: ${Math.round(
      (validationResults.filter((r) => r.isValid).length /
        validationResults.length) *
        100
    )}%`
  );

  if (
    coverageResults.withSchemas === coverageResults.total &&
    validationResults.every((r) => r.isValid)
  ) {
    console.log("🎯 ALL TESTS PASSED! System is ready for production.");
  } else {
    console.log("⚠️  Some issues found. Check details above.");
  }

  return { coverageResults, validationResults };
}

// Export functions for use in console
window.componentTest = {
  checkCoverage: checkComponentCoverage,
  testSchemas: testAllSchemas,
  runComplete: runCompleteTest,
};

export { checkComponentCoverage, testAllSchemas, runCompleteTest };
