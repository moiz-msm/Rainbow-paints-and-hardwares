const fs = require('fs');
let content = fs.readFileSync('generate_seo.ts', 'utf-8');

const injection = `
  // Add hyperlocal location routes
  const neighborhoods = [
    'coimbatore',
    'rs-puram-coimbatore',
    'gandhipuram-coimbatore',
    'peelamedu-coimbatore',
    'saibaba-colony-coimbatore',
    'ramanathapuram-coimbatore',
    'saravanampatti-coimbatore',
    'thudiyalur-coimbatore',
    'vadavalli-coimbatore',
    'singanallur-coimbatore',
    'kovaipudur-coimbatore',
    'pollachi',
    'mettupalayam',
    'tiruppur'
  ];
  neighborhoods.forEach(hood => {
    urls.push(\`/store/\${hood}\`);
  });
`;

content = content.replace(
  '// Add location route\n  urls.push(\'/store/coimbatore\');',
  injection
);

// Fallback if the first replace doesn't match
if (!content.includes('neighborhoods')) {
  content = content.replace(
    '// Add shade routes',
    injection + '\n  // Add shade routes'
  );
}

fs.writeFileSync('generate_seo.ts', content);
