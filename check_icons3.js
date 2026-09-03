const urls = [
  'https://img.icons8.com/color/144/home.png',
  'https://img.icons8.com/color/144/bungalow.png',
  'https://img.icons8.com/color/144/spray-can.png',
  'https://img.icons8.com/color/144/paint.png',
  'https://img.icons8.com/color/144/metal.png',
  'https://img.icons8.com/color/144/gear.png',
  'https://img.icons8.com/color/144/test-tube.png',
  'https://img.icons8.com/color/144/microscope.png'
];

async function check() {
  for (const u of urls) {
    const r = await fetch(u, { method: 'HEAD' });
    if(r.status === 200) console.log("OK", u);
  }
}
check();
