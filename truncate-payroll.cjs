const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Payroll.jsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Find where the old component definitions start (after export default PayrollPage)
// The old components start at line 978 (index 977) with "function SolutionHorizontalStepper"
// We want to keep everything up to line 976 (index 975) which is the closing brace of PayrollPage

// Find the last occurrence of "}" before the old component code
let lastBraceLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === '}' && i < 1000 && i > 970) {
    // Check if this is the closing brace of PayrollPage (should be followed by comment about components)
    if (i + 1 < lines.length && lines[i + 1].includes('SolutionHorizontalStepper')) {
      lastBraceLine = i;
      break;
    }
  }
}

if (lastBraceLine === -1) {
  // Fallback: find the line with the comment
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('SolutionHorizontalStepper and FAQItem are now imported')) {
      lastBraceLine = i;
      break;
    }
  }
}

if (lastBraceLine === -1) {
  console.error('Could not find end of PayrollPage function');
  process.exit(1);
}

// Keep everything up to and including the comment line, then add export
const newLines = lines.slice(0, lastBraceLine + 1);
const newContent = newLines.join('\n');

fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Truncated file to ${newLines.length} lines (removed ${lines.length - newLines.length} lines)`);

