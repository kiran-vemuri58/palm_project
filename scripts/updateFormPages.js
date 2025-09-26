const fs = require('fs');
const path = require('path');

// List of form pages to update
const formPages = [
  'app/assetForm2/page.jsx',
  'app/assetForm3/page.jsx',
  'app/assetForm4/page.jsx',
  'app/assetForm5/page.jsx',
  'app/assetForm6/page.jsx',
  'app/assetForm7/page.jsx',
  'app/assetForm8/page.jsx',
  'app/assetForm9/page.jsx'
];

// Import statement to add
const importStatement = `import ProtectedRoute from "@/components/ProtectedRoute";`;

// Function to update a file
function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already has ProtectedRoute import
    if (content.includes('ProtectedRoute')) {
      console.log(`✅ ${filePath} already updated`);
      return;
    }
    
    // Add import after other imports
    const importRegex = /(import.*from.*["'].*["'];?\s*)+/;
    const match = content.match(importRegex);
    
    if (match) {
      const lastImport = match[0].split('\n').filter(line => line.trim()).pop();
      const lastImportIndex = content.lastIndexOf(lastImport);
      const insertIndex = lastImportIndex + lastImport.length;
      
      content = content.slice(0, insertIndex) + '\n' + importStatement + content.slice(insertIndex);
    }
    
    // Find the main component export and wrap with ProtectedRoute
    const componentRegex = /(const\s+\w+\s*=\s*\(\)\s*=>\s*{[\s\S]*?return\s*\([\s\S]*?\);\s*};)/;
    const componentMatch = content.match(componentRegex);
    
    if (componentMatch) {
      const componentCode = componentMatch[1];
      const wrappedComponent = componentCode.replace(
        /return\s*\(([\s\S]*?)\);/,
        `return (
    <ProtectedRoute>
      $1
    </ProtectedRoute>
  );`
      );
      
      content = content.replace(componentCode, wrappedComponent);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

// Update all form pages
formPages.forEach(updateFile);

console.log('🎉 All form pages updated with ProtectedRoute!');
