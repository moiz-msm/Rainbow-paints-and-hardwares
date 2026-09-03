import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf-8');

content = content.replace(
  '"image": "https://placehold.co/800x800/004C97/FFFFFF/png?text=Fevicol\\nSH"',
  '"image": "https://m.media-amazon.com/images/I/51T6-pkLNNL._SL1000_.jpg"'
);

content = content.replace(
  '"image": "https://placehold.co/800x800/004C97/FFFFFF/png?text=Fevicol\\nMarine"',
  '"image": "https://m.media-amazon.com/images/I/41M-Avc4IoL.jpg"'
);

content = content.replace(
  '"image": "https://placehold.co/800x800/004C97/FFFFFF/png?text=Fevicol\\nSR+998"',
  '"image": "https://m.media-amazon.com/images/I/51uSaM1pXOL.jpg"'
);

content = content.replace(
  '"image": "https://placehold.co/800x800/FF5722/FFFFFF/png?text=Fevicol\\nHeatX"',
  '"image": "https://m.media-amazon.com/images/I/61KB34kxuSL.jpg"'
);

content = content.replace(
  '"image": "https://placehold.co/800x800/004C97/FFFFFF/png?text=Fevicol\\nEzee+Spray"',
  '"image": "https://m.media-amazon.com/images/I/51S7mIOxbQL._SL1110_.jpg"'
);

fs.writeFileSync('src/data.ts', content);
