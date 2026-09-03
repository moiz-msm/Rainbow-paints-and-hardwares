async function searchDDG(query) {
  try {
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`);
    const html = await res.text();
    const links = html.match(/href="([^"]+)"/g).map(l => l.match(/href="([^"]+)"/)[1]).filter(l => !l.includes('duckduckgo.com'));
    console.log(query, links.slice(0, 5));
  } catch(e) {}
}
searchDDG('Ajax abrasives official site');
searchDDG('Just spray paint india official site');
