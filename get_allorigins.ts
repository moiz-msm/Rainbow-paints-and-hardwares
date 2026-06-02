import axios from 'axios';

async function run() {
  const url = encodeURIComponent('https://www.asianpaints.com/apcolourcatalogue/shadelistingpalette.json?cfType=all&pageNumber=1&language=en');
  try {
      const { data } = await axios.get(`https://api.allorigins.win/get?url=${url}`);
      let parsed = JSON.parse(data.contents);
      console.log(Object.keys(parsed));
      console.log(JSON.stringify(parsed).substring(0, 200));
  } catch (e) {
      console.log(e.message);
  }
}
run();
