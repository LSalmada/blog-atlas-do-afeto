const { execSync } = require('child_process');
const { glob } = require('glob');
const fs = require('fs');

const htmlFiles = glob.sync('public/**/*.html');

if (htmlFiles.length === 0) {
  console.error('No HTML files found in public/');
  process.exit(1);
}

console.log(`Found ${htmlFiles.length} HTML files to validate:\n`);
htmlFiles.forEach(file => console.log(`  - ${file}`));
console.log('');

const config = {
  "$schema": "./node_modules/html-w3c-validator/schema/schema.json",
  "files": htmlFiles,
  "severities": [
    "info",
    "warning",
    "error"
  ]
};

const configPath = '.html-w3c-validatorrc.json';
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

try {
  execSync('html-w3c-validator', { stdio: 'inherit' });
  console.log('\n✅ All HTML files are valid!');
} catch (error) {
  console.error('\n❌ HTML validation failed!');
  process.exit(1);
}
