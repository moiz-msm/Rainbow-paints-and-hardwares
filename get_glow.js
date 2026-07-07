import https from 'https';

https.get('https://www.bergerpaints.com/products/exterior-wall-coatings/exterior-emulsion', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const jsonStr = data.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/);
    if (jsonStr) {
      const parsed = JSON.parse(jsonStr[1]);
      console.log(JSON.stringify(parsed).substring(0, 500));
    } else {
        const matches = data.match(/"([^"]*glow[^"]*\.png[^"]*)"/gi);
        if (matches) console.log(matches.join('\n'));
        else console.log("Not found in text");
    }
  });
});
