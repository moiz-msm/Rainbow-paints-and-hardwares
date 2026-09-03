async function searchDDG(query) {
  try {
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const html = await res.text();
    const vqdMatch = html.match(/vqd=['"]?([^'"]+)['"]/);
    if (!vqdMatch) return console.log(query, 'No vqd found');
    const vqd = vqdMatch[1];
    
    // Now hit the image endpoint (optional, or just regex the bing fallback).
    // Actually duckduckgo html has image thumbnails inline if you search images.
  } catch(e) {}
}

async function searchBing(query) {
    try {
        const res = await fetch(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}`, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const html = await res.text();
        const matches = html.match(/&quot;murl&quot;:&quot;(https:\/\/[^&]+)&quot;/gi);
        if (matches) {
            const urls = matches.map(m => m.match(/&quot;murl&quot;:&quot;(https:\/\/[^&]+)&quot;/)[1]);
            const filtered = urls.filter(u => !u.includes('placeholder') && !u.includes('bing.com'));
            console.log(query, [...new Set(filtered)].slice(0, 5));
        }
    } catch(e) {}
}
searchBing('Sheenlac Paints logo');
searchBing('Ajax Abrasives Company logo');
searchBing('Just spray paint logo');
