async function searchDDG(query) {
  try {
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const html = await res.text();
    // find img src
    const imgMatches = html.match(/<img[^>]+src="([^">]+)"/g);
    console.log(query, imgMatches ? imgMatches.map(m => m.match(/src="([^">]+)"/)[1]).slice(0, 10) : 'No matches');
  } catch(e) {}
}
searchDDG('Ajax Abrasives logo png');
searchDDG('Sheenlac Paints logo png');
searchDDG('Just spray paint logo png');
