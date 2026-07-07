import fs from 'fs';

const content = fs.readFileSync('src/data.ts', 'utf8');

// Use a simple parser or regex to find products
// We can parse mockProducts array using eval if we isolate it, but let's just use regex or a simple string scan.
const mockProductsStartIndex = content.indexOf('export const mockProducts = [');
if (mockProductsStartIndex !== -1) {
  // we can parse it using dynamic evaluation or standard JS parsing by finding the end of the array
  // simpler is to find items with "brand": "MRF Vapocure" and print their contents
  const productsSection = content.substring(mockProductsStartIndex);
  
  // Find all JSON objects in mockProducts
  const regex = /\{[\s\S]*?\}/g;
  let match;
  let count = 0;
  console.log('--- MRF Products in src/data.ts ---');
  while ((match = regex.exec(productsSection)) !== null) {
    const objStr = match[0];
    if (objStr.includes('"MRF Vapocure"') || objStr.includes('MRF Vapocure')) {
      count++;
      console.log(`Product ${count}:`);
      console.log(objStr);
      console.log('----------------------------');
    }
  }
} else {
  console.log('Could not find mockProducts array');
}
