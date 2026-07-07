import { initializeApp } from 'firebase/app';
import { initializeFirestore, collection, getDocs } from 'firebase/firestore';
import * as config from './firebase-applet-config.json';
const app = initializeApp(config);
const db = (config as any).firestoreDatabaseId ? initializeFirestore(app, { experimentalForceLongPolling: true }, (config as any).firestoreDatabaseId) : initializeFirestore(app, { experimentalForceLongPolling: true });

async function check() {
  const snapshot = await getDocs(collection(db, "products"));
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    console.log(data.name);
  }
}

check().catch(console.error).finally(() => process.exit(0));
