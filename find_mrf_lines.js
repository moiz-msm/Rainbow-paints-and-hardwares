import fs from 'fs';

const content = fs.readFileSync('src/data.ts', 'utf8');
const lines = content.split('\n');

lines.forEach((line, i) => {
  if (line.toLowerCase().includes('mrf') && (line.includes('id:') || line.includes('name:') || line.includes('brand:'))) {
    console.log(`Line ${i + 1}: ${line.trim()}`);
  }
});
