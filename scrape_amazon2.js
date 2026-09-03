async function searchAmazon(query) {
  const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    const html = await res.text();
    // Look for data-component-type="s-search-result"
    const results = html.split('data-component-type="s-search-result"').slice(1);
    const data = results.map(r => {
      const titleMatch = r.match(/<h2[^>]*>.*?<span[^>]*>(.*?)<\/span>/s);
      const imageMatch = r.match(/src="(https:\/\/m\.media-amazon\.com\/images\/I\/[a-zA-Z0-9_\-\.]+\.jpg)"/);
      return {
        title: titleMatch ? titleMatch[1].trim() : 'No title',
        image: imageMatch ? imageMatch[1] : 'No image'
      };
    }).filter(r => r.title.toLowerCase().includes('fevicol'));
    console.log(query, data.slice(0, 3));
  } catch(e) { console.error(e) }
}
searchAmazon('fevicol hi per');
searchAmazon('fevicol speedx');
searchAmazon('fevicol probond');
