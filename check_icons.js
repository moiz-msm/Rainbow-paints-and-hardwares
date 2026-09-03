const urls = [
  'https://img.icons8.com/color/96/living-room.png',
  'https://img.icons8.com/color/96/modern-house.png',
  'https://img.icons8.com/color/96/paint-bucket.png',
  'https://img.icons8.com/color/96/water-protection.png',
  'https://img.icons8.com/color/96/wood.png',
  'https://img.icons8.com/color/96/fence.png',
  'https://img.icons8.com/color/96/paint-brush.png',
  'https://img.icons8.com/color/96/flask.png',
  'https://img.icons8.com/color/96/tiles.png',
  'https://img.icons8.com/color/96/spray-paint.png',
  'https://img.icons8.com/color/96/chemistry.png',
  'https://img.icons8.com/color/96/paint-can.png',
  'https://img.icons8.com/color/96/paint-roller.png',
  'https://img.icons8.com/color/96/factory.png'
];

async function check() {
  for (const u of urls) {
    const r = await fetch(u, { method: 'HEAD' });
    console.log(u, r.status);
  }
}
check();
