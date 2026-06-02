import axios from 'axios';

async function run() {
  const url = 'https://www.asianpaints.com/apcolourcatalogue/shadelistingpalette.json';
  try {
      const { data } = await axios.get(url, {
          headers: {
             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
             'Referer': 'https://www.asianpaints.com/colour-catalogue.html',
             'Accept': 'application/json'
          }
      });
      console.log(Object.keys(data));
      console.log(JSON.stringify(data).substring(0, 500));
  } catch (e) {
      console.log(e.message);
  }
}
run();
