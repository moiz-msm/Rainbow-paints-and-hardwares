const fs = require('fs');
const html = fs.readFileSync('page.html', 'utf8');

// Find the data-attr-brands or data-attr-product-list
const match = html.match(/data-attr-product-list="([^"]+)"/);
if (match) {
    const jsonStr = match[1].replace(/&quot;/g, '"');
    const items = JSON.parse(jsonStr);
    
    items.forEach(item => {
        if (item.productName && item.productName.includes('Duracast')) {
            console.log("----");
            console.log("Name:", item.productName);
            console.log("Desc:", item.shortDescription);
            console.log("Tags:", item.visibleTags);
            console.log("Image:", item.productPackshotImage);
        }
    });
}
