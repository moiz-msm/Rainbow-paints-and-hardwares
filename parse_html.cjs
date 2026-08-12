const fs = require('fs');
let html = fs.readFileSync('page.html', 'utf8');

// replace &#34; with "
html = html.replace(/&#34;/g, '"');

const names = ["Duracast Swirltex", "Duracast Crosstex", "Apex Duracast Dholpur", "Duracast Dholpur", "Duracast Finetex", "Duracast Pebbletex", "Duracast Roughtex", "Apex Createx Scratch Finish", "Apex Createx Roller Finish", "Apex Createx Dholpur", "Apex Ezytex"];
names.forEach(name => {
  const regex = new RegExp(`"productName":"${name}".*?"shortDescription":"([^"]+)"(?:.*?"visibleTags":\\[([^\\]]*)\\])?`, "i");
  const match = html.match(regex);
  if (match) {
    console.log("----");
    console.log("Name:", name);
    console.log("Desc:", match[1]);
    if (match[2]) console.log("Tags:", match[2]);
  } else {
    console.log("Not found:", name);
  }
});
