const fs = require('fs');
const path = require('path');

const fixes = [
  // Fix all ../UI/ imports in components/Admin to ../components/UI/
  {
    pattern: /from\s+(['"])\.\.\/UI\//g,
    replacement: 'from $1../components/UI/',
    files: 'src/components/Admin/**/*.{js,jsx}'
  }
];

const srcDir = path.join(__dirname, 'src');

// Get all files in Admin directory
const adminDir = path.join(srcDir, 'components', 'Admin');
const files = fs.readdirSync(adminDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));

console.log(`Found ${files.length} files in Admin directory\n`);

let totalFixes = 0;

files.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Replace ../UI/ with ../components/UI/
  content = content.replace(/from\s+(['"])\.\.\/UI\//g, 'from $1../components/UI/');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${file}`);
    totalFixes++;
  }
});

console.log(`\n✅ Fixed ${totalFixes} files`);
