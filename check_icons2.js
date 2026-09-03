const urls = [
  'https://img.icons8.com/color/144/house.png',
  'https://img.icons8.com/color/144/water.png',
  'https://img.icons8.com/color/144/wall.png',
  'https://img.icons8.com/color/144/brick-wall.png',
  'https://img.icons8.com/color/144/spray.png',
  'https://img.icons8.com/color/144/science.png',
  'https://img.icons8.com/color/144/color-wheel.png',
  'https://img.icons8.com/color/144/barricade.png',
  'https://img.icons8.com/color/144/anvil.png',
  'https://img.icons8.com/color/144/bucket.png',
  'https://img.icons8.com/color/144/plumbing.png'
];

async function check() {
  for (const u of urls) {
    const r = await fetch(u, { method: 'HEAD' });
    console.log(u, r.status);
  }
}
check();
