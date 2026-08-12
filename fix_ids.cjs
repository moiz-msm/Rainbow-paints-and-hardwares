const fs = require('fs');

const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

// The new ones are near the top, let's just replace the first occurrences
data = data.replace(
  /\{\s*"id": 1007,\s*"name": "TruCare Interior Wall Primer"/,
  '{\n    "id": 9007,\n    "name": "TruCare Interior Wall Primer"'
);

data = data.replace(
  /\{\s*"id": 1008,\s*"name": "TruCare Exterior Wall Primer"/,
  '{\n    "id": 9008,\n    "name": "TruCare Exterior Wall Primer"'
);

data = data.replace(
  /\{\s*"id": 1009,\s*"name": "Royale Play Stucco"/,
  '{\n    "id": 9009,\n    "name": "Royale Play Stucco"'
);

data = data.replace(
  /\{\s*"id": 3010,\s*"name": "Ajax Red Dry Emery Sandpaper"/,
  '{\n    "id": 9010,\n    "name": "Ajax Red Dry Emery Sandpaper"'
);


fs.writeFileSync(filePath, data);
console.log('Fixed IDs');
