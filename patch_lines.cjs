const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

content = content.replace('5000+ Shades', '5000+<br/>Shades');
content = content.replace('Best Pricing', 'Best<br/>Pricing');

fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
