const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

content = content.replace('200+<br/>Products', '200+ Products');
content = content.replace('5000+<br/>Shades', '5000+ Shades');
content = content.replace('Pan India<br/>Delivery', 'Pan India Delivery');
content = content.replace('Best<br/>Pricing', 'Best Pricing');

fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
