/**
 * Analysis script to identify all array fields that should be hidden
 * This script analyzes all component schemas to find array fields
 */

// Mock schemas for analysis
const aboutComponentSchemas = {
  AboutHeroSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        backgroundVideo: { type: "string" },
        stats: { type: "array", label: "Statistics" } // Should be hidden
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
        stats: { type: "array", label: "Key Statistics" }, // Should be hidden
        missionPoints: { type: "array", label: "Mission Points" } // Should be hidden
      }
    }
  },
  AboutTeamSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        members: { type: "array", label: "Team Members" } // Should be hidden
      }
    }
  },
  AboutValuesSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        items: { type: "array", label: "Company Values" } // Should be hidden
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
        items: { type: "array", label: "Milestone Items" } // Should be hidden
      }
    }
  },
  AboutDifferentiatorsSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        items: { type: "array", label: "Differentiator Items" } // Should be hidden
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
        features: { type: "array", label: "Features List" } // Should be hidden
      }
    }
  }
};

const generalComponentSchemas = {
  PayrollHowItWorksSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        steps: { type: "array", label: "Steps" } // Should be hidden
      }
    }
  },
  PayrollWorkflowSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        workflowSteps: { type: "array", label: "Workflow Steps" } // Should be hidden
      }
    }
  },
  PayrollStepperSection: {
    schema: {
      properties: {
        title: { type: "string" },
        steps: { type: "array", label: "Steps" } // Should be hidden
      }
    }
  },
  PayrollPainPointsSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        painPoints: { type: "array", label: "Pain Points" } // Should be hidden
      }
    }
  },
  PayrollFAQSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        faqItems: { type: "array", label: "FAQ Items" } // Should be hidden
      }
    }
  },
  HRModulesSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        modules: { type: "array", label: "Modules" } // Should be hidden
      }
    }
  },
  HRBenefitsSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        features: { type: "array", label: "Features" } // Should be hidden
      }
    }
  },
  HRUseCasesSection: {
    schema: {
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        description: { type: "string" },
        useCases: { type: "array", label: "Use Cases" } // Should be hidden
      }
    }
  },
  HRPricingSection: {
    schema: {
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        pricing: { type: "array", label: "Pricing Plans" } // Should be hidden
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
            items: { type: "array", label: "FAQ Items" } // Should be hidden
          }
        }
      }
    }
  }
};

// Function to analyze array fields in a schema
function analyzeArrayFields(schema) {
  const arrayFields = [];
  
  if (schema && schema.properties) {
    Object.entries(schema.properties).forEach(([key, fieldSchema]) => {
      if (fieldSchema.type === 'array') {
        arrayFields.push({
          fieldName: key,
          label: fieldSchema.label || key,
          shouldHide: true // All array fields should be hidden
        });
      }
      
      // Check nested objects for array fields
      if (fieldSchema.type === 'object' && fieldSchema.properties) {
        Object.entries(fieldSchema.properties).forEach(([nestedKey, nestedFieldSchema]) => {
          if (nestedFieldSchema.type === 'array') {
            arrayFields.push({
              fieldName: `${key}.${nestedKey}`,
              label: nestedFieldSchema.label || nestedKey,
              shouldHide: true,
              isNested: true
            });
          }
        });
      }
    });
  }
  
  return arrayFields;
}

// Function to analyze all components
function analyzeAllComponents() {
  console.log("🔍 Analyzing all component schemas for array fields...\n");
  
  const allComponents = {
    ...aboutComponentSchemas,
    ...generalComponentSchemas
  };
  
  const componentsWithArrayFields = [];
  const totalArrayFields = [];
  
  Object.entries(allComponents).forEach(([componentName, componentSchema]) => {
    const arrayFields = analyzeArrayFields(componentSchema.schema);
    
    if (arrayFields.length > 0) {
      componentsWithArrayFields.push({
        componentName,
        arrayFields
      });
      
      totalArrayFields.push(...arrayFields.map(field => ({
        ...field,
        componentName
      })));
    }
  });
  
  console.log("📊 Analysis Results:");
  console.log(`Total components analyzed: ${Object.keys(allComponents).length}`);
  console.log(`Components with array fields: ${componentsWithArrayFields.length}`);
  console.log(`Total array fields found: ${totalArrayFields.length}\n`);
  
  console.log("🔧 Components with array fields:");
  componentsWithArrayFields.forEach(({ componentName, arrayFields }) => {
    console.log(`\n${componentName}:`);
    arrayFields.forEach(field => {
      console.log(`  - ${field.fieldName} (${field.label})`);
    });
  });
  
  console.log("\n📋 All array fields to hide:");
  totalArrayFields.forEach(field => {
    console.log(`${field.componentName}.${field.fieldName} - ${field.label}`);
  });
  
  return {
    componentsWithArrayFields,
    totalArrayFields,
    allComponents
  };
}

// Function to generate the changes needed
function generateChanges() {
  console.log("\n🔧 Changes needed:\n");
  
  const analysis = analyzeAllComponents();
  
  console.log("1. About Components (src/data/aboutComponentSchemas.js):");
  analysis.componentsWithArrayFields
    .filter(item => item.componentName.startsWith('About'))
    .forEach(({ componentName, arrayFields }) => {
      console.log(`\n${componentName}:`);
      arrayFields.forEach(field => {
        console.log(`  Add hidden: true to ${field.fieldName}`);
      });
    });
  
  console.log("\n2. General Components (src/data/generalComponentSchemas.js):");
  analysis.componentsWithArrayFields
    .filter(item => !item.componentName.startsWith('About'))
    .forEach(({ componentName, arrayFields }) => {
      console.log(`\n${componentName}:`);
      arrayFields.forEach(field => {
        console.log(`  Add hidden: true to ${field.fieldName}`);
      });
    });
  
  return analysis;
}

// Run the analysis
function runAnalysis() {
  console.log("🚀 Starting Array Fields Analysis...\n");
  
  const analysis = generateChanges();
  
  console.log("\n✅ Analysis complete!");
  console.log(`Found ${analysis.totalArrayFields.length} array fields to hide across ${analysis.componentsWithArrayFields.length} components.`);
  
  return analysis;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    analyzeArrayFields,
    analyzeAllComponents,
    generateChanges,
    runAnalysis
  };
}

// Run if executed directly
if (typeof window === 'undefined' && typeof require !== 'undefined') {
  runAnalysis();
}
