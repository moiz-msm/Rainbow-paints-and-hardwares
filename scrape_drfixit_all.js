import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function run() {
  const urls = fs.readFileSync('drfixit_urls.txt', 'utf-8').split('\n').filter(Boolean).map(s => s.trim());
  const productImages = [];
  
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const html = await res.text();
      const $ = cheerio.load(html);
      
      const title = $('h1.productlist-title').text().trim() || $('title').text().replace('| Dr. Fixit', '').trim();
      let img = $('.product-slider img').first().attr('src') || $('.product-details-image img').first().attr('src');
      
      if (!img) {
         img = $('img[alt*="Dr. Fixit"]').first().attr('src');
      }
      if (img && title) {
        productImages.push({ title, img });
      }
    } catch (e) {
      console.error("Failed on", url);
    }
  }
  
  fs.writeFileSync('drfixit_scraped.json', JSON.stringify(productImages, null, 2));
  console.log("Scraped", productImages.length, "products");
}
run();
