import axios from 'axios';

async function run() {
  const url = 'https://www.asianpaints.com/apcolourcatalogue/shadelistingpalette.json';
  try {
      const { data } = await axios.get(url);
      console.log(Object.keys(data));
      if (data.data) {
          console.log(data.data.length);
      }
      console.log(JSON.stringify(data).substring(0, 500));
  } catch (e) {
      console.log(e.message);
  }
}
run();
