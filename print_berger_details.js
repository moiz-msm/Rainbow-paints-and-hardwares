import fs from 'fs';

const content = fs.readFileSync('src/data.ts', 'utf8');
const startIdx = content.indexOf('export const mockProducts = [');
if (startIdx !== -1) {
  const productsText = content.substring(startIdx);
  const regex = /\{[\s\S]*?\}/g;
  let match;
  const items = [];
  
  while ((match = regex.exec(productsText)) !== null) {
    const objStr = match[0];
    const idMatch = objStr.match(/"id":\s*(\d+)/);
    const nameMatch = objStr.match(/"name":\s*"([^"]+)"/);
    const brandMatch = objStr.match(/"brand":\s*"([^"]+)"/);
    
    if (idMatch && nameMatch && brandMatch && brandMatch[1] === 'Berger Paints') {
      items.push({
        id: parseInt(idMatch[1]),
        name: nameMatch[1],
        raw: objStr
      });
    }
  }

  console.log(`Found ${items.length} Berger products.`);
  items.forEach(item => {
    console.log(`\n========================================\nID: ${item.id} | Name: "${item.name}"\n========================================`);
    console.log(item.raw);
  });
}
