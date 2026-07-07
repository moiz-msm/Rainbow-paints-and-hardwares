import fs from 'fs';
import esbuild from 'esbuild';

const scraped = JSON.parse(fs.readFileSync('drfixit_en_scraped.json', 'utf-8'));

function normalize(s) {
  return s.toLowerCase().replace(/dr\.?\s*fixit/g, '').replace(/[^a-z0-9]/g, '');
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
  
  products.forEach(p => {
    if (p.brand === 'Dr. Fixit') {
      const pNorm = normalize(p.name).replace(/^[0-9w]+/g, '');
      
      let bestMatch = null;
      let maxLen = 0;
      
      for (const s of scraped) {
         const sNorm = normalize(s.title);
         if (sNorm.includes(pNorm) || pNorm.includes(sNorm)) {
            if (pNorm.length > maxLen || sNorm.length > maxLen) {
                bestMatch = s.img;
                maxLen = Math.max(pNorm.length, sNorm.length);
            }
         }
      }
      
      if (bestMatch) {
         p.image = bestMatch;
         matchCount++;
         console.log("Matched", p.name, "=>", bestMatch);
      } else {
         // Some specific manual matches for common ones
         if (p.name.includes("PIDIPROOF LW+ SUPER")) {
            p.image = "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/16191738726082a1f0a2d3c.webp"; 
            console.log("Manual match", p.name);
         } else if (p.name.includes("PIDIPROOF LW+")) {
            p.image = "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/hdpi/16191739476082a23b4efc6.webp";
            console.log("Manual match", p.name);
         } else if (p.name.includes("URP")) {
            p.image = "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/hdpi/16191739266082a22686c0b.webp";
            console.log("Manual match", p.name);
         } else if (p.name.includes("ALL SEAL")) {
            p.image = "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/167601991363e608c99558b.webp";
            console.log("Manual match", p.name);
         }
      }
    }
  });

  const srcCode = fs.readFileSync('src/data.ts', 'utf-8');
  const splitIndex = srcCode.indexOf('export const mockProducts =');
  const originalTop = srcCode.substring(0, splitIndex);
  const updatedCode = originalTop + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';\n';
  fs.writeFileSync('src/data.ts', updatedCode);
  console.log("Fixed Dr. Fixit images automatically:", matchCount);
}
fix().catch(console.error);
