import puppeteer from 'puppeteer';

async function run() {
  const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: "new"
  });
  const page = await browser.newPage();
  
  await page.goto('https://www.asianpaints.com/colour-catalogue.html', { waitUntil: 'networkidle2' });
  
  const vars = await page.evaluate(() => {
      return {
          lang: (window as any).languageCode,
          cfType: (window as any).revised_cc_listing?.cfType,
          ccListing: (window as any).revised_cc_listing
      };
  });
  console.log(vars);
  
  await browser.close();
}
run();
