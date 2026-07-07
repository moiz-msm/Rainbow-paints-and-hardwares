import { initializeApp } from 'firebase/app';
import { initializeFirestore, collection, getDocs, updateDoc, writeBatch } from 'firebase/firestore';
import * as config from './firebase-applet-config.json';
import { mockProducts } from './src/data.ts';

const app = initializeApp(config);
const db = (config as any).firestoreDatabaseId ? initializeFirestore(app, { experimentalForceLongPolling: true }, (config as any).firestoreDatabaseId) : initializeFirestore(app, { experimentalForceLongPolling: true });

async function sync() {
  console.log("Starting sync...");
  const snapshot = await getDocs(collection(db, "products"));
  const batch = writeBatch(db);
  let count = 0;
  
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const mock = mockProducts.find(p => p.name === data.name);
    if (mock && mock.image) {
      if (data.image !== mock.image) {
        batch.update(docSnap.ref, { image: mock.image });
        count++;
        console.log(`Updating ${data.name}...`);
      }
    }
  }
  
  if (count > 0) {
    await batch.commit();
    console.log(`Updated ${count} products.`);
  } else {
    console.log("No products to update.");
  }
}

sync().catch(console.error).finally(() => process.exit(0));
