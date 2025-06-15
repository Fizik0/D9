const fs = require('fs');
const path = require('path');

// List of problematic files with specific issues
const filesToFix = [
  'docs/d-blocks/d1-discover/jobs-to-be-done.md',
  'docs/intro.md',
  'docs/level-1/D3-design/development.md',
  'docs/level-1/D3-design/integration.md',
  'docs/level-1/D3-design/product-strategy.md',
  'docs/level-1/D3-design/testing.md',
  'docs/level-1/D3-design/ux-design.md'
];

// Function to fix a specific file
function fixFile(filePath) {
  try {
    const fullPath = path.join(__dirname, filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${fullPath}`);
      return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix specific patterns that cause MDX syntax issues
    let fixedContent = content
      // Fix percentage formatting issues
      .replace(/(\d+)%/g, '"$1%"')
      .replace(/(\d+) процентов/g, '"$1 процентов"')
      .replace(/(\d+)-(\d+)%/g, '"$1-$2%"')
      .replace(/(\d+)-(\d+) процентов/g, '"$1-$2 процентов"')
      
      // Replace angle brackets with proper words
      .replace(/[<] ?(\d+[.,]?\d*)/g, 'Менее $1')
      .replace(/[>] ?(\d+[.,]?\d*)/g, 'Более $1')
      
      // Fix numerical ranges with angle brackets
      .replace(/(Менее|Более) (\d+[.,]?\d*)-(\d+[.,]?\d*)/g, '$1 "$2-$3"')
      
      // Fix numerical scores with quotes
      .replace(/(\d+[.,]\d+)/g, '"$1"')
      
      // Fix emoji headers
      .replace(/#### ([🎯📊🧠💡])/g, '#### ')
      
      // Fix number+emoji headers
      .replace(/#### (\d+)️⃣/g, '#### ');
    
    if (content !== fixedContent) {
      fs.writeFileSync(fullPath, fixedContent, 'utf8');
      console.log(`Fixed: ${filePath}`);
    } else {
      console.log(`No changes needed for: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Process all files
filesToFix.forEach(filePath => {
  console.log(`Processing: ${filePath}`);
  fixFile(filePath);
});

console.log('Finished fixing MDX syntax issues.'); 