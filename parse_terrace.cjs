const fs = require('fs');
let html = fs.readFileSync('terrace.html', 'utf8');
html = html.replace(/&#34;/g, '"');

let productsMap = new Map();
const regex = /"productName":"([^"]+)","productCode":"[^"]+","productTitle":"([^"]*)","shortDescription":"([^"]*)",(?:.*?)"productPackshotImage":"([^"]+)".*?"livePrice":"([^"]*)"(?:.*?"visibleTags":\[([^\]]*)\])?.*?\}?/g;

let match;
while ((match = regex.exec(html)) !== null) {
  let tags = [];
  if (match[6]) {
     tags = match[6].split(',').map(s => s.replace(/"/g, '').trim()).filter(Boolean);
  }
  
  let desc = match[3].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  let name = match[1].replace(/&amp;/g, '&').trim();
  name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  // Specific casing fixes
  name = name.replace("Smartcare", "SmartCare");
  
  if (productsMap.has(name)) continue;

  productsMap.set(name, {
    name: name,
    description: desc,
    price: match[5],
    tags: tags.slice(0, 3),
    image: match[4]
  });
}

console.log(JSON.stringify(Array.from(productsMap.values()), null, 2));
