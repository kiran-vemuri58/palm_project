const fs = require('fs');
const path = require('path');

// List of form pages to fix
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
    
    // Remove useUser line
    content = content.replace(/.*useUser.*\n/g, '');
    
    // Remove any remaining Clerk imports
    content = content.replace(/.*@clerk.*\n/g, '');
    
    // Remove authChecked state if it exists
    content = content.replace(/.*authChecked.*\n/g, '');
    
    // Remove isLoaded, isSignedIn, user variables
    content = content.replace(/.*isLoaded.*\n/g, '');
    content = content.replace(/.*isSignedIn.*\n/g, '');
    content = content.replace(/.*user.*\n/g, '');
    
    // Clean up any empty lines that might have been created
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Cleaned ${filePath}`);
  } catch (error) {
    console.error(`❌ Error cleaning ${filePath}:`, error.message);
  }
});

console.log('🎉 Clerk references removed from all form pages!');
