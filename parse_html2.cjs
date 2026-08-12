const fs = require('fs');
let html = fs.readFileSync('page.html', 'utf8');

html = html.replace(/&#34;/g, '"');
const regex = /"productName":"([^"]+)".*?"livePrice":"([^"]*)"/g;
let match;
while ((match = regex.exec(html)) !== null) {
  if (match[1].includes("Duracast") || match[1].includes("Createx") || match[1].includes("Ezytex")) {
    console.log(match[1], "Price:", match[2]);
  }
}
