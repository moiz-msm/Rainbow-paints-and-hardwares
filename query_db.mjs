import { readFileSync } from 'fs';
import admin from "firebase-admin";

const serviceAccount = JSON.parse(readFileSync("./firebase-applet-config.json"));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
async function run() {
  const snapshot = await db.collection("products").get();
  const subCats = new Set();
  snapshot.docs.forEach(doc => subCats.add(doc.data().subCategory));
  console.log(Array.from(subCats));
}
run();
