import fs from 'fs';
import esbuild from 'esbuild';

async function list() {
  await esbuild.build({
    entryPoints: ['src/data.ts'],
    bundle: true,
    format: 'cjs',
    outfile: 'data.cjs'
  });
  const data = (await import('./data.cjs')).default || await import('./data.cjs');
  let products = data.mockProducts || data.default?.mockProducts || [];
  
  const drFixit = products.filter(p => p.brand === 'Dr. Fixit');
  drFixit.forEach(p => console.log(p.name));
}
list().catch(console.error);
