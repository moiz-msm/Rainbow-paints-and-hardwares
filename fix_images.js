import fs from 'fs';
let code = fs.readFileSync('src/data.ts', 'utf-8');
code = code.replace(/https:\/\/www\.bergerpaints\.com(\/s3fs-public\/[^"]+)/g, 'https://images.bergerpaints.com$1?format=webp&width=640&quality=75');
fs.writeFileSync('src/data.ts', code);
console.log("Updated images in src/data.ts");
