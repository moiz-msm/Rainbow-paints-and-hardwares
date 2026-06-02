import fs from 'fs';

async function search() {
  const q = 'asian paints shades json';
  const url = `https://api.github.com/search/code?q=${encodeURIComponent(q)}`;
  
  const headers = { 
    'User-Agent': 'NodeJS/18.0' 
  };
  
  try {
    const res = await fetch(url, { headers });
    const data = await res.json();
    console.log(`Found ${data.total_count} results.`);
    if (data.items) {
      data.items.slice(0, 5).forEach((item: any) => {
        console.log(item.html_url);
        console.log(item.repository.html_url);
        console.log("----");
      });
    } else {
        console.log(data);
    }
  } catch (e) {
    console.error(e);
  }
}
search();
