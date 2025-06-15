const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

// Define the directories to scan
const directories = [
  'docs/d-blocks',
  'docs/level-1',
  'docs'
];

// Function to fix MDX syntax issues
async function fixFile(filePath) {
  try {
    // Read the file content
    const content = await readFile(filePath, 'utf8');
    
    // Fix problematic patterns that cause MDX compilation errors
    let fixedContent = content
      // Replace < and > with words when used in comparisons/ratings
      .replace(/<(\s*\d+)/g, 'Менее $1')
      .replace(/>(\s*\d+)/g, 'Более $1')
      
      // Fix numbers in headers followed by emoji or text
      .replace(/####\s+(\d+)️⃣\s+/g, '#### ')
      .replace(/####\s+([🎯📊🧠💡])\s+/g, '#### ')
      
      // Fix rating patterns with numbers and commas
      .replace(/(\d+),(\d+)-(\d+),(\d+)/g, '"$1.$2-$3.$4"')
      .replace(/(\d+),(\d+)/g, '"$1.$2"')
      
      // Fix factors with numbers in parentheses
      .replace(/\((\d+)-(\d+)\)/g, '(от $1 до $2)')
      
      // General fix for any remaining < > characters used for comparisons
      .replace(/(\s)<(\s)/g, '$1&lt;$2')
      .replace(/(\s)>(\s)/g, '$1&gt;$2');
    
    // If the content was modified, write the changes back to the file
    if (content !== fixedContent) {
      await writeFile(filePath, fixedContent, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Function to scan directories recursively
async function scanDirectory(dir) {
  let filesFixed = 0;
  
  async function scan(currentDir) {
    const entries = await readdir(currentDir);
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry);
      const entryStat = await stat(fullPath);
      
      if (entryStat.isDirectory()) {
        await scan(fullPath);
      } else if (entryStat.isFile() && 
                (entry.endsWith('.md') || entry.endsWith('.mdx'))) {
        const wasFixed = await fixFile(fullPath);
        if (wasFixed) {
          console.log(`Fixed issues in: ${fullPath}`);
          filesFixed++;
        }
      }
    }
  }
  
  await scan(dir);
  return filesFixed;
}

// Main function
async function main() {
  let totalFixed = 0;
  
  for (const dir of directories) {
    try {
      const dirPath = path.join(__dirname, dir);
      console.log(`Scanning directory: ${dirPath}`);
      const fixed = await scanDirectory(dirPath);
      totalFixed += fixed;
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  }
  
  console.log(`Completed. Fixed issues in ${totalFixed} files.`);
}

// Run the script
main().catch(error => {
  console.error('Script failed:', error);
}); 