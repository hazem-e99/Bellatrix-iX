const fs = require("fs");
const path = require("path");

// Files to clean
const filesToClean = [
  "./src/components/Admin/EnhancedPageBuilder.jsx",
  "./src/components/Admin/PagePreview.jsx",
  "./src/components/UI/LivePreview.jsx",
];

function removeConsoleLogs(filePath) {
  try {
    console.log(`🧹 Cleaning console logs from: ${filePath}`);

    let content = fs.readFileSync(filePath, "utf8");
    const originalLines = content.split("\n").length;

    // Remove console.log, console.error, console.warn statements
    // This regex handles multi-line console statements
    content = content.replace(
      /\s*console\.(log|error|warn|info|debug)\([^;]*\);?\n?/g,
      ""
    );

    // Remove empty lines that were left behind
    content = content.replace(/\n\s*\n\s*\n/g, "\n\n");

    // Write cleaned content back
    fs.writeFileSync(filePath, content, "utf8");

    const newLines = content.split("\n").length;
    console.log(`✅ Cleaned ${filePath}: ${originalLines} → ${newLines} lines`);
  } catch (error) {
    console.error(`❌ Error cleaning ${filePath}:`, error.message);
  }
}

// Clean all files
filesToClean.forEach((file) => {
  if (fs.existsSync(file)) {
    removeConsoleLogs(file);
  } else {
    console.warn(`⚠️  File not found: ${file}`);
  }
});

console.log("🎉 Console log cleanup complete!");
