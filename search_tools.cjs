async function searchAmz(query) {
  const res = await fetch("https://www.amazon.in/s?k=" + encodeURIComponent(query), {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
  });
  const text = await res.text();
  const matches = [...text.matchAll(/<img[^>]+src="([^"]+m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"[^>]+alt="([^"]+)"/g)];
  console.log("--- Query:", query);
  matches.slice(0, 5).forEach(m => console.log(m[2], m[1]));
}
async function run() {
  await searchAmz("asian paints trucare laser distance meter");
  await searchAmz("asian paints trucare moisture meter");
  await searchAmz("asian paints trucare wall sander");
}
run();
