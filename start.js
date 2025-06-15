const { execSync } = require('child_process');

try {
  console.log('Starting Docusaurus development server...');
  execSync('npm run start', { stdio: 'inherit' });
} catch (error) {
  console.error('Error starting server:', error.message);
} 