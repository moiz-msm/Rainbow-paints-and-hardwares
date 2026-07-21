const fs = require('fs');
let content = fs.readFileSync('src/components/LuxuryBackground.tsx', 'utf-8');
content = content.replace('mix-blend-multiply', '');
fs.writeFileSync('src/components/LuxuryBackground.tsx', content);
