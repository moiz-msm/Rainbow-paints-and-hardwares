import fs from 'fs';
let content = fs.readFileSync('src/data.ts', 'utf-8');

const newBrands = `export const brands = [
  "All Brands",
  "Asian Paints",
  "Berger Paints",
  "Dr. Fixit",
  "MRF Vapocure",
  "Sheenlac",
  "Fevicol",
  "Just Spray",
  "Birla White",
  "Ajax",
  "Bawa",
  "Jaya",
  "Gorila",
  "Local"
];`;

content = content.replace(/export const brands = \[([\s\S]*?)\];/, newBrands);
fs.writeFileSync('src/data.ts', content);
