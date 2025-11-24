const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const issues = [];
const fixes = [];

// Build exact file map
const fileMap = new Map();

function buildFileMap(dir, relativeTo = SRC_DIR) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory() && !['node_modules', '.git', 'dist'].includes(entry.name)) {
      buildFileMap(fullPath, relativeTo);
    } else if (entry.isFile() && /\.(jsx|js|tsx|ts)$/.test(entry.name)) {
      const rel = path.relative(relativeTo, fullPath).replace(/\\/g, '/');
      const key = rel.toLowerCase();
      fileMap.set(key, { actualPath: rel, fullPath, name: entry.name });
    }
  }
}

function fixImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(SRC_DIR, filePath).replace(/\\/g, '/');
  let newContent = content;
  let hasChanges = false;
  
  // Match all import/require statements
  const importRegex = /from\s+(['"])([^'"]+)\1/g;
  const matches = [];
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    matches.push({
      fullMatch: match[0],
      quote: match[1],
      importPath: match[2],
      index: match.index
    });
  }
  
  // Process in reverse to maintain indices
  matches.reverse().forEach(m => {
    const importPath = m.importPath;
    
    // Only process relative imports
    if (!importPath.startsWith('.')) return;
    
    const currentDir = path.dirname(relativePath);
    let targetPath = path.join(currentDir, importPath).replace(/\\/g, '/');
    
    // Try different extensions
    const extensions = ['', '.jsx', '.js', '.tsx', '.ts'];
    const indexFiles = ['/index.jsx', '/index.js', '/index.tsx', '/index.ts'];
    
    let found = null;
    
    for (const ext of extensions) {
      const testPath = (targetPath + ext).toLowerCase();
      if (fileMap.has(testPath)) {
        found = fileMap.get(testPath);
        break;
      }
    }
    
    if (!found) {
      for (const idx of indexFiles) {
        const testPath = (targetPath + idx).toLowerCase();
        if (fileMap.has(testPath)) {
          found = fileMap.get(testPath);
          break;
        }
      }
    }
    
    if (!found) {
      issues.push({
        file: relativePath,
        import: importPath,
        reason: 'File not found'
      });
      return;
    }
    
    // Calculate correct relative path
    const fromDir = path.dirname(path.join(SRC_DIR, relativePath));
    const toFile = path.join(SRC_DIR, found.actualPath);
    let correctPath = path.relative(fromDir, toFile).replace(/\\/g, '/');
    
    if (!correctPath.startsWith('.')) {
      correctPath = './' + correctPath;
    }
    
    // Remove extension for cleaner imports
    correctPath = correctPath.replace(/\.(jsx|js|tsx|ts)$/, '');
    
    // Check if it matches
    if (importPath !== correctPath) {
      const oldStatement = m.fullMatch;
      const newStatement = `from ${m.quote}${correctPath}${m.quote}`;
      
      newContent = newContent.substring(0, m.index) + 
                   newStatement + 
                   newContent.substring(m.index + oldStatement.length);
      
      hasChanges = true;
      
      fixes.push({
        file: relativePath,
        old: importPath,
        new: correctPath,
        actualFile: found.actualPath
      });
    }
  });
  
  if (hasChanges) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✓ Fixed: ${relativePath}`);
  }
}

function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory() && !['node_modules', '.git', 'dist'].includes(entry.name)) {
      scanDirectory(fullPath);
    } else if (entry.isFile() && /\.(jsx|js|tsx|ts)$/.test(entry.name)) {
      fixImportsInFile(fullPath);
    }
  }
}

console.log('🔍 Building file map...');
buildFileMap(SRC_DIR);
console.log(`   Found ${fileMap.size} files\n`);

console.log('🔧 Scanning and fixing imports...\n');
scanDirectory(SRC_DIR);

console.log('\n' + '='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log(`Fixes applied: ${fixes.length}`);
console.log(`Issues found: ${issues.length}`);

if (fixes.length > 0) {
  console.log('\n✅ FIXED:');
  fixes.forEach((f, i) => {
    console.log(`\n${i + 1}. ${f.file}`);
    console.log(`   ${f.old} → ${f.new}`);
  });
}

if (issues.length > 0) {
  console.log('\n❌ ISSUES (files not found):');
  issues.forEach((iss, i) => {
    console.log(`\n${i + 1}. ${iss.file}`);
    console.log(`   Import: ${iss.import}`);
  });
}

// Save report
const report = { fixes, issues, timestamp: new Date().toISOString() };
fs.writeFileSync('import-fix-report.json', JSON.stringify(report, null, 2));
console.log('\n📄 Report saved to: import-fix-report.json\n');
