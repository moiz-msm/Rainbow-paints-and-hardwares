import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore,
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager,
  memoryLocalCache,
  doc,
  getDocFromServer,
  type FirestoreSettings,
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import * as config from '../../firebase-applet-config.json';

const firebaseConfig = config as Record<string, string>;

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Force long polling to bypass buffered WebChannel streaming proxies/iframes that trigger 10s backend timeouts
const createFirestoreSettings = (usePersistentCache: boolean): FirestoreSettings => ({
  localCache: usePersistentCache
    ? persistentLocalCache({ tabManager: persistentMultipleTabManager() })
    : memoryLocalCache(),
  experimentalForceLongPolling: true,
  experimentalLongPollingOptions: { timeoutSeconds: 15 },
});

const initDb = () => {
  const databaseId = firebaseConfig.firestoreDatabaseId;
  try {
    return databaseId
      ? initializeFirestore(app, createFirestoreSettings(true), databaseId)
      : initializeFirestore(app, createFirestoreSettings(true));
  } catch {
    try {
      return databaseId
        ? initializeFirestore(app, createFirestoreSettings(false), databaseId)
        : initializeFirestore(app, createFirestoreSettings(false));
    } catch {
      return databaseId ? getFirestore(app, databaseId) : getFirestore(app);
    }
  }
};

export const db = initDb();

export const auth = getAuth(app);

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'products', '__connection_test__'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore client is currently offline; operating with local cache/fallback.');
    }
  }
}
testConnection();

let analytics: any = null;
isSupported()
  .then((supported) => {
    if (supported && firebaseConfig.measurementId) {
      try {
        analytics = getAnalytics(app);
      } catch (e) {
        console.warn('Analytics failed to initialize');
      }
    }
  })
  .catch((e) => console.warn('Analytics isSupported failed', e));

export { analytics };
