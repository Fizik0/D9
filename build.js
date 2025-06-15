const { execSync } = require('child_process');

try {
  console.log('Building Docusaurus site...');
  const output = execSync('npm run build', { encoding: 'utf8' });
  console.log(output);
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build error:', error.message);
} 