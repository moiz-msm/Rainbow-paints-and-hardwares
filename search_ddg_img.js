async function searchDDG(query) {
  try {
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    const html = await res.text();
    const imgMatches = html.match(/<img[^>]+src="([^">]+)"/g);
    console.log(query, imgMatches ? imgMatches.map(m => m.match(/src="([^">]+)"/)[1]).filter(u => u.includes('//duckduckgo.com/t/tqadb?')).map(u => decodeURIComponent(u.split('o=')[1].split('&')[0])).slice(0, 5) : 'No matches');
  } catch(e) {}
}
searchDDG('Ajax Emery Paper 100 grit');
