const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');
const names = ["Duracast Swirl Tex", "Duracast Cross Tex", "Duracast Dholpur Tex", "Duracast Fine Tex", "Duracast Pebble Tex", "Duracast Rough Tex", "Createx Scratch Finish", "Createx Roller Finish", "Createx Dholpur", "Apex Ezytex"];
names.forEach(name => {
  const regex = new RegExp(`"name":\\s*"([^"]*${name}[^"]*)"[\\s\\S]*?"sizes":\\s*\\[([^\\]]+)\\]`, "i");
  const match = data.match(regex);
  if (match) {
    console.log(match[1], "sizes:", match[2]);
  }
});
