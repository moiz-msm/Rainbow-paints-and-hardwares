import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';
import * as config from '../../firebase-applet-config.json';

const firebaseConfig = config as Record<string, string>;

const app = initializeApp(firebaseConfig);
export const db = firebaseConfig.firestoreDatabaseId ? initializeFirestore(app, { experimentalForceLongPolling: true }, firebaseConfig.firestoreDatabaseId) : initializeFirestore(app, { experimentalForceLongPolling: true });
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
