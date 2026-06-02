import puppeteer from 'puppeteer';
import * as fs from 'fs';

async function run() {
  const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: "new"
  });
  const page = await browser.newPage();
  
  await page.setRequestInterception(true);
  
  const intercepts = [];
  page.on('request', request => {
      // capture admin ajax requests
      if (request.url().includes('admin-ajax.php')) {
          intercepts.push({
             url: request.url(),
             postData: request.postData(),
             method: request.method()
          });
      }
      request.continue();
  });

  await page.goto('https://www.mrfpaint.com/wall-paint-colors-catalog/yellow-colour-wall-paint/', { waitUntil: 'networkidle2' });
  
  console.log("XHR requests:");
  console.log(intercepts);
  
  await browser.close();
}
run();
