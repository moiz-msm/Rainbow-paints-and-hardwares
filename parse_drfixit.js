import fs from 'fs';
const html = fs.readFileSync('drfixit_products.html', 'utf-8');
const blocks = html.split('product-card-block');

for (const block of blocks) {
  if (block.includes('productlist-title')) {
    const titleMatch = block.match(/<div class="productlist-title">([^<]+)<\/div>/);
    const imgMatch = block.match(/<img[^>]*src="([^"]*\.webp)"/);
    if (titleMatch && imgMatch) {
       console.log(titleMatch[1].trim(), '=>', imgMatch[1]);
    }
  }
}
