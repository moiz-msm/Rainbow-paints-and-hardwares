async function searchAmazon(query) {
  const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    const html = await res.text();
    const matches = html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/[a-zA-Z0-9_\-\.]+\.jpg/g);
    console.log(query, matches ? [...new Set(matches)].slice(0, 3) : "No matches");
  } catch(e) { console.error(e) }
}
searchAmazon('just spray paint logo');
searchAmazon('sheenlac paint logo');
