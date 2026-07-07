import fs from 'fs';
import esbuild from 'esbuild';

const GENERIC_PAINT_IMAGES = [
  "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1534062070383-09756b27e8a9?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=80&w=600"
];

async function fix() {
  await esbuild.build({
    entryPoints: ['src/data.ts'],
    bundle: true,
    format: 'cjs',
    outfile: 'data.cjs'
  });
  const data = (await import('./data.cjs')).default || await import('./data.cjs');
  let products = data.mockProducts || data.default?.mockProducts || [];
  
  let genericIndex = 0;
  
  for (const p of products) {
    if (p.image && p.image.includes('placehold.co')) {
       p.image = GENERIC_PAINT_IMAGES[genericIndex % GENERIC_PAINT_IMAGES.length];
       genericIndex++;
    }
    
    if (p.shades) {
       for (const s of p.shades) {
          if (s.image && s.image.includes('placehold.co')) {
             s.image = p.image; // Use parent image if child is broken
          }
       }
    }
  }

  const srcCode = fs.readFileSync('src/data.ts', 'utf-8');
  const splitIndex = srcCode.indexOf('export const mockProducts =');
  const originalTop = srcCode.substring(0, splitIndex);
  const updatedCode = originalTop + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';\n';
  fs.writeFileSync('src/data.ts', updatedCode);
  console.log("Fixed all remaining placeholders to generic paint images");
}
fix().catch(console.error);
