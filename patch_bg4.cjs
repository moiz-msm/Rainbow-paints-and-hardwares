const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

content = content.replace(
  '<img src="/hero-bg.webp" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover object-[center_right]" />',
  '<img src="/IMG_20260630_162408.png" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover object-[center_right]" />'
);

fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
