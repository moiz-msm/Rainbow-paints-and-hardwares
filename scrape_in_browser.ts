import puppeteer from 'puppeteer';

async function run() {
  const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: "new"
  });
  const page = await browser.newPage();
  
  await page.goto('https://www.asianpaints.com/colour-catalogue.html', { waitUntil: 'networkidle0' });
  
  const shadesData = await page.evaluate(async () => {
       try {
           const res = await fetch("https://www.asianpaints.com/apcolourcatalogue/shadelistingpalette.json?cfType=red&pageNumber=1&language=en");
           return await res.json();
       } catch (e) {
           return "Error: " + e.message;
       }
  });
  console.log("Fetch 1:", JSON.stringify(shadesData).substring(0, 200));
  
  const shadesData2 = await page.evaluate(async () => {
       try {
           const res = await fetch("/apcolourcatalogue/shadelistingpalette.json?cfType=all&pageNumber=1&language=en");
           return await res.json();
       } catch (e) {
           return "Error: " + e.message;
       }
  });
  console.log("Fetch 2:", JSON.stringify(shadesData2).substring(0, 200));

  await browser.close();
}
run();
