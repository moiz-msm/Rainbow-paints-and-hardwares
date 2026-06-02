import puppeteer from 'puppeteer';

async function run() {
  console.log("Launching browser...");
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: "new"
    });
    const page = await browser.newPage();
    
    // Enable request interception to save API responses
    await page.setRequestInterception(true);
    
    page.on('request', request => {
      request.continue();
    });

    page.on('response', async response => {
      const url = response.url();
      if ((url.includes('.json') || url.includes('/api/') || url.includes('admin-ajax')) && response.status() === 200) {
        try {
          console.log("Got response api format: ", url);
        } catch (e) { }
      }
    });

    await page.goto('https://www.mrfpaint.com/wall-paint-colors-catalog/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    console.log("Page loaded. Looking for colours...");
    
    const result = await page.evaluate(async () => {
       const shades = [];
       // check for generic elements containing colors
       const swatches = document.querySelectorAll('[style*="background-color"], .color-block, .color-swatch');
       swatches.forEach(el => {
           let hex = '';
           let text = el.textContent.trim();
           if (el.style && el.style.backgroundColor) {
              hex = el.style.backgroundColor;
           }
           let cl = el.className;
           shades.push({ hex, text, cl });
       });
       return {
           shadesCount: shades.length,
           shades: shades.slice(0, 50),
           scripts: Array.from(document.querySelectorAll('script')).map(s => s.src).filter(Boolean)
       };
    });
    
    console.log("Evaluated: ");
    console.log("Total shades found on load:", result.shadesCount);
    console.log(result.shades.slice(0, 10));
    console.log(result.scripts);
    
    await browser.close();
  } catch (e) {
    console.error(e);
  }
}
run();
