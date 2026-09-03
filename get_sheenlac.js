async function searchDDG(query) {
  try {
    const res = await fetch(`https://www.amazon.in/s?k=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const html = await res.text();
    const matches = html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/[a-zA-Z0-9_\-\.]+\.jpg/g);
    console.log(query, matches ? [...new Set(matches)].slice(0, 5) : "No matches");
  } catch(e) {}
}
searchDDG('sheenlac paint');
