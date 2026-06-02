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
    const apiResponses: any = {};
    
    page.on('request', request => {
      request.continue();
    });

    page.on('response', async response => {
      const url = response.url();
      if ((url.includes('.json') || url.includes('/api/') || url.includes('/graphql') || url.includes('colourcatalogue')) && response.status() === 200) {
        try {
          // console.log("Got response format: ", url);
          // if (url.includes('catalogue')) {
          //   const text = await response.text();
          //   console.log("  => size:", text.length, text.substring(0, 100));
          // }
        } catch (e) { }
      }
    });

    await page.goto('https://www.asianpaints.com/colour-catalogue.html', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    console.log("Looking at window variables inside the page...");
    
    const result = await page.evaluate(async () => {
       // Look for anything in window that contains color info
       for (const key of Object.keys(window)) {
           if (typeof window[key as any] === 'object' && window[key as any] !== null) {
               try {
                   const s = JSON.stringify(window[key as any]);
                   if (s.includes('hexCode') || s.includes('shadeName')) {
                       return { key, length: s.length, data: s.substring(0, 500) };
                   }
               } catch(err) {}
           }
       }
       
       // Alternatively, let's fetch the html and find inline json
       const scripts = document.querySelectorAll('script');
       for (const s of Array.from(scripts)) {
           if (s.innerHTML.includes('shade') && s.innerHTML.includes('hex')) {
               return { js: s.innerHTML.substring(0, 500) };
           }
       }
       return null;
    });
    
    console.log("Evaluated: ", result);
    await browser.close();
  } catch (e) {
    console.error(e);
  }
}
run();
