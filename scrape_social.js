async function searchDDG(query) {
  try {
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const html = await res.text();
    // Look for facebook or twitter profiles
    console.log(query, "Links:", html.match(/https?:\/\/[a-zA-Z0-9.\-]+\/[^"]+/g).filter(u => u.includes('facebook') || u.includes('linkedin') || u.includes('instagram')).slice(0, 5));
  } catch(e) {}
}
searchDDG('site:facebook.com Sheenlac Paints');
searchDDG('site:facebook.com Ajax Abrasives');
searchDDG('site:facebook.com Just Spray Paint');
