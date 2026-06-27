const fs = require('fs');
let dataTs = fs.readFileSync('src/data.ts', 'utf-8');
dataTs = dataTs.replace(/image: "https:\/\/www\.drfixit\.co\.in\/content\/dam\/drfixit\/packshots\/([^.]+)\.png"/g, (match, p1) => {
  return `image: "https://placehold.co/400x400/003466/FDE047?text=Dr.+Fixit\\n${p1}"`;
});
fs.writeFileSync('src/data.ts', dataTs);
console.log('done');
