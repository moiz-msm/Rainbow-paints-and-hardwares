const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

content = content.replace('Premium Paint Store', 'EST.2001 • 20+ years of trust');

fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
console.log("Patched Hero.tsx");
