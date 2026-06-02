import puppeteer from 'puppeteer';
import fs from 'fs';

async function run() {
  console.log("Launching browser...");
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: "new"
    });
    const page = await browser.newPage();
    
    await page.goto('https://www.asianpaints.com/colour-catalogue.html', { waitUntil: 'networkidle0', timeout: 60000 });
    console.log("Page loaded. Looking for colours...");
    
    // intercept API
    const data = await page.evaluate(async () => {
       // try to fetch from any endpoint found
       return {
           keys: Object.keys(window).filter(k => typeof window[k] === 'object' && window[k] !== null),
           // Get script tags
           scripts: Array.from(document.querySelectorAll('script')).map(s => s.src).filter(Boolean)
       }
    });
    
    // We can also just click around and capture XHR.
    console.log(data.scripts.filter(s => s.includes('colourcatalogue')));
    
    await browser.close();
  } catch (e) {
    console.error(e);
  }
}
run();
