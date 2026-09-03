const fs = require('fs');
async function run() {
  const ids = ['51gt2ZSM3RL', '51790foj7eL', '61u3oCrP5IL'];
  for (const id of ids) {
    const res = await fetch(`https://m.media-amazon.com/images/I/${id}.jpg`);
    const buffer = await res.arrayBuffer();
    console.log(`${id}: ${buffer.byteLength} bytes`);
  }
}
run();
