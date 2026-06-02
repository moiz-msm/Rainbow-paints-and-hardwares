async function run() {
  const urls = [
      'https://www.asianpaints.com/content/asianpaints/en/colour-catalogue.model.json',
      'https://www.asianpaints.com/content/asianpaints/en/colour-catalogue/jcr:content.infinity.json'
  ];
  for (const url of urls) {
      try {
          const res = await fetch(url);
          console.log(url, res.status);
          const text = await res.text();
          console.log(url, text.substring(0, 200));
      } catch (e) {
          console.error(e);
      }
  }
}
run();
