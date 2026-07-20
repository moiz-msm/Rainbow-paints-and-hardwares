const fs = require('fs');

let content = fs.readFileSync('generate_seo.ts', 'utf-8');

const injection = `
  // Add location route
  urls.push('/store/coimbatore');
`;

content = content.replace('// Add product routes', injection + '\n  // Add product routes');
fs.writeFileSync('generate_seo.ts', content);

