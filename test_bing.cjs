async function searchBing(query) {
  const res = await fetch("https://www.bing.com/images/search?q=" + encodeURIComponent(query), {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
  });
  const text = await res.text();
  const urls = [...text.matchAll(/murl&quot;:&quot;(https:\/\/[^&]+)&quot;/g)].map(m => m[1]);
  console.log("--- Query:", query);
  console.log(urls.slice(0, 3));
}
async function run() {
  await searchBing("Asian Paints TruCare Moisture Meter");
  await searchBing("Asian Paints TruCare Laser Distance Meter");
}
run();
