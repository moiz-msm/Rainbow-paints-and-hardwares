import fs from 'fs';
import esbuild from 'esbuild';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function fetchImimg(query) {
  try {
    const res = await fetch(`https://dir.indiamart.com/search.mp?ss=${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    let img = null;
    $('img').each((i, el) => {
       const src = $(el).attr('src');
       if (src && src.includes('5.imimg.com/data5/')) {
          img = src.replace('250x250', '500x500'); // attempt higher res if present
          return false;
       }
    });
    return img;
  } catch (e) {
    return null;
  }
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
    if (p.image && p.image.includes('placehold.co')) {
       const img = await fetchImimg(p.brand + ' ' + p.name);
       if (img) {
          p.image = img;
          matchCount++;
          console.log("Fixed", p.name, "=>", img);
       }
    }
    
    if (p.shades) {
       for (const s of p.shades) {
          if (s.image && s.image.includes('placehold.co')) {
             const img = await fetchImimg(p.brand + ' ' + p.name + ' ' + s.code);
             if (img) {
                s.image = img;
                console.log("Fixed shade", s.code, "=>", img);
             }
          }
       }
    }
  }

  const srcCode = fs.readFileSync('src/data.ts', 'utf-8');
  const splitIndex = srcCode.indexOf('export const mockProducts =');
  const originalTop = srcCode.substring(0, splitIndex);
  const updatedCode = originalTop + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';\n';
  fs.writeFileSync('src/data.ts', updatedCode);
  console.log("Fixed placeholders:", matchCount);
}
fix().catch(console.error);
