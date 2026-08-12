const fs = require('fs');
let html = fs.readFileSync('page.html', 'utf8');

const regex = /"productName":"([^"]*Allura[^"]*)"/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(match[1]);
}
