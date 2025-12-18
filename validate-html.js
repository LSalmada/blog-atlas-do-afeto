const { execSync } = require('child_process');

try {
  execSync('npx html-validate "public/**/*.html"', { stdio: 'inherit' });
  console.log('\n✅ All HTML files are valid!');
} catch (error) {
  console.error('\n❌ HTML validation failed!');
  process.exit(1);
}
