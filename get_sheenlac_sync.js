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
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(fetchHtml(res.headers.location));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function searchProduct(name) {
  const query = encodeURIComponent(name);
  const url = `https://dir.indiamart.com/search.mp?ss=${query}`;
  try {
    const html = await fetchHtml(url);
    const regex = /https?:\/\/[^\s"'()<>]*imimg\.com\/data[^\s"'()<>]*(?:jpeg|jpg|png|webp)/gi;
    const matches = html.match(regex) || [];
    const unique = [...new Set(matches)];
    
    // Filter matches that are highly relevant
    const keywords = name.toLowerCase().replace(/sheenlac|nc|thinner/g, '').split(/\s+/).filter(k => k.length > 1);
    
    let candidates = unique.filter(img => {
      const imgLower = img.toLowerCase();
      if (!imgLower.includes('sheenlac')) return false;
      return keywords.some(k => imgLower.includes(k));
    });
    
    if (candidates.length === 0) {
      candidates = unique.filter(img => img.toLowerCase().includes('sheenlac'));
    }
    if (candidates.length === 0) {
      candidates = unique.slice(0, 5);
    }
    
    console.log(`\nResults for ${name}:`);
    candidates.slice(0, 3).forEach((img, i) => {
      const size500 = img.replace('250x250', '500x500');
      console.log(`  [${i+1}] ${size500}`);
    });
  } catch (e) {
    console.error(`Error searching ${name}:`, e.message);
  }
}

async function run() {
  const products = [
    'Sheenlac brand logo',
    'Sheenlac NC Thinner D13',
    'Sheenlac NC Thinner SP58',
    'Sheenlac NC Sanding Sealer',
    'Sheenlac Wood Stainer',
    'Sheenlac Wood Polish'
  ];
  for (const p of products) {
    await searchProduct(p);
  }
}

run();
