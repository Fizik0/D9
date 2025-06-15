const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Define the directories to scan
const directories = [
  'docs/d-blocks',
  'docs/level-1',
  'docs',
  'blog'
];

// Function to fix a specific file
async function fixFile(filePath) {
  try {
    let content = await readFile(filePath, 'utf8');
    
    // Fix specific patterns that cause MDX syntax issues
    let fixedContent = content
      // Replace percentage signs
      .replace(/(\d+)%/g, '"$1%"')
      .replace(/(\d+)-(\d+)%/g, '"$1-$2%"')
      
      // Replace angle brackets with proper words and add quotes to numbers
      .replace(/< ?(\d+[.,]?\d*)/g, 'Менее "$1"')
      .replace(/> ?(\d+[.,]?\d*)/g, 'Более "$1"')
      
      // Add quotes around numeric ranges
      .replace(/(\d+[.,]?\d*)-(\d+[.,]?\d*)/g, '"$1-$2"')
      
      // Add quotes around decimal numbers
      .replace(/(\d+[.,]\d+)([^"%]|$)/g, '"$1"$2')
      
      // Fix emoji headers
      .replace(/#### ([🎯📊🧠💡🔧🚀⚙️📈])/g, '#### ')
      
      // Fix number+emoji headers
      .replace(/#### (\d+)️⃣/g, '#### ')
      
      // Fix common JSX-like patterns that might cause issues
      .replace(/(\d+)x(\d+)/g, '"$1x$2"')
      
      // Escape angle brackets in non-HTML contexts
      .replace(/([^ ])(<)([^ ])/g, '$1{"<"}$3')
      .replace(/([^ ])(>)([^ ])/g, '$1{">"}$3')
      
      // Ensure closing brackets are properly formatted
      .replace(/\((\d+[.,]?\d*)\)/g, '("$1")')
      
      // Replace all other problematic chars in headers
      .replace(/####(.+?):/g, (match) => {
        return match.replace(/[0-9]/g, '');
      })
      
      // Escape special characters in math expressions
      .replace(/(\d+)\^(\d+)/g, '"$1^$2"')
      
      // Fix URLs and links
      .replace(/(https?:\/\/[^\s]+)/g, (match) => {
        // Don't modify URLs in markdown links
        if (match.includes('](')) return match;
        return `"${match}"`;
      });
    
    if (content !== fixedContent) {
      await writeFile(filePath, fixedContent, 'utf8');
      console.log(`Fixed: ${filePath}`);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Function to recursively scan directories
async function scanDirectories(dirPath) {
  let fixCount = 0;
  
  async function processDir(currentPath) {
    const entries = await readdir(currentPath);
    
    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry);
      const stats = await stat(entryPath);
      
      if (stats.isDirectory()) {
        // Skip node_modules and other irrelevant directories
        if (entry !== 'node_modules' && !entry.startsWith('.')) {
          fixCount += await processDir(entryPath);
        }
      } else if (stats.isFile() && (entry.endsWith('.md') || entry.endsWith('.mdx'))) {
        const wasFixed = await fixFile(entryPath);
        if (wasFixed) fixCount++;
      }
    }
    
    return fixCount;
  }
  
  return processDir(dirPath);
}

async function main() {
  let totalFixed = 0;
  
  for (const dir of directories) {
    const dirPath = path.join(__dirname, dir);
    console.log(`Scanning directory: ${dirPath}`);
    
    try {
      const fixedFiles = await scanDirectories(dirPath);
      totalFixed += fixedFiles;
      console.log(`Fixed ${fixedFiles} files in ${dir}`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log(`Directory ${dir} does not exist, skipping`);
      } else {
        console.error(`Error processing directory ${dir}:`, err);
      }
    }
  }
  
  console.log(`Total files fixed: ${totalFixed}`);
}

main().catch(err => {
  console.error('Error running script:', err);
}); 