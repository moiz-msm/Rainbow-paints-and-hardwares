const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

// There are two faqSchema definitions. I will remove the second one.
const firstFaqSchemaIndex = content.indexOf('const faqSchema = useMemo');
const secondFaqSchemaIndex = content.indexOf('const faqSchema = useMemo', firstFaqSchemaIndex + 1);

if (secondFaqSchemaIndex !== -1) {
  // Find the end of the second useMemo
  const nextConstIndex = content.indexOf('  return (', secondFaqSchemaIndex);
  content = content.substring(0, secondFaqSchemaIndex) + content.substring(nextConstIndex);
}

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Fixed duplicate faqSchema");
