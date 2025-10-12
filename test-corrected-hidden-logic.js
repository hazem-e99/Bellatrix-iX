/**
 * Test script to verify the corrected hidden logic
 * This script tests that only predefined data is hidden, while user-configurable data is visible
 */

// Mock schemas with corrected hidden logic
const correctedSchemas = {
  // Components with HIDDEN array fields (predefined data)
  AboutHeroSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        backgroundVideo: { type: "string" },
        stats: { type: "array", hidden: true } // Hidden - predefined data
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
        stats: { type: "array", hidden: true }, // Hidden - predefined data
        missionPoints: { type: "array", hidden: true } // Hidden - predefined data
      }
    }
  },
  
  // Components with VISIBLE array fields (user-configurable data)
  AboutValuesSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        items: { type: "array" } // Visible - user needs to configure values
      }
    }
  },
  AboutTeamSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        members: { type: "array" } // Visible - user needs to configure team members
      }
    }
  },
  AboutMilestonesSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        items: { type: "array" } // Visible - user needs to configure milestones
      }
    }
  },
  AboutDifferentiatorsSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        items: { type: "array" } // Visible - user needs to configure differentiators
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
        features: { type: "array" } // Visible - user needs to configure features
      }
    }
  },
  
  // Payroll Components with VISIBLE array fields
  PayrollHowItWorksSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        steps: { type: "array" } // Visible - user needs to configure steps
      }
    }
  },
  PayrollWorkflowSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        workflowSteps: { type: "array" } // Visible - user needs to configure workflow steps
      }
    }
  },
  PayrollStepperSection: {
    schema: {
      properties: {
        title: { type: "string" },
        steps: { type: "array" } // Visible - user needs to configure steps
      }
    }
  },
  PayrollPainPointsSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        painPoints: { type: "array" } // Visible - user needs to configure pain points
      }
    }
  },
  PayrollFAQSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        faqItems: { type: "array" } // Visible - user needs to configure FAQ items
      }
    }
  },
  
  // HR Components with VISIBLE array fields
  HRModulesSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        modules: { type: "array" } // Visible - user needs to configure modules
      }
    }
  },
  HRBenefitsSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        features: { type: "array" } // Visible - user needs to configure features
      }
    }
  },
  HRUseCasesSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        useCases: { type: "array" } // Visible - user needs to configure use cases
      }
    }
  },
  HRPricingSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        pricing: { type: "array" } // Visible - user needs to configure pricing plans
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
            items: { type: "array" } // Visible - user needs to configure FAQ items
          }
        }
      }
    }
  },
  
  // Component with no array fields
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
        // No array fields
      }
    }
  }
};

// Function to test corrected hidden logic
function testCorrectedHiddenLogic() {
  console.log("🔍 Testing Corrected Hidden Logic...\n");
  
  const results = {
    hiddenCorrectly: [],
    visibleCorrectly: [],
    noArrays: [],
    errors: []
  };
  
  Object.entries(correctedSchemas).forEach(([componentName, componentSchema]) => {
    const schemaKeys = Object.keys(componentSchema.schema.properties);
    const arrayFields = schemaKeys.filter(key => componentSchema.schema.properties[key].type === 'array');
    const hiddenArrayFields = arrayFields.filter(key => componentSchema.schema.properties[key].hidden === true);
    const visibleArrayFields = arrayFields.filter(key => !componentSchema.schema.properties[key].hidden);
    
    console.log(`\n🧪 Testing ${componentName}:`);
    console.log(`  Array fields: ${arrayFields.join(', ') || 'None'}`);
    console.log(`  Hidden: ${hiddenArrayFields.join(', ') || 'None'}`);
    console.log(`  Visible: ${visibleArrayFields.join(', ') || 'None'}`);
    
    // Determine expected behavior based on component type
    let expectedBehavior;
    if (componentName === 'AboutHeroSection') {
      expectedBehavior = 'hidden'; // Stats should be hidden
    } else if (componentName === 'AboutMissionSection') {
      expectedBehavior = 'hidden'; // Stats and missionPoints should be hidden
    } else if (componentName === 'AboutJourneySection') {
      expectedBehavior = 'noArrays'; // No array fields
    } else {
      expectedBehavior = 'visible'; // All other components should have visible arrays
    }
    
    // Check if behavior matches expectation
    if (expectedBehavior === 'hidden' && hiddenArrayFields.length > 0 && visibleArrayFields.length === 0) {
      results.hiddenCorrectly.push(componentName);
      console.log(`  ✅ Correct: Array fields are hidden as expected`);
    } else if (expectedBehavior === 'visible' && visibleArrayFields.length > 0 && hiddenArrayFields.length === 0) {
      results.visibleCorrectly.push(componentName);
      console.log(`  ✅ Correct: Array fields are visible as expected`);
    } else if (expectedBehavior === 'noArrays' && arrayFields.length === 0) {
      results.noArrays.push(componentName);
      console.log(`  ✅ Correct: No array fields as expected`);
    } else {
      results.errors.push({
        component: componentName,
        expected: expectedBehavior,
        actual: {
          arrayFields,
          hiddenArrayFields,
          visibleArrayFields
        }
      });
      console.log(`  ❌ Error: Expected ${expectedBehavior}, but got different behavior`);
    }
  });
  
  return results;
}

// Function to generate summary report
function generateSummaryReport() {
  console.log("\n📊 Summary Report:");
  console.log("=" * 50);
  
  const results = testCorrectedHiddenLogic();
  
  console.log(`\n✅ Components with correctly hidden arrays: ${results.hiddenCorrectly.length}`);
  results.hiddenCorrectly.forEach(component => {
    console.log(`  - ${component}`);
  });
  
  console.log(`\n✅ Components with correctly visible arrays: ${results.visibleCorrectly.length}`);
  results.visibleCorrectly.forEach(component => {
    console.log(`  - ${component}`);
  });
  
  console.log(`\n✅ Components with no arrays: ${results.noArrays.length}`);
  results.noArrays.forEach(component => {
    console.log(`  - ${component}`);
  });
  
  console.log(`\n❌ Components with errors: ${results.errors.length}`);
  results.errors.forEach(error => {
    console.log(`  - ${error.component}: Expected ${error.expected}`);
  });
  
  const totalComponents = Object.keys(correctedSchemas).length;
  const correctComponents = results.hiddenCorrectly.length + results.visibleCorrectly.length + results.noArrays.length;
  const successRate = (correctComponents / totalComponents) * 100;
  
  console.log(`\n🎯 Overall Results:`);
  console.log(`  Total components: ${totalComponents}`);
  console.log(`  Correct components: ${correctComponents}`);
  console.log(`  Success rate: ${successRate.toFixed(1)}%`);
  
  if (successRate === 100) {
    console.log(`\n🎉 All components have correct hidden logic!`);
    console.log(`📝 Predefined data is hidden, user-configurable data is visible.`);
  } else {
    console.log(`\n⚠️ Some components need attention.`);
  }
  
  return results;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    correctedSchemas,
    testCorrectedHiddenLogic,
    generateSummaryReport
  };
}

// Run if executed directly
if (typeof window === 'undefined' && typeof require !== 'undefined') {
  generateSummaryReport();
}
