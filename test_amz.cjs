const fs = require('fs');
async function run() {
  try {
    const res = await fetch("https://www.amazon.in/s?k=dr+fixit+100+pidiproof", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
    });
    const text = await res.text();
    const urls = [...text.matchAll(/src="([^"]+m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"/g)].map(m => m[1]);
    console.log(urls.slice(0, 5));
  } catch (e) { console.error(e); }
}
run();
