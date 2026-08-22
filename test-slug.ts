import { mockProducts } from './src/data.js';
const slug = 'easy-clean-silky-touch';
const product = mockProducts.find(p => ((p as any).slug || p.name.replace(/\s+/g, '-').toLowerCase()) === slug);
console.log(product ? product.name : 'Not found');
