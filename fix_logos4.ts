import fs from 'fs';
let content = fs.readFileSync('src/data.ts', 'utf-8');
content = content.replace('logo: "https://m.media-amazon.com/images/I/71zeNIWEADL._SL1500_.jpg",', 'logo: "https://justspray.in/wp-content/uploads/2024/10/JustSpray-logo-a-1024x518.png",');
content = content.replace('logo: "https://m.media-amazon.com/images/I/61qPTRPc19L.jpg",', 'logo: "https://sheenlac.com/assets/images/sheenlac_logo.png",');
fs.writeFileSync('src/data.ts', content);
