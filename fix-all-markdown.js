const fs = require('fs');
const path = require('path');

// Function to recursively get all files in a directory
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to fix a specific file
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
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
      .replace(/#### (\d+)️⃣/g, '#### ')
      
      // Fix JSX-like tags that might cause issues
      .replace(/(<)(\w+)([^>]*)(>)/g, (match, p1, p2, p3, p4) => {
        // Don't modify if it's an HTML tag or valid JSX
        const validTags = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th'];
        if (validTags.includes(p2.toLowerCase())) {
          return match;
        }
        return `{"${p1}"}${p2}${p3}{"${p4}"}`;
      });
    
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`Fixed: ${filePath}`);
      return true;
    } else {
      console.log(`No changes needed for: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Main function
function main() {
  const docsDir = path.join(__dirname, 'docs');
  const allFiles = getAllFiles(docsDir);
  
  console.log(`Found ${allFiles.length} Markdown files to process`);
  
  let fixedCount = 0;
  
  allFiles.forEach(file => {
    const relative = path.relative(__dirname, file);
    console.log(`Processing: ${relative}`);
    if (fixFile(file)) {
      fixedCount++;
    }
  });
  
  console.log(`Finished fixing MDX syntax issues in ${fixedCount} of ${allFiles.length} files.`);
}

// Run the script
main(); 