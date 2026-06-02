import axios from 'axios';

async function run() {
  const url = 'https://www.asianpaints.com/apcolourcatalogue/shadelistingpalette.json?cfType=all&pageNumber=1&language=en';
  try {
      const { data } = await axios.get(url, {
          headers: {
             'User-Agent': 'Mozilla/5.0'
          }
      });
      console.log(JSON.stringify(data).substring(0, 500));
  } catch (e) {
      console.log(e.message);
  }
}
run();
