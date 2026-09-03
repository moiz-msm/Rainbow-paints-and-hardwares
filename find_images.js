async function findBingImage(query) {
  try {
    const res = await fetch(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const html = await res.text();
    const urls = html.match(/https?:\/\/[^"']*\.(?:jpg|png|jpeg)/gi);
    const validUrls = urls ? urls.filter(u => u.includes('amazon') || u.includes('imimg')).filter(u => !u.includes('th?id=')) : [];
    console.log("Query:", query);
    console.log("Matches:", [...new Set(validUrls)].slice(0, 3));
  } catch (e) {
    console.error(e);
  }
}
async function run() {
  await findBingImage('Fevicol Hi Per adhesive amazon');
  await findBingImage('Fevicol Probond amazon');
  await findBingImage('Fevicol Speedx amazon');
}
run();
