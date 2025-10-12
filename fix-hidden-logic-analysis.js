/**
 * Analysis script to fix the hidden logic
 * This script identifies which components should have visible array fields
 */

// Components that SHOULD have visible array fields (user needs to configure them)
const componentsNeedingVisibleArrays = {
  // About Components that need user configuration
  AboutValuesSection: {
    reason: "Company values need user input",
    arrayField: "items",
    description: "Users should be able to add/edit company values"
  },
  AboutMilestonesSection: {
    reason: "Milestones need user input", 
    arrayField: "items",
    description: "Users should be able to add/edit milestones"
  },
  AboutDifferentiatorsSection: {
    reason: "Differentiators need user input",
    arrayField: "items", 
    description: "Users should be able to add/edit differentiators"
  },
  AboutTeamSection: {
    reason: "Team members need user input",
    arrayField: "members",
    description: "Users should be able to add/edit team members"
  },
  AboutCTASection: {
    reason: "Features need user input",
    arrayField: "features",
    description: "Users should be able to add/edit features"
  },
  
  // Payroll Components that need user configuration
  PayrollHowItWorksSection: {
    reason: "Steps need user input",
    arrayField: "steps",
    description: "Users should be able to add/edit process steps"
  },
  PayrollWorkflowSection: {
    reason: "Workflow steps need user input",
    arrayField: "workflowSteps", 
    description: "Users should be able to add/edit workflow steps"
  },
  PayrollStepperSection: {
    reason: "Steps need user input",
    arrayField: "steps",
    description: "Users should be able to add/edit steps"
  },
  PayrollPainPointsSection: {
    reason: "Pain points need user input",
    arrayField: "painPoints",
    description: "Users should be able to add/edit pain points"
  },
  PayrollFAQSection: {
    reason: "FAQ items need user input",
    arrayField: "faqItems",
    description: "Users should be able to add/edit FAQ items"
  },
  
  // HR Components that need user configuration
  HRModulesSection: {
    reason: "Modules need user input",
    arrayField: "modules",
    description: "Users should be able to add/edit HR modules"
  },
  HRBenefitsSection: {
    reason: "Features need user input",
    arrayField: "features",
    description: "Users should be able to add/edit benefits"
  },
  HRUseCasesSection: {
    reason: "Use cases need user input",
    arrayField: "useCases",
    description: "Users should be able to add/edit use cases"
  },
  HRPricingSection: {
    reason: "Pricing plans need user input",
    arrayField: "pricing",
    description: "Users should be able to add/edit pricing plans"
  },
  HRFAQSection: {
    reason: "FAQ items need user input",
    arrayField: "faq.items",
    description: "Users should be able to add/edit FAQ items"
  }
};

// Components that should have HIDDEN array fields (predefined data)
const componentsNeedingHiddenArrays = {
  AboutHeroSection: {
    reason: "Stats are predefined",
    arrayField: "stats",
    description: "Statistics are predefined and don't need user configuration"
  },
  AboutMissionSection: {
    reason: "Stats and mission points are predefined",
    arrayFields: ["stats", "missionPoints"],
    description: "Statistics and mission points are predefined"
  }
};

// Components with no array fields
const componentsWithNoArrays = {
  AboutJourneySection: {
    reason: "No array fields needed",
    description: "This component only has text fields"
  }
};

function analyzeComponents() {
  console.log("🔍 Analyzing Components for Correct Hidden Logic...\n");
  
  console.log("✅ Components that SHOULD have VISIBLE array fields:");
  Object.entries(componentsNeedingVisibleArrays).forEach(([componentName, info]) => {
    console.log(`\n${componentName}:`);
    console.log(`  Reason: ${info.reason}`);
    console.log(`  Array Field: ${info.arrayField || info.arrayFields?.join(', ')}`);
    console.log(`  Description: ${info.description}`);
  });
  
  console.log("\n👁️ Components that SHOULD have HIDDEN array fields:");
  Object.entries(componentsNeedingHiddenArrays).forEach(([componentName, info]) => {
    console.log(`\n${componentName}:`);
    console.log(`  Reason: ${info.reason}`);
    console.log(`  Array Field: ${info.arrayField || info.arrayFields?.join(', ')}`);
    console.log(`  Description: ${info.description}`);
  });
  
  console.log("\n📝 Components with NO array fields:");
  Object.entries(componentsWithNoArrays).forEach(([componentName, info]) => {
    console.log(`\n${componentName}:`);
    console.log(`  Reason: ${info.reason}`);
    console.log(`  Description: ${info.description}`);
  });
  
  console.log("\n🔧 Changes needed:");
  console.log("1. Remove hidden: true from components that need user input");
  console.log("2. Keep hidden: true only for predefined data");
  console.log("3. Ensure AboutJourneySection has no array fields");
  
  return {
    visibleArrays: componentsNeedingVisibleArrays,
    hiddenArrays: componentsNeedingHiddenArrays,
    noArrays: componentsWithNoArrays
  };
}

function generateFixPlan() {
  console.log("\n📋 Fix Plan:");
  console.log("=" * 50);
  
  const analysis = analyzeComponents();
  
  console.log("\n🔧 Files to modify:");
  console.log("1. src/data/aboutComponentSchemas.js");
  console.log("2. src/data/generalComponentSchemas.js");
  
  console.log("\n📝 Specific changes:");
  console.log("About Components:");
  console.log("- AboutValuesSection: Remove hidden: true from items");
  console.log("- AboutMilestonesSection: Remove hidden: true from items");
  console.log("- AboutDifferentiatorsSection: Remove hidden: true from items");
  console.log("- AboutTeamSection: Remove hidden: true from members");
  console.log("- AboutCTASection: Remove hidden: true from features");
  console.log("- AboutHeroSection: Keep hidden: true for stats");
  console.log("- AboutMissionSection: Keep hidden: true for stats and missionPoints");
  
  console.log("\nGeneral Components:");
  console.log("- All Payroll components: Remove hidden: true from array fields");
  console.log("- All HR components: Remove hidden: true from array fields");
  
  return analysis;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    componentsNeedingVisibleArrays,
    componentsNeedingHiddenArrays,
    componentsWithNoArrays,
    analyzeComponents,
    generateFixPlan
  };
}

// Run if executed directly
if (typeof window === 'undefined' && typeof require !== 'undefined') {
  generateFixPlan();
}
