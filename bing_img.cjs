async function searchBing(query) {
  const res = await fetch("https://www.bing.com/images/search?q=" + encodeURIComponent(query), {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" }
  });
  const text = await res.text();
  const urls = [...text.matchAll(/murl&quot;:&quot;(https:\/\/[^&]+?)&quot;/g)].map(m => m[1]);
  console.log("--- Query:", query);
  console.log(urls.slice(0, 3));
}
async function run() {
  await searchBing("Asian Paints Trucare Moisture Meter packshot");
  await searchBing("Asian Paints Trucare Laser Distance Meter packshot");
  await searchBing("Berger Express Painting Sander Machine");
  await searchBing("Berger Moisture Meter");
  await searchBing("Berger Airless Paint Sprayer Machine");
  await searchBing("Berger Putty Mixer Machine");
  await searchBing("Berger High Pressure Washer Machine");
}
run();
