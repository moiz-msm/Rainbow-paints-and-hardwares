import puppeteer from 'puppeteer';

async function run() {
  console.log("Launching browser...");
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: "new"
    });
    const page = await browser.newPage();
    
    await page.goto('https://www.asianpaints.com/colour-catalogue.html', { waitUntil: 'networkidle2', timeout: 60000 });
    console.log("Page loaded. Looking for colours...");
    
    // asian paints stores shades in window.colorFinderShadeFamilyToggle maybe? 
    // let's just scrape the HTML DOM for links to colours and grab their data.
    const colors = await page.evaluate(() => {
        const out = [];
        const items = document.querySelectorAll('li[data-color]'); // or similar
        items.forEach(el => out.push(el.getAttribute('data-color')));
        return document.body.innerHTML.match(/data-shade-family-color="([^"]+)"/g) || 
               document.body.innerHTML.match(/"hexCode":"([^"]+)"/g) || [];
    });
    console.log("Found matches:", colors.slice(0, 10), colors.length);
    
    // Maybe we look at XHR requests after clicking a color family?
    
    await browser.close();
  } catch (e) {
    console.error(e);
  }
}
run();
