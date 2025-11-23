
const fs = require('fs');
const path = require('path');

const logFile = path.resolve('fix_imports_log.txt');
function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

fs.writeFileSync(logFile, 'STARTING SCAN\n');

const rootDir = path.resolve('src');
const fileMap = new Map();
const allFiles = [];

function scanDir(dir) {
    try {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            if (item === 'node_modules' || item === '.git') continue;
            
            const fullPath = path.join(dir, item);
            try {
                const stat = fs.lstatSync(fullPath);
                if (stat.isDirectory()) {
                    if (!stat.isSymbolicLink()) {
                        scanDir(fullPath);
                    }
                } else {
                    fileMap.set(fullPath.toLowerCase(), fullPath);
                    allFiles.push(fullPath);
                }
            } catch (e) {
                log(`Error reading ${fullPath}: ${e.message}`);
            }
        }
    } catch (e) {
        log(`Error scanning dir ${dir}: ${e.message}`);
    }
}

log('Scanning files in src...');
scanDir(rootDir);
log(`Found ${allFiles.length} files.`);

const sourceFiles = allFiles.filter(f => f.endsWith('.js') || f.endsWith('.jsx'));
log(`Processing ${sourceFiles.length} JS/JSX files...`);

let fixedCount = 0;

for (const file of sourceFiles) {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        const dir = path.dirname(file);
        
        const importRegex = /(import|export)(\s+(?:[^'"]*from\s+)?)(['"])([^'"]+)(['"])/g;
        
        let newContent = content.replace(importRegex, (fullMatch, keyword, middle, quote1, importPath, quote2) => {
            if (importPath.startsWith('.')) {
                const absoluteImportPath = path.resolve(dir, importPath);
                
                let found = null;
                
                // Check exact match first (if extension provided)
                if (fileMap.has(absoluteImportPath.toLowerCase())) {
                    found = fileMap.get(absoluteImportPath.toLowerCase());
                }
                
                // Check extensions
                if (!found) {
                    for (const ext of ['.jsx', '.js', '/index.jsx', '/index.js', '.json', '.css', '.svg', '.png']) {
                        const p = absoluteImportPath + ext;
                        if (fileMap.has(p.toLowerCase())) {
                            found = fileMap.get(p.toLowerCase());
                            break;
                        }
                    }
                }
                
                if (found) {
                    const relativeFound = path.relative(dir, found);
                    let newImportPath = relativeFound.replace(/\\/g, '/');
                    if (!newImportPath.startsWith('.')) {
                        newImportPath = './' + newImportPath;
                    }
                    
                    if (importPath !== newImportPath) {
                        log(`[FIX] ${path.relative(process.cwd(), file)}: '${importPath}' -> '${newImportPath}'`);
                        return `${keyword}${middle}${quote1}${newImportPath}${quote2}`;
                    }
                }
            }
            return fullMatch;
        });
        
        if (newContent !== originalContent) {
            fs.writeFileSync(file, newContent);
            fixedCount++;
        }
    } catch (e) {
        log(`Error processing ${file}: ${e.message}`);
    }
}

log(`Finished. Fixed imports in ${fixedCount} files.`);
