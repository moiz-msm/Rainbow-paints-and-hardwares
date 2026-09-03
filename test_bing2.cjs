async function run() {
  try {
    const res = await fetch("https://www.bing.com/images/search?q=dr+fixit+100+pidiproof+lw%2B+super+amazon", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    });
    const text = await res.text();
    const urls = [...text.matchAll(/murl&quot;:&quot;(https:\/\/[^&]+)&quot;/g)].map(m => m[1]);
    console.log(urls.slice(0, 10));
  } catch (e) { console.error(e); }
}
run();
