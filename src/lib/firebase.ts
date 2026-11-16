import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager 
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import * as config from '../../firebase-applet-config.json';

const firebaseConfig = config as Record<string, string>;

const app = initializeApp(firebaseConfig);

// Configure persistent local cache and robust long polling to prevent 10s backend timeout and offline errors
const firestoreSettings = {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  }),
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false
};

export const db = firebaseConfig.firestoreDatabaseId 
  ? initializeFirestore(app, firestoreSettings, firebaseConfig.firestoreDatabaseId) 
  : initializeFirestore(app, firestoreSettings);

export const auth = getAuth(app);

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
