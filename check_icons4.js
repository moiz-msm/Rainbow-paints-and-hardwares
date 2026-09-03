const urls = [
  'https://img.icons8.com/color/144/spray-can.png',
  'https://img.icons8.com/color/144/spray.png',
  'https://img.icons8.com/color/144/marker-pen.png',
  'https://img.icons8.com/color/144/aerosol-can.png',
  'https://img.icons8.com/color/144/paint-sprayer.png',
];

async function check() {
  for (const u of urls) {
    const r = await fetch(u, { method: 'HEAD' });
    if(r.status === 200) console.log("OK", u);
  }
}
check();
