async function searchDDG(query) {
  const res = await fetch("https://html.duckduckgo.com/html/?q=" + encodeURIComponent(query));
  const text = await res.text();
  const urls = [...text.matchAll(/<img[^>]+src="(\/\/external-content\.duckduckgo\.com\/iu\/\?u=[^"]+)"/g)].map(m => decodeURIComponent(m[1].split('u=')[1].split('&')[0]));
  console.log("--- Query:", query);
  console.log(urls.slice(0, 5));
}
async function run() {
  await searchDDG("Asian Paints Trucare Moisture Meter");
  await searchDDG("Asian Paints Trucare Laser Distance Meter");
  await searchDDG("Berger Express Painting Sander Machine");
  await searchDDG("Berger Moisture Meter");
  await searchDDG("Berger Airless Paint Sprayer Machine");
  await searchDDG("Berger Putty Mixer Machine");
  await searchDDG("Berger High Pressure Washer Machine");
}
run();
