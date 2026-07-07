const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

content = content.replace(
  '<img src="/file_000000005e50720b94b0455c9713cca4.webp" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover object-[center_right]" />',
  '<img src="/hero-bg.webp" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover object-[center_right]" />'
);

fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
