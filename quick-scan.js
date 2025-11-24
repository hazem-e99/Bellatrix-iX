const fs = require('fs');
const path = require('path');

console.log('Starting quick import scan...\n');

const srcDir = path.join(__dirname, 'src');
const results = [];

// Get all JS/JSX files
function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (!['node_modules', '.git', 'dist'].includes(file)) {
                getAllFiles(filePath, fileList);
            }
        } else if (/\.(jsx|js|tsx|ts)$/.test(file)) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Build file existence map
const fileMap = new Map();
const allFiles = getAllFiles(srcDir);

allFiles.forEach(file => {
    const rel = path.relative(srcDir, file).replace(/\\/g, '/');
    fileMap.set(rel.toLowerCase(), rel);
});

console.log(`Found ${allFiles.length} files\n`);

// Check each file's imports
allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relPath = path.relative(srcDir, file).replace(/\\/g, '/');
    
    // Find imports
    const importRegex = /from\s+['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        
        // Only check relative imports
        if (!importPath.startsWith('.')) continue;
        
        const currentDir = path.dirname(relPath);
        let targetPath = path.join(currentDir, importPath).replace(/\\/g, '/');
        
        // Check if file exists (try different extensions)
        let found = false;
        const exts = ['', '.jsx', '.js', '.tsx', '.ts', '/index.jsx', '/index.js'];
        
        for (const ext of exts) {
            if (fileMap.has((targetPath + ext).toLowerCase())) {
                const actualPath = fileMap.get((targetPath + ext).toLowerCase());
                const expectedPath = targetPath + ext;
                
                // Check case sensitivity
                if (actualPath !== expectedPath) {
                    results.push({
                        file: relPath,
                        import: importPath,
                        expected: expectedPath,
                        actual: actualPath,
                        issue: 'case-mismatch'
                    });
                }
                found = true;
                break;
            }
        }
        
        if (!found) {
            results.push({
                file: relPath,
                import: importPath,
                issue: 'not-found'
            });
        }
    }
});

// Print results
console.log('='.repeat(80));
console.log('RESULTS');
console.log('='.repeat(80));
console.log(`Total issues found: ${results.length}\n`);

const caseMismatches = results.filter(r => r.issue === 'case-mismatch');
const notFound = results.filter(r => r.issue === 'not-found');

if (caseMismatches.length > 0) {
    console.log(`\nCASE MISMATCHES (${caseMismatches.length}):`);
    caseMismatches.slice(0, 20).forEach((r, i) => {
        console.log(`\n${i + 1}. ${r.file}`);
        console.log(`   Import: ${r.import}`);
        console.log(`   Expected: ${r.expected}`);
        console.log(`   Actual: ${r.actual}`);
    });
}

if (notFound.length > 0) {
    console.log(`\n\nNOT FOUND (${notFound.length}):`);
    notFound.slice(0, 20).forEach((r, i) => {
        console.log(`\n${i + 1}. ${r.file}`);
        console.log(`   Import: ${r.import}`);
    });
}

fs.writeFileSync('import-issues.json', JSON.stringify(results, null, 2));
console.log(`\n\nFull report saved to: import-issues.json`);
console.log('='.repeat(80));
