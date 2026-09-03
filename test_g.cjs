const google = require('googlethis');
async function run() {
  try {
    const results = await google.image('dr fixit 100 pidiproof lw+ super', { safe: false });
    console.log(results.slice(0, 3).map(r => r.url));
  } catch (e) { console.error(e); }
}
run();
