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
    
    await page.goto('https://www.mrfpaint.com/wall-paint-colors-catalog/yellow-colour-wall-paint/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    const shades = await page.evaluate(() => {
        const out = [];
        const elements = document.querySelectorAll('.colordtls, .innercolorbpx');
        elements.forEach(el => {
            const outE = {};
            const code = el.querySelector('.cnames_details span'); // maybe?
            out.push(el.innerHTML);
        });
        return out;
    });
    
    console.log("Found shades count: ", shades.length);
    if (shades.length > 0) {
        console.log(shades.slice(0, 3));
    }
    
    // Also grab all elements with a style matching 'background-color' to see.
    const everything = await page.evaluate(() => {
        const out = [];
        const items = document.querySelectorAll('*');
        items.forEach(el => {
             if (el.style && el.style.backgroundColor && el.textContent) {
                 out.push({ bg: el.style.backgroundColor, text: el.textContent.trim().replace(/\n/g, ' ') });
             }
        });
        return out;
    });
    
    console.log("Elements with bg-color:");
    console.log(everything.slice(0, 10));
    
    await browser.close();
  } catch (e) {
    console.error(e);
  }
}
run();
