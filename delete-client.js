import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = getFirestore(app);

const ids = ['FtYxbQJggWPGiFQmCZqU', 'cfC16vcJc7Y6SuG8I0io', 'urWWhE0zkeCmRzBcTHqw', 'KQsvJ6kbraBWrRqaiLPB'];

async function run() {
  for (const id of ids) {
    try {
      await deleteDoc(doc(db, "products", id));
      console.log(`Deleted ${id}`);
    } catch (e) {
      console.error(`Error deleting ${id}:`, e.message);
    }
  }
  process.exit(0);
}
run();
