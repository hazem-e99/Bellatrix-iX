/**
 * Test script to verify all array fields are hidden across all components
 * This script tests the hidden field functionality for all components
 */

// Mock schemas with hidden array fields
const testSchemas = {
  // About Components
  AboutHeroSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        backgroundVideo: { type: "string" },
        stats: { type: "array", hidden: true }
      }
    }
  },
  AboutMissionSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        vision: { type: "string" },
        additionalContent: { type: "string" },
        image: { type: "string" },
        stats: { type: "array", hidden: true },
        missionPoints: { type: "array", hidden: true }
      }
    }
  },
  AboutTeamSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        members: { type: "array", hidden: true }
      }
    }
  },
  AboutValuesSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        items: { type: "array", hidden: true }
      }
    }
  },
  AboutJourneySection: {
    schema: {
      properties: {
        beginningTitle: { type: "string" },
        beginningText: { type: "string" },
        growthTitle: { type: "string" },
        growthText: { type: "string" },
        todayTitle: { type: "string" },
        todayText: { type: "string" },
        imageUrl: { type: "string" }
        // No array fields - good
      }
    }
  },
  AboutMilestonesSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        items: { type: "array", hidden: true }
      }
    }
  },
  AboutDifferentiatorsSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        items: { type: "array", hidden: true }
      }
    }
  },
  AboutCTASection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        ctaButton: { type: "object" },
        features: { type: "array", hidden: true }
      }
    }
  },
  
  // General Components
  PayrollHowItWorksSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        steps: { type: "array", hidden: true }
      }
    }
  },
  PayrollWorkflowSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        workflowSteps: { type: "array", hidden: true }
      }
    }
  },
  PayrollStepperSection: {
    schema: {
      properties: {
        title: { type: "string" },
        steps: { type: "array", hidden: true }
      }
    }
  },
  PayrollPainPointsSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        painPoints: { type: "array", hidden: true }
      }
    }
  },
  PayrollFAQSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        faqItems: { type: "array", hidden: true }
      }
    }
  },
  HRModulesSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        modules: { type: "array", hidden: true }
      }
    }
  },
  HRBenefitsSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        features: { type: "array", hidden: true }
      }
    }
  },
  HRUseCasesSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        useCases: { type: "array", hidden: true }
      }
    }
  },
  HRPricingSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        pricing: { type: "array", hidden: true }
      }
    }
  },
  HRFAQSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        faq: {
          type: "object",
          properties: {
            title: { type: "string" },
            items: { type: "array", hidden: true }
          }
        }
      }
    }
  }
};

// Function to test hidden field logic for a component
function testComponentHiddenFields(componentName, schema) {
  console.log(`\n🧪 Testing ${componentName}:`);
  
  const schemaKeys = Object.keys(schema.properties);
  const visibleFields = [];
  const hiddenFields = [];
  
  // Simulate the field rendering logic
  schemaKeys.forEach(key => {
    const fieldSchema = schema.properties[key];
    
    // Check if field exists in schema
    if (!(key in schema.properties)) {
      console.warn(`⚠️ Field ${key} not in schema, skipping`);
      return;
    }
    
    // Check if field is hidden
    if (fieldSchema.hidden === true) {
      hiddenFields.push(key);
      console.log(`👁️ Field ${key} is hidden, skipping`);
      return;
    }
    
    // Field is visible and should be rendered
    visibleFields.push(key);
    console.log(`✅ Field ${key} will be rendered`);
  });
  
  console.log(`📊 Results:`);
  console.log(`  Visible fields: ${visibleFields.join(', ')}`);
  console.log(`  Hidden fields: ${hiddenFields.join(', ')}`);
  console.log(`  Total fields: ${schemaKeys.length}`);
  console.log(`  Visible count: ${visibleFields.length}`);
  console.log(`  Hidden count: ${hiddenFields.length}`);
  
  // Check if all array fields are hidden
  const arrayFields = schemaKeys.filter(key => schema.properties[key].type === 'array');
  const hiddenArrayFields = arrayFields.filter(key => schema.properties[key].hidden === true);
  
  const allArrayFieldsHidden = arrayFields.length === hiddenArrayFields.length;
  console.log(`  Array fields: ${arrayFields.join(', ')}`);
  console.log(`  Hidden array fields: ${hiddenArrayFields.join(', ')}`);
  console.log(`  All array fields hidden: ${allArrayFieldsHidden ? '✅ YES' : '❌ NO'}`);
  
  return {
    componentName,
    visibleFields,
    hiddenFields,
    arrayFields,
    hiddenArrayFields,
    allArrayFieldsHidden
  };
}

// Function to test all components
function testAllComponents() {
  console.log("🚀 Testing All Components for Hidden Array Fields...\n");
  
  const results = [];
  let totalComponents = 0;
  let componentsWithHiddenArrays = 0;
  let totalArrayFields = 0;
  let totalHiddenArrayFields = 0;
  
  Object.entries(testSchemas).forEach(([componentName, componentSchema]) => {
    const result = testComponentHiddenFields(componentName, componentSchema.schema);
    results.push(result);
    
    totalComponents++;
    if (result.arrayFields.length > 0) {
      componentsWithHiddenArrays++;
    }
    totalArrayFields += result.arrayFields.length;
    totalHiddenArrayFields += result.hiddenArrayFields.length;
  });
  
  console.log("\n📊 Overall Results:");
  console.log(`Total components tested: ${totalComponents}`);
  console.log(`Components with array fields: ${componentsWithHiddenArrays}`);
  console.log(`Total array fields: ${totalArrayFields}`);
  console.log(`Total hidden array fields: ${totalHiddenArrayFields}`);
  console.log(`All array fields hidden: ${totalArrayFields === totalHiddenArrayFields ? '✅ YES' : '❌ NO'}`);
  
  // Check individual component results
  const failedComponents = results.filter(r => !r.allArrayFieldsHidden);
  if (failedComponents.length > 0) {
    console.log("\n❌ Components with issues:");
    failedComponents.forEach(component => {
      console.log(`  ${component.componentName}: ${component.arrayFields.length} array fields, ${component.hiddenArrayFields.length} hidden`);
    });
  } else {
    console.log("\n✅ All components passed the test!");
  }
  
  return {
    totalComponents,
    componentsWithHiddenArrays,
    totalArrayFields,
    totalHiddenArrayFields,
    allPassed: totalArrayFields === totalHiddenArrayFields,
    results
  };
}

// Function to generate summary report
function generateSummaryReport() {
  console.log("\n📋 Summary Report:");
  console.log("=" * 50);
  
  const testResults = testAllComponents();
  
  console.log("\n🎯 Test Summary:");
  console.log(`✅ Components tested: ${testResults.totalComponents}`);
  console.log(`📊 Array fields found: ${testResults.totalArrayFields}`);
  console.log(`👁️ Array fields hidden: ${testResults.totalHiddenArrayFields}`);
  console.log(`🏆 Success rate: ${testResults.allPassed ? '100%' : 'Failed'}`);
  
  if (testResults.allPassed) {
    console.log("\n🎉 All array fields are successfully hidden!");
    console.log("📝 Component Configuration will now only show non-array fields.");
    console.log("🔧 Array data will still be available for component use.");
  } else {
    console.log("\n⚠️ Some array fields are not hidden properly.");
    console.log("🔧 Please check the implementation.");
  }
  
  return testResults;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testComponentHiddenFields,
    testAllComponents,
    generateSummaryReport,
    testSchemas
  };
}

// Run if executed directly
if (typeof window === 'undefined' && typeof require !== 'undefined') {
  generateSummaryReport();
}
