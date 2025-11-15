const fs = require('fs');
const path = require('path');

const checkDir = (dir, results = []) => {
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory() && !file.name.includes('node_modules') && !file.name.includes('.git')) {
        checkDir(fullPath, results);
      } else if (file.name.endsWith('.jsx') || file.name.endsWith('.js')) {
        try {
          const lines = fs.readFileSync(fullPath, 'utf8').split('\n').length;
          if (lines > 100) {
            results.push({ path: fullPath, lines });
          }
        } catch (err) {
          // Skip files that can't be read
        }
      }
    });
  } catch (err) {
    // Skip directories that can't be read
  }
  return results;
};

console.log('=== Admin Components (>100 lines) ===');
const adminFiles = checkDir('src/components/Admin');
adminFiles.sort((a, b) => b.lines - a.lines);
adminFiles.forEach(f => console.log(`${f.path}: ${f.lines} lines`));

console.log('\n=== Pages (>100 lines) ===');
const pageFiles = checkDir('src/pages');
pageFiles.sort((a, b) => b.lines - a.lines);
pageFiles.forEach(f => console.log(`${f.path}: ${f.lines} lines`));

console.log('\n=== Hooks (>100 lines) ===');
const hookFiles = checkDir('src/hooks');
hookFiles.sort((a, b) => b.lines - a.lines);
hookFiles.forEach(f => console.log(`${f.path}: ${f.lines} lines`));

console.log('\n=== All Components (>100 lines) ===');
const allFiles = checkDir('src/components');
allFiles.sort((a, b) => b.lines - a.lines).slice(0, 20);
allFiles.forEach(f => console.log(`${f.path}: ${f.lines} lines`));

