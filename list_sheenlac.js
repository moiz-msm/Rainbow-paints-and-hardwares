import fs from 'fs';
import esbuild from 'esbuild';

async function listSheenlac() {
  await esbuild.build({
    entryPoints: ['src/data.ts'],
    bundle: true,
    format: 'cjs',
    outfile: 'data.cjs'
  });
  const data = (await import('./data.cjs')).default || await import('./data.cjs');
  let products = data.mockProducts || data.default?.mockProducts || [];
  
  const sheenlac = products.filter(p => p.brand === 'Sheenlac');
  console.log(`Found ${sheenlac.length} Sheenlac products:`);
  sheenlac.forEach(p => {
    console.log(`- ID: ${p.id} | Name: "${p.name}" | SubCategory: "${p.subCategory}" | Price: ${p.price} | Image: "${p.image}"`);
  });
}
listSheenlac().catch(console.error);
