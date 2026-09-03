async function scrapeBingImages(query) {
  try {
    const res = await fetch(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await res.text();
    const urls = html.match(/https?:\/\/[^"']*\.(?:jpg|png|jpeg)/gi);
    const valid = urls ? urls.filter(u => u.includes('imimg') || u.includes('amazon') || u.includes('jdmagicbox') || u.includes('justdial')).filter(u => !u.includes('th?id=')) : [];
    console.log(query, [...new Set(valid)].slice(0, 3));
  } catch(e) {}
}
scrapeBingImages('Sheenlac Paints logo');
scrapeBingImages('Just spray paint india logo');
scrapeBingImages('Ajax abrasives india logo');
