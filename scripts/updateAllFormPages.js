const fs = require('fs');
const path = require('path');

// List of form pages to update
const formPages = [
  'app/assetForm1/page.jsx',
  'app/assetForm2/page.jsx',
  'app/assetForm3/page.jsx',
  'app/assetForm4/page.jsx',
  'app/assetForm5/page.jsx',
  'app/assetForm6/page.jsx',
  'app/assetForm7/page.jsx',
  'app/assetForm8/page.jsx',
  'app/assetForm9/page.jsx'
];

formPages.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace Clerk imports with SimpleProtectedRoute
    content = content.replace(
      /import { useUser } from "@clerk\/nextjs";\s*\nimport ProtectedRoute from "@\/components\/ProtectedRoute";/g,
      'import SimpleProtectedRoute from "@/components/SimpleProtectedRoute";'
    );
    
    // Replace ProtectedRoute with SimpleProtectedRoute
    content = content.replace(/ProtectedRoute/g, 'SimpleProtectedRoute');
    
    // Remove any remaining Clerk imports
    content = content.replace(/import.*@clerk.*\n/g, '');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
});

console.log('🎉 All form pages updated!');
