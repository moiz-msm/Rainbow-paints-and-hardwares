const { image_search } = require('duckduckgo-images-api');
image_search({ query: "Berger Paints Just Spray", moderate: true }).then(results => {
   console.log(results[0]?.image);
}).catch(console.error);
