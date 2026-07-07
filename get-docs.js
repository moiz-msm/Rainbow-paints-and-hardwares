const ids = ['FtYxbQJggWPGiFQmCZqU', 'cfC16vcJc7Y6SuG8I0io', 'urWWhE0zkeCmRzBcTHqw', 'KQsvJ6kbraBWrRqaiLPB'];
async function run() {
  for (const id of ids) {
    const res = await fetch(`https://firestore.googleapis.com/v1/projects/rainbowpaints/databases/rainbowpaints-db/documents/products/${id}`);
    const data = await res.json();
    console.log(id, data.fields?.name?.stringValue, data.fields?.brand?.stringValue);
  }
}
run();
