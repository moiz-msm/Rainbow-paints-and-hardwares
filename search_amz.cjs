async function searchAmz(query) {
  const res = await fetch("https://www.amazon.in/s?k=" + encodeURIComponent(query), {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
  });
  const text = await res.text();
  const matches = [...text.matchAll(/<img[^>]+src="([^"]+m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"[^>]+alt="([^"]+)"/g)];
  console.log("--- Query:", query);
  matches.slice(0, 3).forEach(m => console.log(m[2], m[1]));
}
async function run() {
  await searchAmz("drywall sander with vacuum");
  await searchAmz("airless paint sprayer");
  await searchAmz("paint mixer machine");
  await searchAmz("high pressure washer");
}
run();
