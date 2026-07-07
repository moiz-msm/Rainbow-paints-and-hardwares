const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

content = content.replace('100+<br/>Products', '200+<br/>Products');
content = content.replace('4000+<br/>Color Shades', '5000+<br/>Shades');
content = content.replace('Doorstep<br/>Delivery', 'Pan India<br/>Delivery');

fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
