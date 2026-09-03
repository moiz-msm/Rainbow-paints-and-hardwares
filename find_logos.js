async function searchBing(query) {
  try {
    const res = await fetch(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    const html = await res.text();
    const urls = html.match(/https?:\/\/[^"']*\.(?:jpg|png|jpeg)/gi);
    console.log(query, [...new Set(urls)].slice(0, 5));
  } catch(e) {}
}
searchBing('Sheenlac Paints logo png');
searchBing('Just Spray Paint logo png');
