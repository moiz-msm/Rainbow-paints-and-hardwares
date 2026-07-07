import https from 'https';
import urlModule from 'url';

function fetchHtml(targetUrl, redirectCount = 0) {
  if (redirectCount > 3) {
    return Promise.reject(new Error('Too many redirects'));
  }
  return new Promise((resolve, reject) => {
    const parsedUrl = urlModule.parse(targetUrl);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 4000 // 4 seconds timeout
    };

    const req = https.request(options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = `${parsedUrl.protocol}//${parsedUrl.host}${redirectUrl}`;
        }
        req.destroy();
        resolve(fetchHtml(redirectUrl, redirectCount + 1));
        return;
      }

      if (res.statusCode !== 200) {
        req.destroy();
        reject(new Error(`HTTP status ${res.statusCode}`));
        return;
      }

      let data = '';
      res.setEncoding('utf-8');
      res.on('data', chunk => {
        data += chunk;
        if (data.length > 500000) { // Limit data size to 500KB
          req.destroy();
          resolve(data);
        }
      });
      res.on('end', () => resolve(data));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

async function searchProduct(name) {
  const query = encodeURIComponent(name);
  const url = `https://dir.indiamart.com/search.mp?ss=${query}`;
  console.log(`\nSearching for: "${name}"...`);
  try {
    const html = await fetchHtml(url);
    const regex = /https?:\/\/[^\s"'()<>]*imimg\.com\/data[^\s"'()<>]*(?:jpeg|jpg|png|webp)/gi;
    const matches = html.match(regex) || [];
    const unique = [...new Set(matches)];
    
    // Filter matches
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
    
    console.log(`Results for ${name}:`);
    candidates.slice(0, 4).forEach((img, i) => {
      const size500 = img.replace('250x250', '500x500');
      console.log(`  [${i+1}] ${size500}`);
    });
  } catch (e) {
    console.error(`Error searching ${name}:`, e.message);
  }
}

async function run() {
  const products = [
    'Sheenlac logo',
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
