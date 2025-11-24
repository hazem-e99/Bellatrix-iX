const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, 'src');
const REPORT_FILE = path.join(__dirname, 'import-fix-report.json');
const EXTENSIONS = ['.jsx', '.js', '.tsx', '.ts'];

// Results tracking
const results = {
  filesScanned: 0,
  issuesFound: [],
  fixesApplied: [],
  errors: [],
  nonExistentFiles: [],
  fileMap: {}
};

// Build a map of all files with their exact case-sensitive paths
function buildFileMap(dir, fileMap = {}) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist') {
          buildFileMap(fullPath, fileMap);
        }
      } else if (entry.isFile() && EXTENSIONS.some(ext => entry.name.endsWith(ext))) {
        const relativePath = path.relative(SRC_DIR, fullPath);
        const normalizedPath = relativePath.toLowerCase().replace(/\\/g, '/');
        fileMap[normalizedPath] = {
          actualPath: relativePath.replace(/\\/g, '/'),
          fullPath: fullPath,
          name: entry.name
        };
      }
    }
  } catch (error) {
    results.errors.push({ type: 'buildFileMap', path: dir, error: error.message });
  }
  
  return fileMap;
}

// Extract all import statements from a file
function extractImports(filePath, content) {
  const imports = [];
  
  // Match: import ... from '...' or import ... from "..."
  const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"]/g;
  
  // Match: require('...') or require("...")
  const requireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    imports.push({
      type: 'import',
      path: match[1],
      fullMatch: match[0],
      index: match.index
    });
  }
  
  while ((match = requireRegex.exec(content)) !== null) {
    imports.push({
      type: 'require',
      path: match[1],
      fullMatch: match[0],
      index: match.index
    });
  }
  
  return imports;
}

// Resolve import path to actual file
function resolveImportPath(importPath, currentFilePath, fileMap) {
  // Skip external packages and absolute paths
  if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
    return null;
  }
  
  const currentDir = path.dirname(currentFilePath);
  let resolvedPath = path.join(currentDir, importPath);
  resolvedPath = path.relative(SRC_DIR, resolvedPath).replace(/\\/g, '/');
  
  // Try with various extensions
  const possiblePaths = [
    resolvedPath,
    resolvedPath + '.jsx',
    resolvedPath + '.js',
    resolvedPath + '.tsx',
    resolvedPath + '.ts',
    resolvedPath + '/index.jsx',
    resolvedPath + '/index.js',
    resolvedPath + '/index.tsx',
    resolvedPath + '/index.ts'
  ];
  
  for (const testPath of possiblePaths) {
    const normalized = testPath.toLowerCase();
    if (fileMap[normalized]) {
      return fileMap[normalized];
    }
  }
  
  return null;
}

// Check if import path matches the actual file case
function checkImportCase(importPath, actualFile, currentFilePath) {
  const currentDir = path.dirname(currentFilePath);
  let expectedPath = path.join(currentDir, importPath).replace(/\\/g, '/');
  expectedPath = path.relative(SRC_DIR, expectedPath).replace(/\\/g, '/');
  
  // Remove extension from expected path for comparison
  const expectedWithoutExt = expectedPath.replace(/\.(jsx|js|tsx|ts)$/, '');
  const actualWithoutExt = actualFile.actualPath.replace(/\.(jsx|js|tsx|ts)$/, '');
  
  return expectedWithoutExt === actualWithoutExt;
}

// Generate correct import path
function generateCorrectImportPath(currentFilePath, targetFile) {
  const currentDir = path.dirname(currentFilePath);
  let relativePath = path.relative(path.join(SRC_DIR, currentDir), path.join(SRC_DIR, targetFile.actualPath));
  relativePath = relativePath.replace(/\\/g, '/');
  
  // Ensure it starts with ./ or ../
  if (!relativePath.startsWith('.')) {
    relativePath = './' + relativePath;
  }
  
  // Remove extension for cleaner imports (Vite handles this)
  relativePath = relativePath.replace(/\.(jsx|js|tsx|ts)$/, '');
  
  return relativePath;
}

// Scan a single file for import issues
function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(SRC_DIR, filePath).replace(/\\/g, '/');
    
    results.filesScanned++;
    
    const imports = extractImports(filePath, content);
    let modifiedContent = content;
    let hasChanges = false;
    
    // Process imports in reverse order to maintain correct indices
    const sortedImports = imports.sort((a, b) => b.index - a.index);
    
    for (const imp of sortedImports) {
      // Skip external packages
      if (!imp.path.startsWith('.') && !imp.path.startsWith('/')) {
        continue;
      }
      
      const resolvedFile = resolveImportPath(imp.path, relativePath, results.fileMap);
      
      if (!resolvedFile) {
        // File doesn't exist
        results.nonExistentFiles.push({
          file: relativePath,
          importPath: imp.path,
          line: content.substring(0, imp.index).split('\n').length
        });
        results.issuesFound.push({
          file: relativePath,
          type: 'non-existent',
          importPath: imp.path,
          issue: 'File does not exist'
        });
      } else {
        // Check case sensitivity
        const caseMatches = checkImportCase(imp.path, resolvedFile, relativePath);
        
        if (!caseMatches) {
          const correctPath = generateCorrectImportPath(relativePath, resolvedFile);
          
          results.issuesFound.push({
            file: relativePath,
            type: 'case-mismatch',
            importPath: imp.path,
            correctPath: correctPath,
            actualFile: resolvedFile.actualPath
          });
          
          // Fix the import
          const oldImport = imp.fullMatch;
          const newImport = oldImport.replace(
            new RegExp(`(['"])${imp.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`),
            `$1${correctPath}$1`
          );
          
          modifiedContent = modifiedContent.substring(0, imp.index) + 
                          newImport + 
                          modifiedContent.substring(imp.index + oldImport.length);
          
          hasChanges = true;
          
          results.fixesApplied.push({
            file: relativePath,
            oldImport: imp.path,
            newImport: correctPath,
            reason: 'Case sensitivity mismatch'
          });
        }
      }
    }
    
    // Write changes if any
    if (hasChanges) {
      fs.writeFileSync(filePath, modifiedContent, 'utf-8');
      console.log(`✓ Fixed: ${relativePath}`);
    }
    
  } catch (error) {
    results.errors.push({
      type: 'scanFile',
      path: filePath,
      error: error.message
    });
  }
}

// Scan all files recursively
function scanDirectory(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist') {
          scanDirectory(fullPath);
        }
      } else if (entry.isFile() && EXTENSIONS.some(ext => entry.name.endsWith(ext))) {
        scanFile(fullPath);
      }
    }
  } catch (error) {
    results.errors.push({
      type: 'scanDirectory',
      path: dir,
      error: error.message
    });
  }
}

// Generate human-readable report
function generateReport() {
  console.log('\n' + '='.repeat(80));
  console.log('IMPORT PATH FIX REPORT');
  console.log('='.repeat(80));
  
  console.log(`\n📊 SUMMARY:`);
  console.log(`   Files Scanned: ${results.filesScanned}`);
  console.log(`   Issues Found: ${results.issuesFound.length}`);
  console.log(`   Fixes Applied: ${results.fixesApplied.length}`);
  console.log(`   Non-Existent Files: ${results.nonExistentFiles.length}`);
  console.log(`   Errors: ${results.errors.length}`);
  
  if (results.fixesApplied.length > 0) {
    console.log(`\n✅ FIXES APPLIED (${results.fixesApplied.length}):`);
    results.fixesApplied.forEach((fix, i) => {
      console.log(`\n   ${i + 1}. ${fix.file}`);
      console.log(`      Old: ${fix.oldImport}`);
      console.log(`      New: ${fix.newImport}`);
      console.log(`      Reason: ${fix.reason}`);
    });
  }
  
  if (results.nonExistentFiles.length > 0) {
    console.log(`\n❌ NON-EXISTENT FILES (${results.nonExistentFiles.length}):`);
    results.nonExistentFiles.forEach((item, i) => {
      console.log(`\n   ${i + 1}. ${item.file} (line ~${item.line})`);
      console.log(`      Import: ${item.importPath}`);
    });
  }
  
  if (results.errors.length > 0) {
    console.log(`\n⚠️  ERRORS (${results.errors.length}):`);
    results.errors.forEach((err, i) => {
      console.log(`\n   ${i + 1}. ${err.type}: ${err.path}`);
      console.log(`      ${err.error}`);
    });
  }
  
  console.log('\n' + '='.repeat(80));
  
  // Save detailed JSON report
  fs.writeFileSync(REPORT_FILE, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\n📄 Detailed report saved to: ${REPORT_FILE}`);
}

// Main execution
console.log('🔍 Starting import path scan...\n');
console.log('Step 1: Building file map...');
results.fileMap = buildFileMap(SRC_DIR);
console.log(`   Found ${Object.keys(results.fileMap).length} files\n`);

console.log('Step 2: Scanning files for import issues...');
scanDirectory(SRC_DIR);

console.log('\nStep 3: Generating report...');
generateReport();

console.log('\n✨ Done!\n');
