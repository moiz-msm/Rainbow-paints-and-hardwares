import fs from 'fs';
let content = fs.readFileSync('src/components/Hero.tsx', 'utf-8');
content = content.replace(
  /const heroBrands = \[\s*"Asian Paints",\s*"Berger Paints",\s*"Birla White",\s*"MRF Vapocure",\s*"Dr\. Fixit",\s*"Just Spray"\s*\]\.map\(name => brandDetails\.find\(b => b\.name === name\)\)\.filter\(Boolean\);/,
  'const heroBrands = [\n    "Asian Paints",\n    "Berger Paints",\n    "Dr. Fixit",\n    "MRF Vapocure",\n    "Sheenlac",\n    "Fevicol",\n    "Just Spray",\n    "Birla White"\n  ].map(name => brandDetails.find(b => b.name === name)).filter(Boolean);'
);
fs.writeFileSync('src/components/Hero.tsx', content);
