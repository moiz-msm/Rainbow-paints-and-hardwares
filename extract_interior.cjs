const fs = require('fs');
let html = fs.readFileSync('interior.html', 'utf8');
html = html.replace(/&#34;/g, '"');

let products = [];
const regex = /"productName":"([^"]+)".*?"livePrice":"([^"]*)".*?(?:pack|weight|size).*?([0-9]+)?/gi;
// Actually, data-attr-product-list is much better.

const match = html.match(/data-attr-product-list="([^"]+)"/);
if (match) {
  try {
    const items = JSON.parse(match[1]);
    items.forEach(i => {
      products.push({
        name: i.productName,
        price: i.livePrice,
        image: i.productPackshotImage,
        description: i.shortDescription,
        tags: i.visibleTags || [],
      });
    });
    console.log(JSON.stringify(products, null, 2));
  } catch (e) {
    console.log("Parse error");
  }
} else {
  // Try regex on the HTML directly to find all matches of productName and shortDescription
  console.log("No data-attr-product-list");
}
