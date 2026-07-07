import fs from 'fs';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

async function fetchImage(query) {
  try {
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' paint')}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const firstImg = $('img.images_zci_img').first().attr('src');
    if (firstImg) {
      if (firstImg.startsWith('//')) {
         return 'https:' + firstImg;
      }
      return firstImg;
    }
  } catch (e) {
    return null;
  }
  return null;
}

async function run() {
  console.log(await fetchImage("Berger Paints Just Spray JS1"));
}
run();
