const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
let totalFixes = 0;

// Function to add .jsx extension to imports
function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Fix imports from ../UI/ to add .jsx extension
  content = content.replace(/from\s+(['"])\.\.\/UI\/(\w+)\1/g, 'from $1../UI/$2.jsx$1');
  
  // Fix imports from ../../components/UI/ to add .jsx extension  
  content = content.replace(/from\s+(['"])\.\.\/\.\.\/components\/UI\/(\w+)\1/g, 'from $1../../components/UI/$2.jsx$1');
  
  // Fix imports from ../components/UI/ to add .jsx extension
  content = content.replace(/from\s+(['"])\.\.\/components\/UI\/(\w+)\1/g, 'from $1../components/UI/$2.jsx$1');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    const relPath = path.relative(__dirname, filePath);
    console.log(`✓ Fixed: ${relPath}`);
    totalFixes++;
  }
}

// Recursively process all .jsx and .js files
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', 'dist'].includes(entry.name)) {
        processDirectory(fullPath);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
      fixImportsInFile(fullPath);
    }
  }
}

console.log('Adding .jsx extensions to UI component imports...\n');
processDirectory(srcDir);
console.log(`\n✅ Fixed ${totalFixes} files`);
