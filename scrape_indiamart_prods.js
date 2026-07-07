import https from 'https';

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrapeProductPage(url, name) {
  console.log(`Scraping ${name} from ${url}...`);
  try {
    const html = await fetchHtml(url);
    // Search for any 5.imimg.com/data5/... or similar image URLs
    const regex = /https?:\/\/[^\s"'()<>]*imimg\.com\/data[^\s"'()<>]*(?:jpeg|jpg|png|webp)/gi;
    const matches = html.match(regex) || [];
    const unique = [...new Set(matches)];
    console.log(`Images for ${name}:`);
    unique.slice(0, 5).forEach(img => {
      console.log(`  - ${img.replace('250x250', '500x500')}`);
    });
  } catch (e) {
    console.error(`Error scraping ${name}:`, e.message);
  }
}

async function run() {
  await scrapeProductPage('https://www.indiamart.com/proddetail/sheenlac-sp-58-nc-thinner-20005094733.html', 'SP-58');
  await scrapeProductPage('https://www.indiamart.com/proddetail/sheenlac-d-13x-nc-thinner-20005297730.html', 'D-13X');
}

run();
