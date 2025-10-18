/**
 * Comprehensive Component Schema Test
 * Tests all 72 components to ensure complete UI-to-form field coverage
 */

const fs = require("fs");
const path = require("path");

// Test results structure
const testResults = {
  timestamp: new Date().toISOString(),
  totalComponents: 0,
  componentsWithSchemas: 0,
  componentsWithoutSchemas: 0,
  schemaValidationResults: [],
  missingSchemas: [],
  recommendations: [],
};

/**
 * Get all component files recursively
 */
function getAllComponentFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllComponentFiles(filePath, fileList);
    } else if (file.endsWith(".jsx") || file.endsWith(".js")) {
      // Skip non-component files
      if (
        !file.startsWith("index") &&
        !file.includes("test") &&
        !file.includes("spec") &&
        !file.includes("config") &&
        !file.includes("utils")
      ) {
        fileList.push({
          name: file.replace(/\.(jsx|js)$/, ""),
          path: filePath,
          relativePath: path.relative("./src/components", filePath),
        });
      }
    }
  });

  return fileList;
}

/**
 * Analyze component file for data fields
 */
function analyzeComponentFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");

    // Extract props and data fields
    const dataFields = new Set();

    // Look for props destructuring: const { field1, field2 } = props
    const propsRegex = /const\s+{\s*([^}]+)\s*}\s*=\s*props/g;
    let match;
    while ((match = propsRegex.exec(content)) !== null) {
      const fields = match[1]
        .split(",")
        .map((f) => f.trim().split(":")[0].trim());
      fields.forEach((field) => dataFields.add(field));
    }

    // Look for data. access patterns
    const dataAccessRegex = /data\.(\w+)/g;
    while ((match = dataAccessRegex.exec(content)) !== null) {
      dataFields.add(match[1]);
    }

    // Look for props. access patterns
    const propsAccessRegex = /props\.(\w+)/g;
    while ((match = propsAccessRegex.exec(content)) !== null) {
      dataFields.add(match[1]);
    }

    // Look for JSX attributes that reference variables
    const jsxAttributeRegex = /{(\w+)}/g;
    while ((match = jsxAttributeRegex.exec(content)) !== null) {
      if (
        ![
          "props",
          "data",
          "state",
          "setState",
          "useState",
          "useEffect",
          "React",
        ].includes(match[1])
      ) {
        dataFields.add(match[1]);
      }
    }

    return Array.from(dataFields);
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Validate schema coverage for component
 */
function validateSchemaForComponent(componentName, dataFields, schema) {
  const validationResult = {
    componentName,
    hasSchema: !!schema,
    dataFields: dataFields,
    schemaFields: [],
    coveredFields: [],
    missingFields: [],
    coveragePercentage: 0,
  };

  if (!schema) {
    validationResult.missingFields = dataFields;
    return validationResult;
  }

  // Extract schema fields recursively
  function extractSchemaFields(schemaObj, prefix = "") {
    const fields = [];

    if (schemaObj.properties) {
      Object.keys(schemaObj.properties).forEach((key) => {
        const fieldPath = prefix ? `${prefix}.${key}` : key;
        fields.push(fieldPath);

        const property = schemaObj.properties[key];
        if (property.type === "object" && property.properties) {
          fields.push(...extractSchemaFields(property, fieldPath));
        } else if (
          property.type === "array" &&
          property.items &&
          property.items.properties
        ) {
          fields.push(...extractSchemaFields(property.items, `${fieldPath}[]`));
        }
      });
    }

    return fields;
  }

  validationResult.schemaFields = extractSchemaFields(schema.schema || schema);

  // Check coverage
  dataFields.forEach((field) => {
    const isFieldCovered = validationResult.schemaFields.some(
      (schemaField) =>
        schemaField.includes(field) || field.includes(schemaField.split(".")[0])
    );

    if (isFieldCovered) {
      validationResult.coveredFields.push(field);
    } else {
      validationResult.missingFields.push(field);
    }
  });

  validationResult.coveragePercentage =
    dataFields.length > 0
      ? Math.round(
          (validationResult.coveredFields.length / dataFields.length) * 100
        )
      : 100;

  return validationResult;
}

/**
 * Main test function
 */
async function runComprehensiveTest() {
  console.log("🚀 Starting Comprehensive Component Schema Test...\n");

  // Get all component files
  const componentDirs = [
    "./src/components/About",
    "./src/components/Landing",
    "./src/components/Common",
    "./src/components/Services",
    "./src/components/Manufacturing",
    "./src/components/Retail",
  ];

  let allComponents = [];
  componentDirs.forEach((dir) => {
    if (fs.existsSync(dir)) {
      allComponents = allComponents.concat(getAllComponentFiles(dir));
    }
  });

  testResults.totalComponents = allComponents.length;
  console.log(`📊 Found ${allComponents.length} component files`);

  // Test each component
  for (const component of allComponents) {
    console.log(`\n🔍 Analyzing: ${component.name}`);

    // Get data fields from component file
    const dataFields = analyzeComponentFile(component.path);
    console.log(`   Data fields found: ${dataFields.join(", ")}`);

    // Get schema from aboutComponentSchemas or generalComponentSchemas
    let schema = null;
    if (aboutComponentSchemas[component.name]) {
      schema = aboutComponentSchemas[component.name];
      console.log(`   ✅ Schema found in aboutComponentSchemas`);
    } else if (generalComponentSchemas[component.name]) {
      schema = generalComponentSchemas[component.name];
      console.log(`   ✅ Schema found in generalComponentSchemas`);
    } else {
      console.log(`   ❌ No schema found`);
      testResults.missingSchemas.push(component.name);
    }

    // Validate schema coverage
    const validationResult = validateSchemaForComponent(
      component.name,
      dataFields,
      schema
    );
    testResults.schemaValidationResults.push(validationResult);

    if (validationResult.hasSchema) {
      testResults.componentsWithSchemas++;
      console.log(`   📋 Coverage: ${validationResult.coveragePercentage}%`);

      if (validationResult.missingFields.length > 0) {
        console.log(
          `   ⚠️  Missing fields: ${validationResult.missingFields.join(", ")}`
        );
      }
    } else {
      testResults.componentsWithoutSchemas++;
    }
  }

  // Generate recommendations
  testResults.recommendations = [
    `${testResults.componentsWithoutSchemas} components need schemas created`,
    `${
      testResults.schemaValidationResults.filter(
        (r) => r.coveragePercentage < 100
      ).length
    } components have incomplete schema coverage`,
    `Focus on components with <80% coverage first`,
    `Create missing schemas for: ${testResults.missingSchemas
      .slice(0, 10)
      .join(", ")}${testResults.missingSchemas.length > 10 ? "..." : ""}`,
  ];

  // Generate summary report
  console.log("\n" + "=".repeat(80));
  console.log("📊 COMPREHENSIVE TEST RESULTS");
  console.log("=".repeat(80));
  console.log(`Total Components: ${testResults.totalComponents}`);
  console.log(`Components with Schemas: ${testResults.componentsWithSchemas}`);
  console.log(
    `Components without Schemas: ${testResults.componentsWithoutSchemas}`
  );
  console.log(
    `Schema Coverage: ${Math.round(
      (testResults.componentsWithSchemas / testResults.totalComponents) * 100
    )}%`
  );

  console.log("\n🎯 RECOMMENDATIONS:");
  testResults.recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec}`);
  });

  console.log("\n📋 COMPONENTS NEEDING SCHEMAS:");
  testResults.missingSchemas.forEach((name) => {
    console.log(`   - ${name}`);
  });

  console.log("\n⚠️  COMPONENTS WITH INCOMPLETE COVERAGE (<100%):");
  testResults.schemaValidationResults
    .filter((r) => r.hasSchema && r.coveragePercentage < 100)
    .forEach((result) => {
      console.log(
        `   - ${result.componentName}: ${
          result.coveragePercentage
        }% (Missing: ${result.missingFields.join(", ")})`
      );
    });

  // Save detailed results
  fs.writeFileSync(
    "./component-test-results.json",
    JSON.stringify(testResults, null, 2)
  );
  console.log("\n💾 Detailed results saved to: component-test-results.json");

  return testResults;
}

// Export for use in other files
export { runComprehensiveTest, testResults };

// Run test if called directly
if (require.main === module) {
  runComprehensiveTest().catch(console.error);
}
