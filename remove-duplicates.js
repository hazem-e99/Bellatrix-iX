import fs from 'fs';

try {
  // Read the file
  let content = fs.readFileSync('src/components/Admin/EnhancedPageBuilder.jsx', 'utf8');
  
  // Find the end of the clean components section
  const endPattern = /\s*\};\s*\};\s*const getDefaultDataForComponent/;
  const endMatch = content.match(endPattern);
  
  if (!endMatch) {
    console.error('Could not find end pattern');
    process.exit(1);
  }
  
  // Get everything before the clean end
  const cleanContent = content.substring(0, endMatch.index + endMatch[0].length);
  
  // Get everything after the old components (find const updateComponent)
  const afterPattern = /const updateComponent = /;
  const afterMatch = content.match(afterPattern);
  
  if (!afterMatch) {
    console.error('Could not find after pattern');
    process.exit(1);
  }
  
  const afterContent = content.substring(afterMatch.index);
  
  // Combine clean content with after content
  const finalContent = cleanContent + '\n\n  ' + afterContent;
  
  // Write the clean file
  fs.writeFileSync('src/components/Admin/EnhancedPageBuilder.jsx', finalContent, 'utf8');
  
  console.log('✅ File cleaned successfully!');
  console.log('🗑️ Removed all duplicate components');
  
} catch (error) {
  console.error('❌ Error:', error.message);
}