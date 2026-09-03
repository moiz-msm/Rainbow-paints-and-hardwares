async function searchAmazon(query) {
  const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br'
      }
    });
    const html = await res.text();
    const matches = html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/[a-zA-Z0-9_\-\.]+\.jpg/g);
    console.log(query, matches ? [...new Set(matches)].slice(0, 3) : "No matches");
  } catch(e) { console.error(e) }
}
async function run() {
  await searchAmazon('fevicol hi per');
  await searchAmazon('fevicol probond');
  await searchAmazon('fevicol speedx');
}
run();
