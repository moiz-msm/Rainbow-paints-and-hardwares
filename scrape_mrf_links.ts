import puppeteer from 'puppeteer';
import * as fs from 'fs';

async function run() {
  console.log("Launching browser...");
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: "new"
    });
    const page = await browser.newPage();
    
    await page.goto('https://www.mrfpaint.com/wall-paint-colors-catalog/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // get links for all color families
    const links = await page.evaluate(() => {
        const anchors = document.querySelectorAll('a');
        return Array.from(anchors).map(a => a.href).filter(href => href.includes('/wall-paint-colors-catalog/') && href !== 'https://www.mrfpaint.com/wall-paint-colors-catalog/');
    });
    
    console.log("Links found:");
    console.log(Array.from(new Set(links)));
    
    await browser.close();
  } catch (e) {
    console.error(e);
  }
}
run();
