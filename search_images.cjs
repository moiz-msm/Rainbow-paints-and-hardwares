async function search(query) {
  const res = await fetch("https://www.google.com/search?q=" + encodeURIComponent(query) + "&tbm=isch", {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" }
  });
  const text = await res.text();
  const urls = [...text.matchAll(/https:\/\/[^"]*\.(?:jpg|png|webp)/g)].map(m => m[0]);
  console.log("--- Query:", query);
  // filter out common google tracking/icon domains
  const filtered = urls.filter(u => !u.includes('gstatic.com') && !u.includes('google.com') && !u.includes('logo')).slice(0, 5);
  console.log(filtered);
}
async function run() {
  await search("site:indiamart.com asian paints trucare moisture meter");
  await search("site:indiamart.com asian paints trucare laser distance meter");
  await search("site:indiamart.com berger express painting wall sander");
  await search("site:indiamart.com berger moisture meter");
  await search("site:indiamart.com berger airless paint sprayer");
  await search("site:indiamart.com berger putty mixer machine");
  await search("site:indiamart.com berger high pressure washer");
}
run();
