const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const issues = [];
const fixes = [];

// Get all JS/JSX files recursively
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.match(/\.(jsx?|tsx?)$/)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Check if a file exists with case-insensitive search
function findActualFile(importPath, fromFile) {
  const fromDir = path.dirname(fromFile);
  const resolvedPath = path.resolve(fromDir, importPath);
  
  // Try exact match first
  if (fs.existsSync(resolvedPath)) {
    return { exists: true, actualPath: resolvedPath, isExact: true };
  }
  
  // Try with extensions
  const extensions = ['.jsx', '.js', '.tsx', '.ts'];
  for (const ext of extensions) {
    const withExt = resolvedPath + ext;
    if (fs.existsSync(withExt)) {
      return { exists: true, actualPath: withExt, isExact: false, needsExtension: ext };
    }
  }
  
  // Try index files
  for (const ext of extensions) {
    const indexPath = path.join(resolvedPath, `index${ext}`);
    if (fs.existsSync(indexPath)) {
      return { exists: true, actualPath: indexPath, isExact: false, isIndex: true };
    }
  }
  
  // Try case-insensitive search
  const dir = path.dirname(resolvedPath);
  const targetName = path.basename(resolvedPath);
  
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    
    // Check for case mismatch
    for (const file of files) {
      if (file.toLowerCase() === targetName.toLowerCase()) {
        const actualPath = path.join(dir, file);
        return { exists: true, actualPath, isExact: false, caseMismatch: true };
      }
      
      // Check with extensions
      for (const ext of extensions) {
        if (file.toLowerCase() === (targetName + ext).toLowerCase()) {
          const actualPath = path.join(dir, file);
          return { exists: true, actualPath, isExact: false, caseMismatch: true, needsExtension: ext };
        }
      }
    }
  }
  
  return { exists: false };
}

// Get the correct import path
function getCorrectImportPath(fromFile, actualFilePath, originalImport) {
  const fromDir = path.dirname(fromFile);
  let relativePath = path.relative(fromDir, actualFilePath);
  
  // Convert Windows backslashes to forward slashes
  relativePath = relativePath.replace(/\\/g, '/');
  
  // Add ./ or ../ prefix if needed
  if (!relativePath.startsWith('.')) {
    relativePath = './' + relativePath;
  }
  
  // Remove extension if it's .jsx or .js (Vite handles this)
  relativePath = relativePath.replace(/\.(jsx|js|tsx|ts)$/, '');
  
  return relativePath;
}

// Process import statement
function processImport(line, filePath) {
  // Match import statements
  const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\w+))?\s+from\s+)?['"]([^'"]+)['"]/g;
  
  let match;
  const lineIssues = [];
  
  while ((match = importRegex.exec(line)) !== null) {
    const importPath = match[1];
    
    // Skip node_modules and absolute imports
    if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
      continue;
    }
    
    const result = findActualFile(importPath, filePath);
    
    if (!result.exists) {
      lineIssues.push({
        type: 'missing',
        original: importPath,
        line: line.trim()
      });
    } else if (!result.isExact) {
      const correctPath = getCorrectImportPath(filePath, result.actualPath, importPath);
      
      if (correctPath !== importPath) {
        lineIssues.push({
          type: result.caseMismatch ? 'case-mismatch' : 'needs-fix',
          original: importPath,
          correct: correctPath,
          line: line.trim(),
          reason: result.caseMismatch ? 'Case mismatch' : 
                  result.needsExtension ? `Missing extension ${result.needsExtension}` :
                  result.isIndex ? 'Index file' : 'Path mismatch'
        });
      }
    }
  }
  
  return lineIssues;
}

// Fix imports in a file
function fixImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let modified = false;
  let newContent = content;
  
  lines.forEach((line, index) => {
    const lineIssues = processImport(line, filePath);
    
    lineIssues.forEach(issue => {
      if (issue.type !== 'missing' && issue.correct) {
        const oldImport = `"${issue.original}"`;
        const newImport = `"${issue.correct}"`;
        const oldImportSingle = `'${issue.original}'`;
        const newImportSingle = `'${issue.correct}'`;
        
        if (newContent.includes(oldImport)) {
          newContent = newContent.replace(oldImport, newImport);
          modified = true;
          fixes.push({
            file: path.relative(srcDir, filePath),
            line: index + 1,
            from: issue.original,
            to: issue.correct,
            reason: issue.reason
          });
        } else if (newContent.includes(oldImportSingle)) {
          newContent = newContent.replace(oldImportSingle, newImportSingle);
          modified = true;
          fixes.push({
            file: path.relative(srcDir, filePath),
            line: index + 1,
            from: issue.original,
            to: issue.correct,
            reason: issue.reason
          });
        }
      } else if (issue.type === 'missing') {
        issues.push({
          file: path.relative(srcDir, filePath),
          line: index + 1,
          import: issue.original,
          type: 'MISSING FILE'
        });
      }
    });
  });
  
  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  }
  
  return false;
}

// Main execution
console.log('🔍 Scanning all imports in src/...\n');

const allFiles = getAllFiles(srcDir);
console.log(`Found ${allFiles.length} files to scan\n`);

let filesFixed = 0;

allFiles.forEach(file => {
  if (fixImportsInFile(file)) {
    filesFixed++;
  }
});

console.log('\n📊 RESULTS:\n');
console.log(`✅ Files scanned: ${allFiles.length}`);
console.log(`🔧 Files fixed: ${filesFixed}`);
console.log(`⚠️  Import fixes applied: ${fixes.length}`);
console.log(`❌ Missing files detected: ${issues.length}\n`);

if (fixes.length > 0) {
  console.log('🔧 FIXES APPLIED:\n');
  fixes.forEach(fix => {
    console.log(`  ${fix.file}:${fix.line}`);
    console.log(`    ❌ "${fix.from}"`);
    console.log(`    ✅ "${fix.to}"`);
    console.log(`    📝 ${fix.reason}\n`);
  });
}

if (issues.length > 0) {
  console.log('❌ MISSING FILES (need manual review):\n');
  issues.forEach(issue => {
    console.log(`  ${issue.file}:${issue.line}`);
    console.log(`    Missing: "${issue.import}"\n`);
  });
}

console.log('\n✨ Import fixing complete!\n');
