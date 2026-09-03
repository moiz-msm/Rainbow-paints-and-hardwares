async function scrapeBingImages(query) {
  try {
    const res = await fetch(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await res.text();
    // Look for murl in the JSON blobs
    const matches = html.match(/"murl":"(https:\/\/[^"]+\.(?:jpg|png|jpeg))"/gi);
    if (matches) {
       const urls = matches.map(m => m.match(/"murl":"([^"]+)"/)[1]);
       console.log(query, [...new Set(urls)].slice(0, 5));
    }
  } catch(e) {}
}
scrapeBingImages('Sheenlac Paints logo');
scrapeBingImages('Just spray paint logo');
scrapeBingImages('Ajax abrasives logo');
