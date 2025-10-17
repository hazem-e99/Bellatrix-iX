import fs from "fs";

try {
  // Read the file
  let content = fs.readFileSync(
    "src/components/Admin/EnhancedPageBuilder.jsx",
    "utf8"
  );

  // List of all the components we want to have (72 components)
  const allComponents = [
    // About Components (6)
    "AboutHeroSection",
    "AboutMissionSection",
    "AboutJourneySection",
    "AboutTeamSection",
    "AboutValuesSection",
    "AboutDifferentiatorsSection",
    "AboutCTASection",

    // HR Components (7)
    "HRHeroSection",
    "HRFeaturesSection",
    "HRModulesSection",
    "HRPricingSection",
    "HRBenefitsSection",
    "HRUseCasesSection",
    "HRFAQSection",
    "HRCTASection",

    // Payroll Components (4)
    "PayrollHeroSection",
    "PayrollPainPointsSection",
    "PayrollWorkflowSection",
    "PayrollFeaturesSection",
    "PayrollCTASection",

    // Implementation Components (4)
    "ImplementationHeroSection",
    "ImplementationProcessSection",
    "ImplementationWhyChooseSection",
    "ImplementationPricingSection",
    "ImplementationCTASection",

    // Manufacturing Components (4)
    "ManufacturingHeroSection",
    "ManufacturingStatsSection",
    "ManufacturingChallengesSection",
    "ManufacturingSolutionsSection",
    "ManufacturingCTASection",

    // Retail Components (4)
    "RetailHeroSection",
    "RetailStatsSection",
    "RetailChallengesSection",
    "RetailCTASection",

    // Training Components (4)
    "TrainingHeroSection",
    "TrainingProgramsSection",
    "TrainingFeaturesSection",
    "TrainingCTASection",

    // Consulting Components (3)
    "ConsultingHeroSection",
    "ConsultingServicesSection",
    "ConsultingCTASection",

    // Integration Components (4)
    "IntegrationHeroSection",
    "IntegrationTypesSection",
    "IntegrationBenefitsSection",
    "IntegrationPopularSection",
    "IntegrationCTASection",

    // Customization Components (4)
    "CustomizationHeroSection",
    "CustomizationServicesSection",
    "CustomizationProcessSection",
    "CustomizationCTASection",

    // Home Components (4)
    "HomeHeroSection",
    "HomeServicesSection",
    "HomeTestimonialsSection",
    "HomeIndustriesSection",

    // Generic Components (8)
    "TestimonialsSection",
    "FAQSection",
    "CTASection",
    "PricingSection",
    "ContactSection",
    "FeaturesSection",
    "ServiceGrid",

    // Additional components for specific modules
    "StatsSection",
    "ProcessSection",
    "BenefitsSection",
    "ChallengesSection",
    "SolutionsSection",
    "UseCasesSection",
    "ModulesSection",
    "ServicesSection",
    "WhyChooseSection",
  ];

  console.log(`Target: ${allComponents.length} components`);

  // Count current components
  const componentMatches = content.match(/\s+[A-Z][a-zA-Z]+Section:\s*{/g);
  console.log(
    `Currently found: ${
      componentMatches ? componentMatches.length : 0
    } components`
  );

  // Show duplicates
  const componentNames = [];
  const regex = /\s+([A-Z][a-zA-Z]+Section):\s*{/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    componentNames.push(match[1]);
  }

  const duplicates = componentNames.filter(
    (name, index) => componentNames.indexOf(name) !== index
  );
  if (duplicates.length > 0) {
    console.log("Found duplicates:", [...new Set(duplicates)]);
  }

  // Show missing components
  const missing = allComponents.filter(
    (comp) => !componentNames.includes(comp)
  );
  if (missing.length > 0) {
    console.log("Missing components:", missing);
  }

  console.log(
    "Done! Check the output above for duplicates and missing components."
  );
} catch (error) {
  console.error("Error:", error.message);
}
