import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function run() {
  const urls = fs.readFileSync('drfixit_urls_en.txt', 'utf-8').split('\n').filter(Boolean).map(s => s.trim());
  const productImages = [];
  
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const html = await res.text();
      const $ = cheerio.load(html);
      
      let title = $('h1.productlist-title').text().trim();
      if (!title) {
        title = $('title').text().replace('| Dr. Fixit', '').split('|')[0].trim();
      }
      
      let img = '';
      const imgTags = $('.product-slider img, .product-details-image img');
      imgTags.each((i, el) => {
         const src = $(el).attr('src');
         const dsrc = $(el).attr('data-src');
         if (dsrc && dsrc.startsWith('http')) img = dsrc;
         else if (src && src.startsWith('http')) img = src;
         if (img) return false;
      });
      
      if (!img) {
         $('img[alt*="Dr. Fixit"], img[alt*="Fixit"]').each((i, el) => {
             const src = $(el).attr('src');
             const dsrc = $(el).attr('data-src');
             if (dsrc && dsrc.startsWith('http')) img = dsrc;
             else if (src && src.startsWith('http') && !src.includes('logo')) img = src;
             if (img) return false;
         });
      }
      
      if (img && title) {
        productImages.push({ title, img, url });
      }
    } catch (e) {
      console.error("Failed on", url);
    }
  }
  
  fs.writeFileSync('drfixit_en_scraped.json', JSON.stringify(productImages, null, 2));
  console.log("Scraped", productImages.length, "English products");
}
run();
