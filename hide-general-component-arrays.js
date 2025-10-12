/**
 * Script to hide array fields in generalComponentSchemas.js
 * This script will add hidden: true to all array fields
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/generalComponentSchemas.js');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Array field patterns to hide
const arrayFieldsToHide = [
  'workflowSteps',
  'steps', 
  'painPoints',
  'faqItems',
  'modules',
  'features',
  'useCases',
  'pricing'
];

// Function to add hidden: true to array fields
function hideArrayFields(content) {
  let modifiedContent = content;
  
  arrayFieldsToHide.forEach(fieldName => {
    // Pattern to match array field definitions
    const pattern = new RegExp(
      `(\\s+)${fieldName}:\\s*{[^}]*type:\\s*"array"[^}]*}(?=\\s*[,}])`,
      'gs'
    );
    
    modifiedContent = modifiedContent.replace(pattern, (match) => {
      // Add hidden: true before the closing brace
      return match.replace(/(\s*)(\})/g, '$1,\n$1hidden: true  // إخفاء حقل ' + fieldName + ' من Component Configuration\n$1$2');
    });
  });
  
  return modifiedContent;
}

// Apply the changes
const modifiedContent = hideArrayFields(content);

// Write back to file
fs.writeFileSync(filePath, modifiedContent, 'utf8');

console.log('✅ Successfully hid array fields in generalComponentSchemas.js');
console.log('📋 Hidden fields:', arrayFieldsToHide.join(', '));
