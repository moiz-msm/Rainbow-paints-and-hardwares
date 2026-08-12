const fs = require('fs');

let data = fs.readFileSync('src/data.ts', 'utf8');

data = data.replace(/  \}\s*\{\s*"id": 1150,/g, '  },\n  {\n    "id": 1150,');

fs.writeFileSync('src/data.ts', data);
