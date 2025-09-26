const fs = require('fs');
const path = require('path');

// List of form pages that need Suspense wrappers
const formPages = [
  'app/assetForm2/page.jsx',
  'app/assetForm3/page.jsx',
  'app/assetForm4/page.jsx',
  'app/assetForm6/page.jsx',
  'app/assetForm7/page.jsx',
  'app/assetForm8/page.jsx',
  'app/assetForm9/page.jsx'
];

formPages.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it already has Suspense wrapper
    if (content.includes('Suspense') && content.includes('fallback')) {
      console.log(`✅ ${filePath} already has Suspense wrapper`);
      return;
    }
    
    // Add Suspense import
    if (!content.includes('Suspense')) {
      content = content.replace(
        /import React, { ([^}]+) } from 'react';/,
        'import React, { $1, Suspense } from \'react\';'
      );
    }
    
    // Find the main component function (usually the last function before export)
    const lines = content.split('\n');
    let mainComponentStart = -1;
    let mainComponentName = '';
    
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].includes('export default')) {
        // Look backwards for the main component
        for (let j = i - 1; j >= 0; j--) {
          if (lines[j].match(/^const \w+ = \(\) => \{/)) {
            mainComponentStart = j;
            mainComponentName = lines[j].match(/^const (\w+) = \(\) => \{/)[1];
            break;
          }
        }
        break;
      }
    }
    
    if (mainComponentStart === -1) {
      console.log(`❌ Could not find main component in ${filePath}`);
      return;
    }
    
    // Rename the main component to add "Content" suffix
    const contentComponentName = mainComponentName + 'Content';
    content = content.replace(
      new RegExp(`const ${mainComponentName} = \\(\\) => \\{`, 'g'),
      `const ${contentComponentName} = () => {`
    );
    
    // Add the new main component with Suspense wrapper before export
    const suspenseWrapper = `
// Main component with Suspense wrapper
const ${mainComponentName} = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-gray-200/50 max-w-md mx-auto">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Loading Form</h3>
          <p className="text-gray-600 mb-6">Please wait while we load the form...</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    }>
      <${contentComponentName} />
    </Suspense>
  );
};`;
    
    // Insert before export
    content = content.replace(
      /export default/,
      `${suspenseWrapper}\n\nexport default`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${filePath} with Suspense wrapper`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
});

console.log('🎉 Suspense boundary fixes completed!');
