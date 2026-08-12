const fs = require('fs');
let html = fs.readFileSync('page.html', 'utf8');
html = html.replace(/&#34;/g, '"');
const regex = /"productName":"(Ultima Allura [^"]+)".*?"livePrice":"([^"]*)".*?(?:sizes|pack|weight).*?([0-9]+)/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(match[1], "Price:", match[2], "Size Match:", match[3]);
}
