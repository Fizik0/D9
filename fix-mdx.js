const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);

// Function to fix MDX syntax issues in a file
async function fixMdxFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`);
    let content = await readFileAsync(filePath, 'utf8');
    
    // Replace problematic patterns
    
    // Fix numeric characters in headers with ratings
    content = content.replace(/(\*\*>|\*\*<)(\d+,\d+)/g, '**"$1$2"');
    content = content.replace(/(\*\*\d+,\d+-\d+,\d+\*\*)/g, '**"$1"**');
    
    // Fix lines with calculations that have numbers followed by × (multiplication symbol)
    content = content.replace(/(\d+)×/g, '"$1"×');
    
    // Fix lines with calculations that have numbers followed by ÷ (division symbol)
    content = content.replace(/(\d+)÷/g, '"$1"÷');
    
    // Fix specific problematic patterns in headers
    content = content.replace(/(####\s+)(\d+[^\n]*)/g, '$1"$2"');
    
    // Fix numeric emoji patterns like 1️⃣, 2️⃣, etc.
    content = content.replace(/(\d)️⃣/g, '"$1"️⃣');
    
    // Replace < with "Менее" and > with "Более"
    content = content.replace(/\*\*<(\d)/g, '**Менее $1');
    content = content.replace(/\*\*>(\d)/g, '**Более $1');
    
    // Fix rating ranges
    content = content.replace(/(\d+,\d+)-(\d+,\d+)/g, '"$1-$2"');
    
    // Fix any remaining JSX-like constructs with numbers
    content = content.replace(/<(\d+[^>]*?)>/g, '&lt;$1&gt;');
    
    // Fix calculation lines
    const calculationRegex = /(Excellence|Maturity Index|Index)\s*=\s*\(([^)]+)\)/g;
    content = content.replace(calculationRegex, (match, name, formula) => {
      // Wrap the entire formula in quotes
      return `${name} = "${formula}"`;
    });
    
    // Write the fixed content back to the file
    await writeFileAsync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Function to recursively process all .md files in a directory
async function processDirectory(dirPath) {
  try {
    const entries = await readdirAsync(dirPath);
    
    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry);
      const stats = await statAsync(entryPath);
      
      if (stats.isDirectory()) {
        await processDirectory(entryPath);
      } else if (stats.isFile() && entryPath.endsWith('.md')) {
        await fixMdxFile(entryPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}

// Main function
async function main() {
  const rootDir = './docs';
  console.log(`Starting to process Markdown files in ${rootDir}`);
  await processDirectory(rootDir);
  console.log('Finished processing all files');
}

// Run the script
main().catch(console.error); 