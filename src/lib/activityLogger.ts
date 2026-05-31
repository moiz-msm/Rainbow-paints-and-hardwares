import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Admin Activity Error: ', JSON.stringify(errInfo));
}

export async function logActivity(type: string, message: string, metadata: Record<string, any> = {}) {
  const logId = `act_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const path = `activity_logs/${logId}`;
  try {
    const logRef = doc(db, 'activity_logs', logId);
    await setDoc(logRef, {
      type,
      message,
      timestamp: Date.now(),
      userId: auth.currentUser?.uid || null,
      metadata: {
        ...metadata,
        userEmail: auth.currentUser?.email || null,
        userName: auth.currentUser?.displayName || null,
      }
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
