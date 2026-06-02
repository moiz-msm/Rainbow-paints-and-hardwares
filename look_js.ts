import axios from 'axios';

async function run() {
  const url = 'https://static.asianpaints.com/etc.clientlibs/apcolourcatalogue/components/content/shadelisting/clientlibs.5ec26f5a752c906d864f7c5cecb05940.js';
  const { data } = await axios.get(url);
  // print surrounding text of the json match
  const idx = data.indexOf('/apcolourcatalogue/shadelistingpalette.json');
  console.log(data.substring(idx - 200, idx + 200));
}
run();
