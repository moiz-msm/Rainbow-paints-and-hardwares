import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
async function test() {
   const res = await fetch(`https://html.duckduckgo.com/html/?q=site:amazon.in+Berger+Paints+Just+Spray`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const html = await res.text();
    console.log(html.substring(0, 500));
}
test();
