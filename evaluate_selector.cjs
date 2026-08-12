const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  const selector = 'div#root > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)';
  
  const elementHtml = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? el.outerHTML : 'Element not found';
  }, selector);

  console.log("Found Element:");
  console.log(elementHtml.substring(0, 1000));
  
  await browser.close();
})();
