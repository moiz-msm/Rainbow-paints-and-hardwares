import fs from 'fs';
import esbuild from 'esbuild';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function fetchBerger(query) {
    try {
        const res = await fetch(`https://www.bergerpaints.com/search/?q=${encodeURIComponent(query)}`);
        const html = await res.text();
        const $ = cheerio.load(html);
        const img = $('.product-box img').first().attr('src') || $('.search-product-image img').first().attr('src');
        if (img) return img.startsWith('http') ? img : 'https://www.bergerpaints.com' + img;
    } catch (e) {}
    return null;
}

async function fix() {
  await esbuild.build({
    entryPoints: ['src/data.ts'],
    bundle: true,
    format: 'cjs',
    outfile: 'data.cjs'
  });
  const data = (await import('./data.cjs')).default || await import('./data.cjs');
  let products = data.mockProducts || data.default?.mockProducts || [];
  
  let matchCount = 0;
  for (const p of products) {
    if (p.brand === 'Berger Paints' && p.image && p.image.includes('placehold.co')) {
       const img = await fetchBerger(p.name);
       if (img) {
          p.image = img;
          matchCount++;
          console.log("Fixed", p.name, "=>", img);
       }
    }
  }

  const srcCode = fs.readFileSync('src/data.ts', 'utf-8');
  const splitIndex = srcCode.indexOf('export const mockProducts =');
  const originalTop = srcCode.substring(0, splitIndex);
  const updatedCode = originalTop + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';\n';
  fs.writeFileSync('src/data.ts', updatedCode);
  console.log("Fixed Berger:", matchCount);
}
fix().catch(console.error);
