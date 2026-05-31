import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import * as config from '../../firebase-applet-config.json';

const firebaseConfig = config as Record<string, string>;

const app = initializeApp(firebaseConfig);
export const db = firebaseConfig.firestoreDatabaseId ? initializeFirestore(app, { experimentalForceLongPolling: true }, firebaseConfig.firestoreDatabaseId) : initializeFirestore(app, { experimentalForceLongPolling: true });
export const auth = getAuth(app);
