const ids = ['FtYxbQJggWPGiFQmCZqU', 'cfC16vcJc7Y6SuG8I0io', 'urWWhE0zkeCmRzBcTHqw', 'KQsvJ6kbraBWrRqaiLPB'];
const key = 'AIzaSyAWOAVfopKD7XzpE2I08W9rGGwmLHmyK1Y';
async function run() {
  for (const id of ids) {
    const res = await fetch(`https://firestore.googleapis.com/v1/projects/rainbowpaints/databases/rainbowpaints-db/documents/products/${id}?key=${key}`, { method: 'DELETE' });
    console.log(`Deleted ${id}:`, res.status);
  }
}
run();
