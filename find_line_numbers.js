import fs from 'fs';

const content = fs.readFileSync('src/data.ts', 'utf8');
const lines = content.split('\n');

const targetIds = [5065, 5071, 5072, 4023, 4042, 5062, 5080, 5081];

lines.forEach((line, index) => {
  const lineNum = index + 1;
  targetIds.forEach(id => {
    if (line.includes(`"id": ${id}`)) {
      console.log(`ID ${id} is at line ${lineNum}`);
    }
  });
});
