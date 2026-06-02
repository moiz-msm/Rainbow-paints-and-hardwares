import puppeteer from 'puppeteer';
import * as fs from 'fs';

async function run() {
  const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: "new"
  });
  const page = await browser.newPage();
  
  await page.goto('https://www.asianpaints.com/colour-catalogue/red-wall-colours.html', { waitUntil: 'networkidle2' });
  
  const html = await page.evaluate(() => document.body.innerHTML);
  fs.writeFileSync('red.html', html);
  
  await browser.close();
}
run();
