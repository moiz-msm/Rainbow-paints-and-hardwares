import fs from 'fs';
const code = fs.readFileSync('src/data.ts', 'utf-8');
const match = code.match(/export const mockProducts = (\[.*\]);/s);
if (match) {
  const products = JSON.parse(match[1]);
  products.filter(p => p.brand === 'Dr. Fixit').forEach(p => console.log(p.name, p.image));
}
