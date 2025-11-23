
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('src');
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.svg', '.png', '.jpg', '.jpeg'];

// 1. Build a map of all files: lowercase path -> actual path
const fileMap = new Map();
const allFiles = [];

function scanDir(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else {
            fileMap.set(fullPath.toLowerCase(), fullPath);
            allFiles.push(fullPath);
        }
    }
}

console.log('Scanning files...');
scanDir(rootDir);
console.log(`Found ${allFiles.length} files.`);

// 2. Scan all JS/JSX files for imports
const sourceFiles = allFiles.filter(f => f.endsWith('.js') || f.endsWith('.jsx'));
const updates = [];

for (const file of sourceFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    const dir = path.dirname(file);
    
    // Regex to find imports: import ... from '...' or import '...'
    // Also dynamic imports: import('...')
    // We'll focus on static imports for now as they are the most common source of build errors.
    // Regex: (import|export)\s+(?:[^'"]*from\s+)?['"]([^'"]+)['"]
    // This is a bit simplified but should catch most.
    
    const importRegex = /(import|export)\s+(?:[^'"]*from\s+)?['"]([^'"]+)['"]/g;
    let match;
    
    // We need to replace in the string, but regex exec loop is better for analysis.
    // We'll accumulate replacements.
    
    let newContent = content.replace(importRegex, (fullMatch, keyword, importPath) => {
        if (importPath.startsWith('.')) {
            // Resolve path
            const absoluteImportPath = path.resolve(dir, importPath);
            
            // We need to check if this path exists in our map (ignoring extension first? or trying extensions?)
            // Vite/Node resolution logic:
            // 1. Exact match
            // 2. + .js
            // 3. + .jsx
            // 4. + /index.js
            // 5. + /index.jsx
            
            let resolvedPath = null;
            let usedExtension = '';
            
            // Helper to check existence
            const check = (p) => {
                if (fileMap.has(p.toLowerCase())) {
                    return fileMap.get(p.toLowerCase());
                }
                return null;
            };
            
            // Try exact first (if it has extension)
            let found = check(absoluteImportPath);
            if (found) {
                 // It exists. Check case.
                 // But wait, if importPath doesn't have extension, and file does, we might want to add extension?
                 // User said: "If an import might need a .jsx or .js extension, add it explicitly"
            } else {
                // Try extensions
                for (const ext of ['.jsx', '.js', '/index.jsx', '/index.js', '.json', '.css']) {
                     const p = absoluteImportPath + ext;
                     // Handle /index case correctly: path.resolve strips trailing slash, so we append /index...
                     // Actually path.resolve('foo', 'bar') -> foo/bar. 
                     // If import is './foo', absolute is .../foo. 
                     // We try .../foo.jsx, .../foo/index.jsx
                     
                     // Special handling for index: if import is './foo', we check .../foo/index.jsx
                     // But simple concatenation works: .../foo + /index.jsx -> .../foo/index.jsx
                     
                     // Wait, if import is './foo', absolute is .../foo. 
                     // .../foo + '.jsx' = .../foo.jsx
                     
                     // If import is './foo/', absolute is .../foo.
                     
                     found = check(absoluteImportPath + ext);
                     if (found) {
                         usedExtension = ext;
                         break;
                     }
                }
            }
            
            if (found) {
                // We found the file. Now check for case mismatch or missing extension.
                const relativeFound = path.relative(dir, found);
                // Normalize relative path (windows backslashes to forward slashes)
                let newImportPath = relativeFound.replace(/\\/g, '/');
                if (!newImportPath.startsWith('.')) {
                    newImportPath = './' + newImportPath;
                }
                
                // Check if we need to update
                if (importPath !== newImportPath) {
                    console.log(`[FIX] ${path.relative(process.cwd(), file)}: '${importPath}' -> '${newContent}' (Found: ${path.relative(process.cwd(), found)})`);
                    // Return the new import line
                    // We need to reconstruct the line. 
                    // fullMatch is like "import Foo from './bar'"
                    // We replace importPath in it.
                    // Be careful with quotes.
                    
                    // Actually, simpler: return fullMatch with importPath replaced.
                    // We know importPath is exactly the 2nd group.
                    
                    // But wait, replace loop replaces ALL occurrences. 
                    // If I return the new string, it works.
                    
                    return fullMatch.replace(importPath, newImportPath);
                }
            } else {
                // console.log(`[WARN] Could not resolve '${importPath}' in ${path.relative(process.cwd(), file)}`);
            }
        }
        return fullMatch;
    });
    
    if (newContent !== originalContent) {
        fs.writeFileSync(file, newContent);
        console.log(`Updated ${path.relative(process.cwd(), file)}`);
    }
}
