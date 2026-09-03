const fs = require('fs');
async function run() {
  try {
    const res = await fetch("https://www.amazon.in/s?k=dr+fixit+100+pidiproof+lw%2B+super", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
    });
    const text = await res.text();
    // try to extract image URLs along with some nearby text to identify if it's 100 or 101
    const matches = [...text.matchAll(/<img[^>]+src="([^"]+m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"[^>]+alt="([^"]+)"/g)];
    for(const m of matches.slice(0, 10)) {
       console.log(m[2], m[1]);
    }
  } catch (e) { console.error(e); }
}
run();
