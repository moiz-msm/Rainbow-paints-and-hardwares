import puppeteer from 'puppeteer';
import * as fs from 'fs';

async function run() {
  const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: "new"
  });
  const page = await browser.newPage();
  
  await page.goto('https://www.asianpaints.com/colour-catalogue.html', { waitUntil: 'networkidle2' });
  
  const shades = await page.evaluate(() => {
      const data = (window as any).revised_cc_listing.allShadeCategory.all;
      return data;
  });
  
  console.log("Total shades extracted:", shades.length);
  fs.writeFileSync('asian-paints-scraped.json', JSON.stringify(shades, null, 2));
  
  await browser.close();
}
run();
