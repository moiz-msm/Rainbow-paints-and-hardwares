import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function run() {
  const res = await fetch('https://www.drfixit.co.in/products');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  $('.product-card-block').each((i, el) => {
    const title = $(el).find('.productlist-title').text().trim();
    let img = $(el).find('img').first().attr('src');
    if (!img) {
      img = $(el).find('img').attr('data-src');
    }
    console.log(title, img);
  });
}
run();
