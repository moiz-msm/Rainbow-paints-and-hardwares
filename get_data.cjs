const fs = require('fs');
const html = fs.readFileSync('page.html', 'utf8');
const match = html.match(/data-attr-product-list="([^"]+)"/);
if (match) {
  const items = JSON.parse(match[1].replace(/&quot;/g, '"'));
  const newProducts = ["Duracast", "Createx", "Ezytex"];
  
  items.forEach(i => {
    if (i.productName && newProducts.some(n => i.productName.includes(n))) {
      console.log("-----");
      console.log(i.productName);
      console.log("Price:", i.livePrice);
      console.log("Desc:", i.shortDescription);
      console.log("Tags:", i.visibleTags);
    }
  });
}
