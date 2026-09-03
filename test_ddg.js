import ddg from 'duckduckgo-images-api';
console.log(Object.keys(ddg));
async function run() {
  try {
    const results = await ddg.image_search({ query: 'dr fixit 100 pidiproof lw+ super', moderate: true });
    console.log(results.slice(0, 3).map(r => r.image));
  } catch (e) { console.error(e); }
}
run();
