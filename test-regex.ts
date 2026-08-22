import fs from 'fs';

let html = `<!doctype html><html lang="en">
<head>
  <title>Rainbow Paints & Hardwares | Best Paint Shop in Coimbatore</title>
  <meta name="description" content="Buy paint online from the top paint shop in Coimbatore. Rainbow Paints & Hardwares offers best pricing, doorstep delivery in Coimbatore, and 4000+ color shades." />
  <meta property="og:title" content="Rainbow Paints & Hardwares | Best Paint Shop in Coimbatore" />
  <meta property="og:description" content="Buy paint online from the top paint shop in Coimbatore." />
</head>
<body></body>
</html>`;

const title = "Easy Clean Silky Touch | Berger Paints | Buy Online at Best Price in Coimbatore";
const desc = "Buy Easy Clean Silky Touch online. Interior Wall from Berger Paints.";

html = html.replace(/<title>.*?<\/title>/g, `<title>${title}</title>`);
html = html.replace(/<meta\s+name="description"\s+content="[^"]*"/g, `<meta name="description" content="${desc}"`);
html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"/g, `<meta property="og:title" content="${title}"`);
html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"/g, `<meta property="og:description" content="${desc}"`);

console.log(html);
