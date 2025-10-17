const fs = require("fs");
const path = require("path");

function fixDuplicateKeys() {
  const filePath = path.join(__dirname, "src", "components", "Admin", "EnhancedPageBuilder.jsx");
  
  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");
  
  // Define all known duplicate keys that need to be fixed
  const duplicateKeys = [
    "TrainingProgramsSection",
    "IntegrationTypesSection", 
    "IntegrationBenefitsSection",
    "CustomizationServicesSection",
    "CustomizationProcessSection",
    "ManufacturingChallengesSection",
    "ManufacturingSolutionsSection", 
    "RetailChallengesSection",
    "AboutMissionSection",
    "AboutValuesSection",
    "AboutTeamSection",
    "AboutJourneySection", 
    "AboutDifferentiatorsSection",
    "ImplementationCTASection",
    "ServiceGrid",
    "ManufacturingCTASection",
    "RetailCTASection",
    "TrainingCTASection"
  ];

  duplicateKeys.forEach(key => {
    console.log(`Processing duplicate key: ${key}`);
    
    // Find all occurrences of this key
    const regex = new RegExp(`(\\s+)(${key})(\\s*:\\s*{)`, "g");
    let matches = [];
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      matches.push({
        index: match.index,
        fullMatch: match[0],
        indent: match[1],
        keyName: match[2],
        suffix: match[3]
      });
    }
    
    if (matches.length > 1) {
      console.log(`Found ${matches.length} occurrences of ${key}`);
      
      // Keep the first occurrence as is, rename subsequent ones
      for (let i = 1; i < matches.length; i++) {
        const occurrence = matches[i];
        const newKeyName = `${key}Alt${i > 1 ? i : ''}`;
        const replacement = `${occurrence.indent}${newKeyName}${occurrence.suffix}`;
        
        // Replace this specific occurrence
        content = content.substring(0, occurrence.index) + 
                 replacement + 
                 content.substring(occurrence.index + occurrence.fullMatch.length);
        
        // Update indices for remaining matches
        const lengthDiff = replacement.length - occurrence.fullMatch.length;
        for (let j = i + 1; j < matches.length; j++) {
          matches[j].index += lengthDiff;
        }
        
        console.log(`  - Renamed occurrence ${i + 1} to: ${newKeyName}`);
      }
    }
  });

  // Write the fixed content back to file
  fs.writeFileSync(filePath, content, "utf8");
  console.log("✅ Fixed all duplicate keys in EnhancedPageBuilder.jsx");
}

// Run the fix
fixDuplicateKeys();