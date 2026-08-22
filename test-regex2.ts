let html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/mascot.webp" type="image/webp" />
    <title>Rainbow Paints & Hardwares | Best Paint Shop in Coimbatore</title>
    <meta
      name="description"
      content="Buy paint online from the top paint shop in Coimbatore. Rainbow Paints & Hardwares offers best pricing, doorstep delivery in Coimbatore, and 4000+ color shades."
    />
    <meta name="keywords" content="paint shop in coimbatore" />
  </head>
</html>`;

const title = "Easy Clean Silky Touch";
const desc = "Buy Easy Clean Silky Touch online.";

html = html.replace(/<title>.*?<\/title>/g, `<title>${title}</title>`);
html = html.replace(/<meta\s+name="description"\s+content="[^"]*"/g, `<meta name="description" content="${desc}"`);
console.log(html);
