const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'Admin', 'PageComponentsEditor.jsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Find where the old component definitions start (after export default PageComponentsEditor comment)
// The old components start at line 966 (index 965) with "  component,"
// We want to keep everything up to line 965 (index 964) which is "export default PageComponentsEditor;"

// Find the last occurrence of "export default PageComponentsEditor;" before the old component code
let lastExportLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'export default PageComponentsEditor;' && i < 1000) {
    lastExportLine = i;
  }
}

if (lastExportLine === -1) {
  console.error('Could not find export statement');
  process.exit(1);
}

// Keep everything up to and including the export statement
const newLines = lines.slice(0, lastExportLine + 1);
const newContent = newLines.join('\n');

fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Truncated file to ${newLines.length} lines (removed ${lines.length - newLines.length} lines)`);

